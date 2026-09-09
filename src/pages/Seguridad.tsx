import { CheckCircle2 } from "lucide-react";
import { PageShell } from "../components/PageShell";
import { Reveal } from "../components/ui";

/* ============================================================
   PÁGINA §06: SEGURIDAD
   ============================================================ */

const WARNINGS = [
  {
    b: "Nunca conectes o desconectes cables con el amplificador encendido.",
    r: "Podés dañar la etapa de potencia o el bafle.",
  },
  {
    b: "No superes la impedancia mínima soportada",
    r: "por el amplificador al conectar varios bafles en paralelo.",
  },
  {
    b: "Asegurá bien los soportes elevados.",
    r: "Un bafle en altura mal anclado es un riesgo físico serio para el público.",
  },
  {
    b: "Subí el volumen gradualmente",
    r: "al encender el sistema; un pico de señal puede dañar el bafle instantáneamente.",
  },
];

export function SeguridadPage() {
  return (
    <PageShell id="seguridad">
      <div className="flex flex-col gap-px bg-[var(--line)] border border-[var(--line)] rounded-sm overflow-hidden">
        {WARNINGS.map((item, i) => (
          <Reveal key={i}>
            <div className="bg-panel px-5 py-4 flex gap-3.5 items-start">
              <span className="flex-none w-6 h-6 rounded-[3px] bg-[var(--warn-dim)] text-warn flex items-center justify-center font-mono text-xs font-bold border border-warn/35">
                !
              </span>
              <p className="m-0 text-sm">
                <b className="text-warn font-semibold">{item.b}</b>{" "}
                <span className="text-mut">{item.r}</span>
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Chequeo final */}
      <Reveal delay={150}>
        <div className="mt-5 border border-signal/40 bg-[var(--signal-dim)] rounded-sm px-5 py-4 flex gap-3.5 items-start">
          <CheckCircle2 size={18} className="text-signal flex-none mt-0.5" />
          <div>
            <div className="font-mono text-[11px] tracking-[0.1em] text-signal uppercase mb-1">
              Chequeo final antes de encender
            </div>
            <p className="m-0 text-[13.5px] text-mut">
              Volumen al mínimo · polaridad verificada · soportes firmes ·
              cables etiquetados. Si todo eso está OK, estás listo para
              sonar.
            </p>
          </div>
        </div>
      </Reveal>
    </PageShell>
  );
}
