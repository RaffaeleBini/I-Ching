import { Link, useParams } from "react-router-dom";
import { getHexagramData, getStableLinesForHexagramNumber } from "@iching/core";
import { useDictionary } from "../i18n";
import { HexagramLines } from "../components/hexagram/HexagramLines";
import { HexagramText } from "../components/hexagram/HexagramText";
import { Card } from "../components/ui/Card";

export function ReferenciaDetailPage() {
  const { numero } = useParams<{ numero: string }>();
  const t = useDictionary();

  const numeroHexagrama = Number(numero);
  const esValido =
    Number.isInteger(numeroHexagrama) && numeroHexagrama >= 1 && numeroHexagrama <= 64;

  if (!esValido) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <p className="text-ink-muted">{t.resultado.notFound}</p>
        <Link to="/referencia" className="text-accent underline">
          {t.referencia.backToReferencia}
        </Link>
      </div>
    );
  }

  const hexagram = getHexagramData(numeroHexagrama);
  const lines = getStableLinesForHexagramNumber(numeroHexagrama);

  return (
    <div className="flex flex-col gap-8">
      <Link to="/referencia" className="text-sm text-ink-muted hover:text-ink">
        ← {t.referencia.backToReferencia}
      </Link>

      <div className="flex justify-center">
        <HexagramLines lines={lines} />
      </div>

      <p className="text-center text-sm text-ink-muted">
        {t.referencia.trigramaSuperiorLabel}: {hexagram.trigrama_superior} ·{" "}
        {t.referencia.trigramaInferiorLabel}: {hexagram.trigrama_inferior}
      </p>

      <Card>
        <HexagramText hexagram={hexagram} title={t.referencia.title} showAllLines />
      </Card>
    </div>
  );
}
