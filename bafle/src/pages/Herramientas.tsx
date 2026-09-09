import {
  Cable,
  SlidersHorizontal,
  PlugZap,
  Gauge,
  Anchor,
  Tags,
  ArrowRight,
} from "lucide-react";
import { PageShell } from "../components/PageShell";
import { Reveal } from "../components/ui";
import { goTo } from "../lib/nav";

/* ============================================================
   PÁGINA §01: HERRAMIENTAS ESENCIALES
   ============================================================ */

export function HerramientasPage() {
  const tools = [
    {
      icon: Cable,
      t: "Cable de parlante",
      d: "Calibre adecuado a la potencia y distancia (AWG 12–16 típico).",
    },
    {
      icon: SlidersHorizontal,
      t: "Amplificador o mezcladora amplificada",
      d: "Con potencia e impedancia compatibles con el bafle.",
    },
    {
      icon: PlugZap,
      t: "Conectores",
      d: "Speakon, banana o a tornillo, según el gabinete y el ampli.",
    },
    {
      icon: Gauge,
      t: "Multímetro",
      d: "Para verificar continuidad y polaridad antes de energizar.",
    },
    {
      icon: Anchor,
      t: "Soporte, trípode o rack",
      d: "Fijo o portátil, según altura y ángulo de proyección.",
    },
    {
      icon: Tags,
      t: "Etiquetas o cinta de color",
      d: "Para marcar canal izquierdo/derecho y polaridad + / −.",
    },
  ];

  return (
    <PageShell id="herramientas">
      <div className="grid sm:grid-cols-2 gap-px bg-[var(--line)] border border-[var(--line)] rounded-sm overflow-hidden">
        {tools.map((tool, i) => (
          <Reveal key={tool.t} delay={i * 60}>
            <div className="bg-panel px-5 py-5 flex gap-4 items-start group hover:bg-panel2 transition-colors h-full">
              <span className="flex-none w-[34px] h-[34px] border border-[var(--line)] rounded-[3px] flex items-center justify-center text-signal transition-transform duration-300 group-hover:scale-110 group-hover:border-signal/50">
                <tool.icon size={16} />
              </span>
              <div>
                <h3 className="m-0 mb-1 text-[15px] font-semibold flex items-center gap-2.5">
                  {tool.t}
                  <span className="font-mono text-[10px] text-mut/60">
                    0{i + 1}
                  </span>
                </h3>
                <p className="m-0 text-[13px] text-mut">{tool.d}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Hint hacia el kit profesional */}
      <Reveal delay={200}>
        <div className="mt-4 border border-amber/30 bg-[var(--amber-dim)] rounded-sm px-5 py-4 flex flex-wrap items-center justify-between gap-3">
          <p className="m-0 font-mono text-[12px] text-amber">
            » ¿El kit completo de trabajo? Está en el siguiente apartado.
          </p>
          <button
            onClick={() => goTo("especificas")}
            className="font-mono text-[11px] tracking-[0.08em] uppercase text-amber border border-amber/40 rounded-full px-4 py-2 hover:bg-amber hover:text-[#1a1204] transition-all cursor-pointer flex items-center gap-2"
          >
            Ver herramientas específicas
            <ArrowRight size={13} />
          </button>
        </div>
      </Reveal>
    </PageShell>
  );
}
