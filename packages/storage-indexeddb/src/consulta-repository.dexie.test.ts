import { beforeEach, describe, expect, it } from "vitest";
import type { Consulta } from "@iching/core";
import { IchingDatabase } from "./db";
import { DexieConsultaRepository } from "./consulta-repository.dexie";

function makeConsulta(overrides: Partial<Consulta> = {}): Consulta {
  return {
    id: crypto.randomUUID(),
    fecha: Date.now(),
    pregunta: "¿Cómo avanzo?",
    lineas: [7, 8, 7, 8, 7, 8],
    hexagrama_principal: 1,
    hexagrama_resultante: null,
    nota_usuario: "",
    favorito: false,
    ...overrides,
  };
}

describe("DexieConsultaRepository", () => {
  let repository: DexieConsultaRepository;

  beforeEach(() => {
    // Nombre de base de datos único por test para evitar interferencia entre
    // tests dentro del mismo proceso de fake-indexeddb.
    const db = new IchingDatabase(`test-db-${crypto.randomUUID()}`);
    repository = new DexieConsultaRepository(db);
  });

  it("save() + getById() persiste y recupera una consulta", async () => {
    const consulta = makeConsulta();
    await repository.save(consulta);

    const found = await repository.getById(consulta.id);
    expect(found).toEqual(consulta);
  });

  it("getById() devuelve undefined si no existe", async () => {
    const found = await repository.getById("no-existe");
    expect(found).toBeUndefined();
  });

  it("list() devuelve las consultas ordenadas de más reciente a más antigua", async () => {
    const antigua = makeConsulta({ fecha: 1000 });
    const reciente = makeConsulta({ fecha: 2000 });
    await repository.save(antigua);
    await repository.save(reciente);

    const list = await repository.list();
    expect(list.map((c) => c.id)).toEqual([reciente.id, antigua.id]);
  });

  it("update() modifica solo los campos indicados", async () => {
    const consulta = makeConsulta();
    await repository.save(consulta);

    await repository.update(consulta.id, { nota_usuario: "Se cumplió parcialmente" });

    const found = await repository.getById(consulta.id);
    expect(found?.nota_usuario).toBe("Se cumplió parcialmente");
    expect(found?.pregunta).toBe(consulta.pregunta);
  });

  it("update() lanza un error si el id no existe", async () => {
    await expect(repository.update("no-existe", { favorito: true })).rejects.toThrow();
  });

  it("remove() elimina una consulta", async () => {
    const consulta = makeConsulta();
    await repository.save(consulta);
    await repository.remove(consulta.id);

    const found = await repository.getById(consulta.id);
    expect(found).toBeUndefined();
  });

  describe("search()", () => {
    it("filtra por número de hexagrama", async () => {
      await repository.save(makeConsulta({ hexagrama_principal: 1 }));
      await repository.save(makeConsulta({ hexagrama_principal: 2 }));

      const results = await repository.search({ hexagrama: 2 });
      expect(results).toHaveLength(1);
      expect(results[0]?.hexagrama_principal).toBe(2);
    });

    it("filtra por favoritoOnly", async () => {
      await repository.save(makeConsulta({ favorito: true }));
      await repository.save(makeConsulta({ favorito: false }));

      const results = await repository.search({ favoritoOnly: true });
      expect(results).toHaveLength(1);
      expect(results[0]?.favorito).toBe(true);
    });

    it("filtra por texto libre en pregunta y nota, sin distinguir mayúsculas", async () => {
      await repository.save(
        makeConsulta({ pregunta: "¿Debo cambiar de trabajo?", nota_usuario: "" }),
      );
      await repository.save(
        makeConsulta({ pregunta: "¿Es buen momento para viajar?", nota_usuario: "" }),
      );
      await repository.save(
        makeConsulta({ pregunta: null, nota_usuario: "Reflexioné sobre el TRABAJO en casa" }),
      );

      const results = await repository.search({ text: "trabajo" });
      expect(results).toHaveLength(2);
    });

    it("sin filtros, devuelve todas las consultas", async () => {
      await repository.save(makeConsulta());
      await repository.save(makeConsulta());

      const results = await repository.search({});
      expect(results).toHaveLength(2);
    });
  });
});
