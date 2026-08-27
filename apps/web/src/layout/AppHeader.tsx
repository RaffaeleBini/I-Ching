import { Link } from "react-router-dom";
import type { Locale } from "@iching/core";
import { LOCALE_LABELS, useDictionary } from "../i18n";
import { useSettingsStore } from "../store/settingsStore";
import { IconButton } from "../components/ui/IconButton";

const LOCALES: Locale[] = ["es", "gl", "it"];

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"
      />
    </svg>
  );
}

/** Cabecera persistente en todas las páginas: logo/inicio, diario, idioma y tema. */
export function AppHeader() {
  const t = useDictionary();
  const locale = useSettingsStore((state) => state.locale);
  const theme = useSettingsStore((state) => state.theme);
  const setLocale = useSettingsStore((state) => state.setLocale);
  const toggleTheme = useSettingsStore((state) => state.toggleTheme);

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-between gap-y-2 px-4 py-4">
        <Link to="/" className="font-serif text-lg text-ink">
          {t.app.title}
        </Link>

        <nav className="flex flex-wrap items-center gap-1">
          <Link
            to="/referencia"
            className="rounded-full px-3 py-1.5 text-sm text-ink-muted transition-colors hover:bg-surface-raised hover:text-ink"
          >
            {t.nav.referencia}
          </Link>
          <Link
            to="/diario"
            className="rounded-full px-3 py-1.5 text-sm text-ink-muted transition-colors hover:bg-surface-raised hover:text-ink"
          >
            {t.nav.diario}
          </Link>
          <Link
            to="/ajustes"
            className="rounded-full px-3 py-1.5 text-sm text-ink-muted transition-colors hover:bg-surface-raised hover:text-ink"
          >
            {t.nav.ajustes}
          </Link>

          <div
            role="group"
            aria-label={t.settings.languageLabel}
            className="ml-2 flex overflow-hidden rounded-full border border-border"
          >
            {LOCALES.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => setLocale(loc)}
                aria-pressed={locale === loc}
                className={[
                  "px-2.5 py-1 text-xs font-medium transition-colors",
                  locale === loc
                    ? "bg-accent text-accent-ink"
                    : "text-ink-muted hover:bg-surface-raised",
                ].join(" ")}
              >
                {LOCALE_LABELS[loc]}
              </button>
            ))}
          </div>

          <IconButton
            label={theme === "dark" ? t.settings.themeLight : t.settings.themeDark}
            onClick={toggleTheme}
            className="ml-1"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </IconButton>
        </nav>
      </div>
    </header>
  );
}
