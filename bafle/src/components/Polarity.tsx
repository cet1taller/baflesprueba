import { useState } from "react";
import { Zap, AlertTriangle } from "lucide-react";
import { Reveal } from "./ui";

/* ============================================================
   DIAGRAMA DE POLARIDAD — interactivo
   Correcciones respecto del original:
   · Los pulsos ahora siguen el cable real (se remontan por key
     con la geometría actualizada).
   · En modo INVERTIDA los cables cruzan correctamente:
     AMP(+) → BAFLE(−) y AMP(−) → BAFLE(+).
   · La onda resultante muestra la cancelación (línea plana).
   ============================================================ */

type Mode = "correct" | "wrong";

const AMP_P = [77, 110] as const; // terminal + del amplificador
const AMP_N = [77, 150] as const; // terminal − del amplificador
const BAF_P = [613, 110] as const; // terminal + del bafle
const BAF_N = [613, 150] as const; // terminal − del bafle

function wire(from: readonly [number, number], to: readonly [number, number]) {
  return `M${from[0]} ${from[1]} C 300 ${from[1]}, 340 ${to[1]}, ${to[0]} ${to[1]}`;
}

const GREEN = "#4fd1a5";
const RED = "#e85d4e";

export function Polarity() {
  const [mode, setMode] = useState<Mode>("correct");
  const isCorrect = mode === "correct";

  const posPath = isCorrect ? wire(AMP_P, BAF_P) : wire(AMP_P, BAF_N);
  const negPath = isCorrect ? wire(AMP_N, BAF_N) : wire(AMP_N, BAF_P);

  return (
    <Reveal>
      <div className="bg-panel border border-[var(--line)] rounded-sm p-5 sm:p-7 relative overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div className="font-mono text-xs text-mut tracking-[0.1em]">
            CONEXIÓN AMPLIFICADOR → BAFLE
          </div>
          <div
            className="inline-flex border border-[var(--line)] rounded-full p-[3px] bg-panel2"
            role="group"
            aria-label="Modo de conexión"
          >
            <button
              className={`toggle-btn ${isCorrect ? "active" : ""}`}
              aria-pressed={isCorrect}
              onClick={() => setMode("correct")}
            >
              CORRECTA
            </button>
            <button
              className={`toggle-btn ${!isCorrect ? "active bad" : ""}`}
              aria-pressed={!isCorrect}
              onClick={() => setMode("wrong")}
            >
              INVERTIDA
            </button>
          </div>
        </div>

        <svg
          key={mode}
          viewBox="0 0 760 260"
          xmlns="http://www.w3.org/2000/svg"
          className="block w-full h-auto"
          role="img"
          aria-label={
            isCorrect
              ? "Diagrama de conexión correcta: positivo con positivo, negativo con negativo"
              : "Diagrama de conexión invertida: cables cruzados, señal cancelada"
          }
        >
          {/* ===== Amplificador ===== */}
          <rect x="30" y="70" width="150" height="120" rx="4" fill="#202024" stroke="#c7c9cc" strokeOpacity="0.3" />
          <text x="105" y="45" textAnchor="middle" fill="#8a8a8f" fontFamily="JetBrains Mono, monospace" fontSize="12">AMPLIFICADOR</text>
          <circle cx="70" cy="110" r="7" fill="none" stroke="#c7c9cc" strokeWidth="1.5" />
          <text x="70" y="115" textAnchor="middle" fill="#c7c9cc" fontFamily="JetBrains Mono, monospace" fontSize="11">+</text>
          <circle cx="70" cy="150" r="7" fill="none" stroke="#c7c9cc" strokeWidth="1.5" />
          <text x="70" y="155" textAnchor="middle" fill="#c7c9cc" fontFamily="JetBrains Mono, monospace" fontSize="11">−</text>
          {/* tornillos */}
          {[40, 170].map((x) =>
            [78, 182].map((y) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill="#c7c9cc" opacity="0.35" />
            ))
          )}

          {/* ===== Bafle ===== */}
          <rect x="580" y="70" width="150" height="120" rx="4" fill="#202024" stroke="#c7c9cc" strokeOpacity="0.3" />
          <text x="655" y="45" textAnchor="middle" fill="#8a8a8f" fontFamily="JetBrains Mono, monospace" fontSize="12">BAFLE</text>
          <circle cx="620" cy="110" r="7" fill="none" stroke="#c7c9cc" strokeWidth="1.5" />
          <text x="620" y="115" textAnchor="middle" fill="#c7c9cc" fontFamily="JetBrains Mono, monospace" fontSize="11">+</text>
          <circle cx="620" cy="150" r="7" fill="none" stroke="#c7c9cc" strokeWidth="1.5" />
          <text x="620" y="155" textAnchor="middle" fill="#c7c9cc" fontFamily="JetBrains Mono, monospace" fontSize="11">−</text>
          {[590, 720].map((x) =>
            [78, 182].map((y) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill="#c7c9cc" opacity="0.35" />
            ))
          )}

          {/* ===== Cables (se redibujan al cambiar de modo) ===== */}
          <path d={posPath} fill="none" stroke={GREEN} strokeWidth="2.5" className="wire-anim" />
          <path d={negPath} fill="none" stroke={isCorrect ? GREEN : RED} strokeWidth="2.5" className="wire-anim" />

          {/* ===== Pulsos de señal: ahora siguen SIEMPRE el cable ===== */}
          <circle r="4" fill={GREEN}>
            <animateMotion dur="1.8s" repeatCount="indefinite" path={posPath} />
          </circle>
          <circle r="4" fill={isCorrect ? GREEN : RED}>
            <animateMotion dur="1.8s" begin="-0.9s" repeatCount="indefinite" path={negPath} />
          </circle>

          {/* ===== Ondas ===== */}
          <text x="105" y="225" textAnchor="middle" fill="#8a8a8f" fontFamily="JetBrains Mono, monospace" fontSize="10">SEÑAL</text>
          <path d="M55 240 Q 80 220 105 240 T 155 240" fill="none" stroke="#c7c9cc" strokeWidth="1.5" opacity="0.6" />

          <text x="655" y="225" textAnchor="middle" fill={isCorrect ? "#8a8a8f" : RED} fontFamily="JetBrains Mono, monospace" fontSize="10">
            {isCorrect ? "RESULTADO" : "SEÑAL CANCELADA"}
          </text>
          {isCorrect ? (
            <path d="M605 240 Q 630 214 655 240 T 705 240" fill="none" stroke={GREEN} strokeWidth="1.8" />
          ) : (
            <>
              {/* ondas opuestas superpuestas que se anulan */}
              <path d="M605 240 Q 630 228 655 240 T 705 240" fill="none" stroke={RED} strokeWidth="1" opacity="0.45" strokeDasharray="3 3" />
              <path d="M605 240 Q 630 252 655 240 T 705 240" fill="none" stroke={RED} strokeWidth="1" opacity="0.45" strokeDasharray="3 3" />
              <path d="M605 240 L 705 240" fill="none" stroke={RED} strokeWidth="1.8" />
            </>
          )}
        </svg>

        {/* Estado */}
        <div className="mt-5 flex items-center gap-2.5 font-mono text-[13px]" aria-live="polite">
          <span
            className="w-2 h-2 rounded-full flex-none transition-colors"
            style={{
              background: isCorrect ? GREEN : RED,
              boxShadow: `0 0 8px ${isCorrect ? GREEN : RED}`,
            }}
          />
          <span className={isCorrect ? "text-ink" : "text-warn"}>
            {isCorrect
              ? "En fase — las dos ondas suman y el bajo se escucha completo."
              : 'Fuera de fase — las ondas se cancelan: se pierden graves y el sonido suena "hueco".'}
          </span>
        </div>

        <p className="text-mut text-[13.5px] mt-3">
          Tip: si tenés dos bafles y uno suena "fino" o sin graves comparado
          con el otro, es casi siempre un cable de polaridad invertida entre
          ambos.
        </p>
      </div>

      {/* Síntomas rápidos */}
      <div className="grid sm:grid-cols-3 gap-px bg-[var(--line)] border border-[var(--line)] rounded-sm overflow-hidden mt-3">
        {[
          {
            icon: Zap,
            t: "Test rápido con pila 9V",
            d: "Tocá el cable con los bornes de una pila: si el cono sale hacia afuera, la polaridad es correcta.",
          },
          {
            icon: AlertTriangle,
            t: "Síntoma clásico",
            d: "Graves débiles, imagen descentrada y sensación de vacío entre ambos bafles.",
          },
          {
            icon: Zap,
            t: "Regla de oro",
            d: "+ con + y − con − en TODO el recorrido: ampli, cable, crossover y bafle.",
          },
        ].map((s, i) => (
          <div key={i} className="bg-panel px-5 py-4">
            <s.icon size={15} className="text-amber mb-2.5" />
            <div className="text-[13px] font-semibold mb-1">{s.t}</div>
            <p className="text-[12.5px] text-mut m-0">{s.d}</p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
