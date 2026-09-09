import { ArrowUpFromLine, Expand, Crosshair } from "lucide-react";
import { PageShell } from "../components/PageShell";
import { Reveal } from "../components/ui";

/* ============================================================
   PÁGINA §05: UBICACIÓN
   ============================================================ */

export function UbicacionPage() {
  const cards = [
    {
      icon: ArrowUpFromLine,
      lvl: "Altura",
      t: "Sobre el nivel del oído",
      d: "Elevado 1.5–2 m evita que el sonido se pierda entre el público y mejora la proyección.",
    },
    {
      icon: Expand,
      lvl: "Distancia a paredes",
      t: "Separado de esquinas",
      d: "Pegado a una esquina o pared refuerza artificialmente los graves y distorsiona la mezcla.",
    },
    {
      icon: Crosshair,
      lvl: "Ángulo",
      t: "Apuntando al público",
      d: "Inclinado hacia el área de escucha, no hacia el techo o el piso, salvo diseño específico.",
    },
  ];

  return (
    <PageShell id="ubicacion">
      <div className="grid sm:grid-cols-3 gap-3.5">
        {cards.map((c, i) => (
          <Reveal key={c.t} delay={i * 80}>
            <div className="border border-[var(--line)] rounded-sm p-5 bg-panel hover:border-signal/40 hover:-translate-y-1 transition-all duration-300 h-full">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[11px] text-signal uppercase tracking-[0.06em]">
                  {c.lvl}
                </span>
                <c.icon size={16} className="text-mut" />
              </div>
              <h3 className="m-0 mb-1.5 text-[15px] font-semibold">{c.t}</h3>
              <p className="m-0 text-[13px] text-mut">{c.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={200}>
        <p className="font-mono text-[11.5px] text-mut mt-5 border border-[var(--line)] rounded-sm bg-panel px-4 py-3">
          » REGLA PRÁCTICA — Si dos bafles cubren la misma zona, medí que ambos
          queden a la misma distancia del punto de escucha: 30 cm de
          diferencia ya genera cancelaciones audibles en graves.
        </p>
      </Reveal>
    </PageShell>
  );
}
