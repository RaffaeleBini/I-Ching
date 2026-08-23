import { Link } from "react-router-dom";
import { useDictionary } from "../i18n";
import { Button } from "../components/ui/Button";

export function HomePage() {
  const t = useDictionary();

  return (
    <div className="flex flex-col items-center gap-8 py-16 text-center">
      <span className="font-serif text-6xl text-ink" aria-hidden="true">
        ䷀
      </span>
      <div>
        <h1 className="font-serif text-3xl text-ink">{t.app.title}</h1>
        <p className="mt-3 max-w-sm text-ink-muted">{t.home.tagline}</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <Link to="/nueva-consulta">
          <Button variant="primary">{t.home.newConsultation}</Button>
        </Link>
        <Link to="/diario">
          <Button variant="secondary">{t.home.viewDiario}</Button>
        </Link>
        <Link to="/referencia" className="text-sm text-ink-muted underline hover:text-ink">
          {t.home.viewReferencia}
        </Link>
      </div>
    </div>
  );
}
