import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { useDictionary } from "../i18n";
import { useDiarioStore } from "../store/diarioStore";
import { consultaRepository } from "../lib/repository";
import { parseConsultasBackup } from "../lib/consulta-import";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

type ImportResult =
  | { status: "idle" }
  | { status: "success"; imported: number; skipped: number }
  | { status: "error" };

export function AjustesPage() {
  const t = useDictionary();
  const consultas = useDiarioStore((state) => state.consultas);
  const loading = useDiarioStore((state) => state.loading);
  const loadAll = useDiarioStore((state) => state.loadAll);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<ImportResult>({ status: "idle" });

  useEffect(() => {
    void loadAll();
  }, [loadAll]);

  function handleExport() {
    const payload = JSON.stringify(consultas, null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const fecha = new Date().toISOString().slice(0, 10);
    const link = document.createElement("a");
    link.href = url;
    link.download = `iching-diario-${fecha}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) {
      return;
    }

    setImporting(true);
    try {
      const text = await file.text();
      const { valid, skipped } = parseConsultasBackup(text);
      for (const consulta of valid) {
        await consultaRepository.save(consulta);
      }
      await loadAll();
      setImportResult({ status: "success", imported: valid.length, skipped });
    } catch {
      setImportResult({ status: "error" });
    } finally {
      setImporting(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl text-ink">{t.ajustes.title}</h1>
        <p className="mt-2 text-ink-muted">{t.ajustes.description}</p>
      </div>

      {loading ? (
        <p className="text-ink-muted">{t.common.loading}</p>
      ) : (
        <>
          <Card className="flex flex-col gap-3">
            <h2 className="font-serif text-lg text-ink">{t.ajustes.exportTitle}</h2>
            <p className="text-sm text-ink-muted">{t.ajustes.exportDescription}</p>
            <div>
              <Button
                variant="secondary"
                onClick={handleExport}
                disabled={consultas.length === 0}
              >
                {t.ajustes.exportButton}
              </Button>
            </div>
            {consultas.length === 0 && (
              <p className="text-sm text-ink-muted">{t.ajustes.exportEmpty}</p>
            )}
          </Card>

          <Card className="flex flex-col gap-3">
            <h2 className="font-serif text-lg text-ink">{t.ajustes.importTitle}</h2>
            <p className="text-sm text-ink-muted">{t.ajustes.importDescription}</p>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/json"
                className="hidden"
                onChange={(event) => void handleFileChange(event)}
              />
              <Button variant="secondary" onClick={handleImportClick} disabled={importing}>
                {t.ajustes.importButton}
              </Button>
            </div>
            {importResult.status === "success" && (
              <p className="text-sm text-ink-muted" role="status">
                {t.ajustes.importSuccess(importResult.imported, importResult.skipped)}
              </p>
            )}
            {importResult.status === "error" && (
              <p className="text-sm text-red-600" role="alert">
                {t.ajustes.importError}
              </p>
            )}
          </Card>
        </>
      )}
    </div>
  );
}
