import { PageShell } from "../components/PageShell";
import { Reveal } from "../components/ui";

/* ============================================================
   PÁGINA §03: PASOS DE INSTALACIÓN
   ============================================================ */

const STEPS = [
  {
    t: "Verificar potencia e impedancia",
    d: "Confirmá que la potencia RMS del amplificador no supere la del bafle, y que la impedancia (4Ω, 8Ω, 16Ω) sea compatible entre ambos equipos.",
    tag: "Evita daño al bafle",
  },
  {
    t: "Elegir la ubicación",
    d: "Definí altura, ángulo y distancia respecto al público o la zona a cubrir, evitando esquinas cerradas y superficies muy reflectantes.",
  },
  {
    t: "Montar el soporte",
    d: "Fijá el trípode, rack o soporte de pared asegurando que soporte el peso del bafle y quede estable ante vibraciones.",
    tag: "Verificar anclaje",
  },
  {
    t: "Conectar los cables respetando la polaridad",
    d: "Uní siempre positivo con positivo y negativo con negativo entre amplificador y bafle. Invertir la polaridad en un solo canal cancela graves y desfasa el sonido.",
    tag: "Punto crítico — ver §04",
  },
  {
    t: "Configurar el amplificador",
    d: "Con el volumen al mínimo, encendé primero las fuentes de señal y por último el amplificador. Ajustá ganancia y ecualización gradualmente.",
  },
  {
    t: "Probar el sistema",
    d: "Reproducí una pista de referencia y subí el volumen de a poco, revisando que ambos bafles suenen en fase y sin distorsión.",
  },
];

export function PasosPage() {
  return (
    <PageShell id="pasos">
      <div>
        {STEPS.map((step, i) => (
          <Reveal key={step.t}>
            <div className="grid grid-cols-[52px_1fr] sm:grid-cols-[72px_1fr] gap-4 sm:gap-6 py-6 sm:py-7 border-t border-[var(--line)] last:border-b group">
              <div className="font-bebas text-[42px] sm:text-[52px] outline-num leading-[0.9] group-hover:[-webkit-text-stroke-color:var(--color-signal)] transition-all duration-300">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="pt-1">
                <h3 className="m-0 mb-2 text-[17px] font-semibold group-hover:text-signal transition-colors">
                  {step.t}
                </h3>
                <p className="m-0 text-mut text-[14.5px] max-w-[620px]">
                  {step.d}
                </p>
                {step.tag && (
                  <span className="inline-block mt-3 font-mono text-[11px] text-amber bg-[var(--amber-dim)] border border-amber/30 px-2 py-[3px] rounded-[3px]">
                    {step.tag}
                  </span>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}
