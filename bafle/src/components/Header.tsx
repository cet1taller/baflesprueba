import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { goHome, goTo, PAGES, type Route } from "../lib/nav";
import { cn } from "../utils/cn";

export function Header({ route }: { route: Route }) {
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  /* Barra de progreso de lectura de la página actual */
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Cerrar menú móvil al cambiar de página */
  useEffect(() => setOpen(false), [route]);

  const nav = (r: Route) => {
    setOpen(false);
    goTo(r);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-bg/90 backdrop-blur-md">
      <div className="mx-auto max-w-[1080px] px-6">
        <div className="flex items-center justify-between gap-4 py-3.5">
          {/* Marca */}
          <button
            onClick={goHome}
            className="font-bebas text-xl tracking-[0.08em] flex items-center gap-2.5 cursor-pointer"
            aria-label="Ir al inicio"
          >
            <span className="led-dot" />
            BAFLE <span className="text-mut">//</span>{" "}
            <span className="hidden sm:inline">INSTALACIÓN</span>
          </button>

          {/* Nav escritorio — cada ítem es una página distinta */}
          <nav className="hidden lg:flex items-center gap-6 text-[13px] text-mut">
            {PAGES.map((p) => (
              <button
                key={p.id}
                onClick={() => nav(p.id)}
                className={cn(
                  "cursor-pointer transition-colors hover:text-signal",
                  route === p.id && "text-signal"
                )}
                aria-current={route === p.id ? "page" : undefined}
              >
                {p.label}
              </button>
            ))}
            <button
              onClick={() => nav("contacto")}
              className={cn(
                "font-mono text-[11.5px] tracking-[0.08em] uppercase cursor-pointer flex items-center gap-1.5 border rounded-full px-4 py-1.5 transition-all",
                route === "contacto"
                  ? "border-signal text-signal bg-[var(--signal-dim)]"
                  : "border-[var(--line)] text-ink hover:border-signal hover:text-signal"
              )}
              aria-current={route === "contacto" ? "page" : undefined}
            >
              Contacto
              <ArrowUpRight size={13} />
            </button>
          </nav>

          {/* Botón menú móvil */}
          <button
            className="lg:hidden text-mut hover:text-signal transition-colors cursor-pointer p-1"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Panel móvil */}
      <div
        className={cn(
          "lg:hidden overflow-hidden border-[var(--line)] transition-[max-height,border] duration-300 ease-out",
          open ? "max-h-[480px] border-t" : "max-h-0"
        )}
      >
        <nav className="px-6 py-4 flex flex-col gap-1 bg-panel">
          {PAGES.map((p) => (
            <button
              key={p.id}
              onClick={() => nav(p.id)}
              className={cn(
                "flex items-center gap-3 py-2.5 text-left text-sm transition-colors cursor-pointer border-b border-[var(--line)] last:border-0 hover:text-signal",
                route === p.id ? "text-signal" : "text-mut"
              )}
            >
              <span className="font-mono text-[10px] text-signal/70">
                {p.num.replace("§", "0")}
              </span>
              {p.label}
            </button>
          ))}
          <button
            onClick={() => nav("contacto")}
            className="mt-3 flex items-center justify-center gap-2 border border-signal/50 text-signal font-mono text-xs tracking-[0.1em] uppercase rounded-sm py-2.5 cursor-pointer"
          >
            Ir a Contacto
            <ArrowUpRight size={14} />
          </button>
        </nav>
      </div>

      {/* Progreso de lectura */}
      <div className="h-[2px] bg-transparent">
        <div
          className="h-full bg-signal transition-[width] duration-100 ease-linear shadow-[0_0_8px_var(--color-signal)]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </header>
  );
}
