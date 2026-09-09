import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { goHome, goTo, pageInfo, PAGE_ORDER, type Route } from "../lib/nav";
import { Reveal, Eyebrow } from "./ui";

/* ============================================================
   PAGESHELL — estructura común de cada página de la guía:
   migas de pan, título gigante, contenido y pager
   "anterior / siguiente" entre apartados.
   ============================================================ */

export function PageShell({
  id,
  children,
}: {
  id: Route;
  children: ReactNode;
}) {
  const info = pageInfo(id);
  if (!info) return null;

  const idx = PAGE_ORDER.findIndex((p) => p.id === id);
  const prev = PAGE_ORDER[idx - 1];
  const next = PAGE_ORDER[idx + 1];

  return (
    <main className="relative z-[1]">
      {/* ---- Cabecera de página ---- */}
      <div className="mx-auto max-w-[1080px] px-6 pt-12 md:pt-16 pb-8">
        <Reveal>
          {/* Migas de pan */}
          <nav
            aria-label="Migas de pan"
            className="font-mono text-[11px] text-mut mb-7 flex items-center gap-2"
          >
            <button
              onClick={goHome}
              className="hover:text-signal transition-colors cursor-pointer uppercase tracking-[0.1em]"
            >
              Inicio
            </button>
            <span>/</span>
            <span className="text-signal tracking-[0.1em]">
              {info.num} — {info.label.toUpperCase()}
            </span>
          </nav>

          <Eyebrow>Guía técnica · Audio en vivo</Eyebrow>
          <h1 className="font-bebas uppercase leading-[0.95] tracking-[0.01em] text-[clamp(36px,6vw,62px)] m-0 mt-5 mb-4">
            <span className="text-mut/60 mr-3">{info.num}</span>
            {info.titulo}
          </h1>
          <p className="max-w-[580px] text-mut text-[16px] m-0">{info.desc}</p>
        </Reveal>
      </div>

      {/* ---- Contenido del apartado ---- */}
      <div className="mx-auto max-w-[1080px] px-6 pb-20">
        {children}

        {/* ---- Pager anterior / siguiente ---- */}
        <Reveal delay={100}>
          <div className="grid sm:grid-cols-2 gap-px bg-[var(--line)] border border-[var(--line)] rounded-sm overflow-hidden mt-14">
            {prev ? (
              <button
                onClick={() => goTo(prev.id)}
                className="bg-panel px-5 py-5 text-left group hover:bg-panel2 transition-colors cursor-pointer"
              >
                <div className="font-mono text-[10.5px] text-mut tracking-[0.1em] mb-1.5 flex items-center gap-1.5">
                  <ArrowLeft
                    size={12}
                    className="transition-transform group-hover:-translate-x-1"
                  />
                  ANTERIOR
                </div>
                <div className="text-[15px] font-semibold group-hover:text-signal transition-colors">
                  {prev.label}
                </div>
              </button>
            ) : (
              <span className="bg-panel" />
            )}
            {next && (
              <button
                onClick={() => goTo(next.id)}
                className="bg-panel px-5 py-5 text-right group hover:bg-panel2 transition-colors cursor-pointer"
              >
                <div className="font-mono text-[10.5px] text-mut tracking-[0.1em] mb-1.5 flex items-center gap-1.5 justify-end">
                  SIGUIENTE
                  <ArrowRight
                    size={12}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
                <div className="text-[15px] font-semibold group-hover:text-signal transition-colors">
                  {next.label}
                </div>
              </button>
            )}
          </div>
        </Reveal>
      </div>
    </main>
  );
}
