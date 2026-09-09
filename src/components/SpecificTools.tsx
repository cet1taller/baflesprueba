import { useMemo, useState, type ComponentType } from "react";
import {
  Gauge,
  BatteryCharging,
  AudioWaveform,
  Ruler,
  Scissors,
  Wrench,
  Flame,
  Layers,
  Drill,
  AlignCenterHorizontal,
  PencilRuler,
  Check,
  CheckCircle2,
  RotateCcw,
  type LucideProps,
} from "lucide-react";
import { Reveal } from "./ui";
import { cn } from "../utils/cn";

/* ============================================================
   HERRAMIENTAS ESPECÍFICAS — kit de trabajo interactivo
   Marcá cada herramienta a medida que la preparás; la barra
   muestra el avance del kit completo.
   ============================================================ */

type IconType = ComponentType<LucideProps>;

interface SpecificTool {
  id: string;
  name: string;
  desc: string;
  spec: string;
  icon: IconType;
}

const CATEGORIES: { id: string; label: string; tools: SpecificTool[] }[] = [
  {
    id: "medicion",
    label: "Medición & prueba",
    tools: [
      {
        id: "multimetro",
        name: "Multímetro digital",
        desc: "Verifica continuidad, voltaje y la impedancia real de la bobina antes de energizar.",
        spec: "Ω · V · CONTINUIDAD",
        icon: Gauge,
      },
      {
        id: "pila9v",
        name: "Pila 9V con puntas",
        desc: "Test de polaridad: el cono debe moverse hacia afuera al aplicar + al terminal +.",
        spec: "9V DC",
        icon: BatteryCharging,
      },
      {
        id: "rta",
        name: "App RTA / medidor SPL",
        desc: "Analiza la respuesta en frecuencia y el nivel de presión desde el teléfono.",
        spec: "±1 dB",
        icon: AudioWaveform,
      },
      {
        id: "metro",
        name: "Cinta métrica",
        desc: "Simetría entre canal izquierdo y derecho, y distancia exacta a paredes y público.",
        spec: "3–5 m",
        icon: Ruler,
      },
    ],
  },
  {
    id: "cableado",
    label: "Cableado & conexión",
    tools: [
      {
        id: "pelacables",
        name: "Pelacables",
        desc: "Pela sin cortar hilos en los calibres típicos de cable de parlante.",
        spec: "AWG 12–16",
        icon: Scissors,
      },
      {
        id: "crimpadora",
        name: "Crimpadora de terminales",
        desc: "Fija terminales faston u horquilla con presión firme y contacto confiable.",
        spec: "0.5–6 mm²",
        icon: Wrench,
      },
      {
        id: "soldador",
        name: "Soldador + estaño",
        desc: "Reparación de conectores speakon o plugs dañados en el campo.",
        spec: "40 W · 350 °C",
        icon: Flame,
      },
      {
        id: "termocontraible",
        name: "Tubo termocontraíble",
        desc: "Aísla uniones y terminaciones: evita cortos y aflojamientos por vibración.",
        spec: "Ø 3–10 mm",
        icon: Layers,
      },
    ],
  },
  {
    id: "montaje",
    label: "Montaje & fijación",
    tools: [
      {
        id: "taladro",
        name: "Taladro + brocas",
        desc: "Anclajes en pared o rack para soportes fijos de bafles pesados.",
        spec: "Ø 6–10 mm",
        icon: Drill,
      },
      {
        id: "nivel",
        name: "Nivel de burbuja",
        desc: "Alinea soportes de pared para que el bafle proyecte parejo y no caiga.",
        spec: "±0.5 mm/m",
        icon: AlignCenterHorizontal,
      },
      {
        id: "llaves",
        name: "Destornilladores + llaves",
        desc: "Phillips y tubo para herrajes, perillas de trípode y bornes del ampli.",
        spec: "PH2 · 8–13 mm",
        icon: PencilRuler,
      },
      {
        id: "gaffer",
        name: "Cinta gaffer + marcador",
        desc: "Etiqueta canales L/R, fija cables al piso y evita tropiezos.",
        spec: "50 mm",
        icon: Layers,
      },
    ],
  },
];

const TOTAL = CATEGORIES.reduce((n, c) => n + c.tools.length, 0);

