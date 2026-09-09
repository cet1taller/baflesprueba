import { ArrowUp, ArrowUpRight, User } from "lucide-react";
import { CREADORES } from "../data/creadores"; // ← acá se cargan los nombres
import { goContact, goHome, goTo, PAGES } from "../lib/nav";
import { EqBars } from "./ui";

/* ============================================================
   FOOTER — Apartados separados:
   F.1 Guía · F.2 Proyecto · F.3 Creadores · F.4 Contacto

   ★ Los nombres de los creadores se editan en el archivo:
     src/data/creadores.ts
   ============================================================ */

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-[1] border-t border-[var(--line)]">
      {/* Marca gigante */}
      <div className="overflow-hidden border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1080px] px-6 py-10 flex items-end justify-between gap-6">
          <div className="font-bebas leading-[0.85] text-[clamp(64px,14vw,150px)] outline-word select-none">
            BAFLE//
          </div>
          <div className="hidden md:flex flex-col items-end gap-2 pb-2">
            <EqBars className="text-signal h-6" />
            <span className="font-mono text-[11px] text-mut tracking-[0.14em] uppercase">
              Señal activa — sistema OK
            </span>
          </div>
        </div>
      </div>

      {/* Apartado F.1 + F.2 */}
      <div className="mx-auto max-w-[1080px] px-6 grid md:grid-cols-2 gap-px bg-[var(--line)] border-b border-[var(--line)]">
        <section className="bg-bg py-8 md:pr-8" aria-label="Índice de la guía">
          <div className="font-mono text-[11px] text-signal tracking-[0.14em] uppercase mb-4">
            F.1 · Guía
          </div>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-[13.5px] text-mut">
            {PAGES.map((p) => (
              <li key={p.id}>
                <button
                  onClick={() => goTo(p.id)}
                  className="hover:text-signal transition-colors cursor-pointer"
                >
                  {p.label}
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-bg py-8 md:pl-8" aria-label="Datos del proyecto">
          <div className="font-mono text-[11px] text-signal tracking-[0.14em] uppercase mb-4">
            F.2 · Proyecto
          </div>
          <p className="text-[13.5px] text-mut max-w-[380px] mb-4">
            Guía técnica de instalación de parlantes bafle. Proyecto escolar:
            cableado, polaridad, montaje y puesta en marcha segura.
          </p>
          <div className="font-mono text-[11.5px] text-mut space-y-1">
            <div>NIVEL — BÁSICO / INTERMEDIO</div>
            <div>DURACIÓN — 45 A 90 MIN</div>
          </div>
        </section>
      </div>

      {/* ========================================================
          Apartado F.3 — CREADORES
          Cada integrante se muestra en su propio bloque separado.
          ★ Para cambiar los nombres: src/data/creadores.ts
          ======================================================== */}
      <section
        className="border-b border-[var(--line)]"
        aria-label="Creadores del proyecto"
      >
        <div className="mx-auto max-w-[1080px] px-6 pt-8 pb-2">
          <div className="font-mono text-[11px] text-signal tracking-[0.14em] uppercase">
            F.3 · Creadores
          </div>
        </div>

        <div className="mx-auto max-w-[1080px] px-6 pb-8">
          <div className="grid sm:grid-cols-3 gap-px bg-[var(--line)] border border-[var(--line)] rounded-sm overflow-hidden">
            {CREADORES.map((c, i) => (
              <div key={i} className="bg-panel px-5 py-5 group">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10.5px] text-mut tracking-[0.1em]">
                    CREADOR_0{i + 1}
                  </span>
                  <User
                    size={14}
                    className="text-mut group-hover:text-signal transition-colors"
                  />
                </div>
                <div className="font-bebas text-2xl tracking-[0.03em] leading-none mb-1.5">
                  {c.nombre.toUpperCase()}
                </div>
                <div className="text-[12.5px] text-mut">{c.rol}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apartado F.4 — Contacto */}
      <section className="border-b border-[var(--line)]" aria-label="Contacto">
        <div className="mx-auto max-w-[1080px] px-6 py-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="font-mono text-[11px] text-signal tracking-[0.14em] uppercase mb-3">
              F.4 · Contacto
            </div>
            <div className="font-bebas text-[clamp(26px,4vw,38px)] uppercase leading-none">
              ¿Dudas con la instalación?
            </div>
          </div>
          <button
            onClick={goContact}
            className="group flex items-center gap-3 bg-signal text-[#08110d] font-mono text-[12px] font-bold tracking-[0.1em] uppercase px-6 py-3.5 rounded-sm cursor-pointer hover:shadow-[0_0_24px_rgba(79,209,165,0.35)] transition-shadow"
          >
            Escribinos
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </section>

      {/* Línea inferior */}
      <div className="mx-auto max-w-[1080px] px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11.5px] text-mut">
        <div>© {year} — GUÍA DE INSTALACIÓN · PROYECTO ESCOLAR</div>
        <div className="flex items-center gap-5">
          <EqBars className="text-signal/70" />
          <button
            onClick={() => {
              goHome();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-1.5 hover:text-signal transition-colors cursor-pointer tracking-[0.1em] uppercase"
          >
            Volver arriba <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
}