export function SpecificTools() {
  const [cat, setCat] = useState(CATEGORIES[0].id);
  const [ready, setReady] = useState<Set<string>>(new Set());

  const active = useMemo(
    () => CATEGORIES.find((c) => c.id === cat)!,
    [cat]
  );

  const toggle = (id: string) =>
    setReady((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const pct = Math.round((ready.size / TOTAL) * 100);
  const complete = ready.size === TOTAL;

  return (
    <Reveal>
      {/* Panel del kit */}
      <div className="border border-[var(--line)] rounded-sm bg-panel overflow-hidden">
        {/* Barra de estado del kit */}
        <div className="px-5 sm:px-7 py-4 border-b border-[var(--line)] flex flex-wrap items-center gap-x-6 gap-y-3 justify-between">
          <div className="font-mono text-xs text-mut tracking-[0.1em]">
            KIT DE TRABAJO —{" "}
            <span className={complete ? "text-signal" : "text-ink"}>
              {ready.size}/{TOTAL} LISTOS
            </span>
          </div>
          <div className="flex items-center gap-3 flex-1 min-w-[180px] max-w-[320px]">
            <div className="h-[5px] flex-1 bg-panel2 rounded-full overflow-hidden border border-[var(--line)]">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  complete ? "bg-signal shadow-[0_0_10px_var(--color-signal)]" : "bg-signal/80"
                )}
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="font-mono text-xs text-mut w-10 text-right">
              {pct}%
            </span>
          </div>
          <div className="flex items-center gap-3">
            {complete && (
              <span className="pop-in font-mono text-[11px] tracking-[0.1em] text-[#08110d] bg-signal rounded-sm px-2.5 py-1 flex items-center gap-1.5 font-bold">
                <CheckCircle2 size={13} /> KIT COMPLETO
              </span>
            )}
            {ready.size > 0 && (
              <button
                onClick={() => setReady(new Set())}
                className="font-mono text-[11px] text-mut hover:text-warn transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Reiniciar el kit"
              >
                <RotateCcw size={12} />
                Reiniciar
              </button>
            )}
          </div>
        </div>

        {/* Tabs de categorías */}
        <div
          className="px-5 sm:px-7 pt-5 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Categorías de herramientas específicas"
        >
          {CATEGORIES.map((c) => {
            const done = c.tools.filter((t) => ready.has(t.id)).length;
            const isActive = cat === c.id;
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setCat(c.id)}
                className={cn(
                  "font-mono text-[11.5px] tracking-[0.06em] uppercase border rounded-full px-4 py-2 cursor-pointer transition-all flex items-center gap-2",
                  isActive
                    ? "border-signal text-signal bg-[var(--signal-dim)]"
                    : "border-[var(--line)] text-mut hover:text-ink hover:border-metal/40"
                )}
              >
                {c.label}
                <span
                  className={cn(
                    "text-[10px] rounded-full px-1.5 py-px",
                    done === c.tools.length
                      ? "bg-signal text-[#08110d] font-bold"
                      : "bg-panel2 border border-[var(--line)]"
                  )}
                >
                  {done}/{c.tools.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grilla de herramientas */}
        <div className="p-5 sm:p-7 grid sm:grid-cols-2 gap-3">
          {active.tools.map((tool) => {
            const on = ready.has(tool.id);
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => toggle(tool.id)}
                aria-pressed={on}
                className={cn(
                  "text-left rounded-sm border p-4 sm:p-5 cursor-pointer transition-all duration-200 group relative overflow-hidden",
                  on
                    ? "border-signal/60 bg-[var(--signal-dim)]"
                    : "border-[var(--line)] bg-panel2 hover:border-metal/40 hover:-translate-y-0.5"
                )}
              >
                <div className="flex items-start gap-3.5">
                  <span
                    className={cn(
                      "flex-none w-9 h-9 rounded-[3px] border flex items-center justify-center transition-colors",
                      on
                        ? "border-signal/60 text-signal"
                        : "border-[var(--line)] text-signal/80 group-hover:text-signal"
                    )}
                  >
                    <Icon size={17} />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[14.5px] font-semibold leading-tight">
                        {tool.name}
                      </span>
                      <span
                        className={cn(
                          "flex-none w-5 h-5 rounded-full border flex items-center justify-center transition-all",
                          on
                            ? "bg-signal border-signal text-[#08110d]"
                            : "border-mut/40 text-transparent group-hover:border-mut"
                        )}
                      >
                        <Check size={12} strokeWidth={3} />
                      </span>
                    </span>
                    <p className="text-[12.5px] text-mut m-0">{tool.desc}</p>
                    <span className="inline-block mt-2.5 font-mono text-[10.5px] tracking-[0.06em] text-amber bg-[var(--amber-dim)] border border-amber/30 rounded-[3px] px-2 py-[3px]">
                      {tool.spec}
                    </span>
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="px-5 sm:px-7 pb-5 font-mono text-[11px] text-mut">
          » Marcá cada herramienta a medida que la preparás — útil como
          checklist el día de la instalación.
        </div>
      </div>
    </Reveal>
  );
}
