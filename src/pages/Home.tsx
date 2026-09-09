import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal, SectionHead, Eyebrow, EqBars } from "../components/ui";
import { goTo, goContact, PAGES } from "../lib/nav";

/* ============================================================
   PÁGINA: INICIO
   Hero + índice de apartados (cada uno es una página distinta).
   ============================================================ */

export function Home() {
  return (
    <main className="relative z-[1]">
      {/* ============================ HERO ============================ */}
      <section className="relative overflow-hidden">
        {/* Onda decorativa de fondo */}
        <svg
          className="absolute -right-10 top-1/3 w-[720px] opacity-[0.07] pointer-events-none"
          viewBox="0 0 720 300"
          aria-hidden="true"
        >
          <path
            d="M0 150 Q 45 60 90 150 T 180 150 T 270 150 T 360 150 T 450 150 T 540 150 T 630 150 T 720 150"
            fill="none"
            stroke="#4fd1a5"
            strokeWidth="2"
            className="wave-drift"
          />
          <path
            d="M0 150 Q 45 100 90 150 T 180 150 T 270 150 T 360 150 T 450 150 T 540 150 T 630 150 T 720 150"
            fill="none"
            stroke="#c7c9cc"
            strokeWidth="1.2"
            className="wave-drift"
            style={{ animationDuration: "18s" }}
          />
        </svg>

        <div className="mx-auto max-w-[1080px] px-6 py-16 md:py-24 grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <div className="lg:col-span-7 relative">
            <Reveal>
              <div className="flex items-center gap-4 mb-6">
                <Eyebrow>Guía técnica · Audio en vivo</Eyebrow>
                <EqBars className="text-signal" />
              </div>
              <h1 className="font-bebas uppercase leading-[0.94] tracking-[0.01em] text-[clamp(46px,8vw,88px)] m-0 mb-6">
                Instalación de
                <br />
                parlantes <span className="text-signal">bafle</span>
              </h1>
              <p className="max-w-[560px] text-mut text-[17px] mb-9">
                Del amplificador al gabinete: cómo conectar, ubicar y calibrar
                un sistema de bafles sin quemar el amplificador ni cancelar el
                sonido por error de fase.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div className="grid grid-cols-2 sm:grid-cols-4 border border-[var(--line)] rounded-sm overflow-hidden mb-8">
                {[
                  ["Nivel", "Básico–Intermedio"],
                  ["Tiempo estimado", "45–90 min"],
                  ["Riesgo eléctrico", "Bajo"],
                  ["Herramientas", "6 + 12 específicas"],
                ].map(([k, v], i) => (
                  <div
                    key={k}
                    className={
                      "px-4 py-3.5 " +
                      (i < 2 ? "max-sm:border-b max-sm:border-[var(--line)] " : "") +
                      (i % 2 === 0 ? "max-sm:border-r max-sm:border-[var(--line)] " : "") +
                      "sm:border-r sm:border-[var(--line)] sm:last:border-r-0"
                    }
                  >
                    <div className="text-[10.5px] text-mut uppercase tracking-[0.08em] mb-1.5">
                      {k}
                    </div>
                    <div className="font-mono text-[13.5px]">{v}</div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => goTo("herramientas")}
                className="group inline-flex items-center gap-3 bg-signal text-[#08110d] font-mono text-[12px] font-bold tracking-[0.1em] uppercase px-7 py-3.5 rounded-sm cursor-pointer hover:shadow-[0_0_24px_rgba(79,209,165,0.35)] transition-shadow"
              >
                Empezar la guía
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </Reveal>
          </div>

          {/* Imagen tipo módulo de rack */}
          <Reveal className="lg:col-span-5 hidden lg:block" delay={200}>
            <figure className="relative border border-[var(--line)] rounded-sm bg-panel p-2 rotate-[1.2deg] hover:rotate-0 transition-transform duration-500">
              <div className="relative overflow-hidden rounded-[2px]">
                <img
                  src={`${import.meta.env.BASE_URL}images/speaker-hero.jpg`}
                  alt="Detalle de un woofer de parlante profesional"
                  className="w-full aspect-[4/5] object-cover saturate-[0.85] contrast-110 transition-transform duration-700 hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
                <span className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-metal/50" />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-metal/50" />
              </div>
              <figcaption className="flex items-center justify-between px-2.5 py-2.5 font-mono text-[10.5px] text-mut tracking-[0.08em]">
                <span>DRIVER 12&quot; · 8Ω · 400W RMS</span>
                <span className="flex items-center gap-1.5">
                  <span className="led-dot !w-[6px] !h-[6px]" /> ACTIVO
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ============================ ÍNDICE DE APARTADOS ============================ */}
      <section className="border-t border-[var(--line)] py-14 md:py-16">
        <div className="mx-auto max-w-[1080px] px-6">
          <SectionHead
            num="ÍNDICE"
            title="Apartados de la guía"
            desc="Cada tema tiene su propia página: elegí por dónde empezar."
          />
          <div className="grid sm:grid-cols-2 gap-3">
            {PAGES.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <button
                  onClick={() => goTo(p.id)}
                  className="w-full text-left border border-[var(--line)] rounded-sm bg-panel p-5 cursor-pointer group hover:border-signal/50 hover:-translate-y-0.5 transition-all duration-300 h-full"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[12px] text-mut group-hover:text-signal transition-colors">
                      {p.num}
                    </span>
                    <ArrowRight
                      size={16}
                      className="text-mut group-hover:text-signal group-hover:translate-x-1 transition-all"
                    />
                  </div>
                  <h3 className="m-0 mb-1.5 text-[16px] font-semibold group-hover:text-signal transition-colors">
                    {p.label === "Específicas"
                      ? "Herramientas específicas"
                      : p.label}
                  </h3>
                  <p className="m-0 text-[12.5px] text-mut line-clamp-2">
                    {p.desc}
                  </p>
                </button>
              </Reveal>
            ))}

            {/* Tarjeta de contacto */}
            <Reveal delay={PAGES.length * 60}>
              <button
                onClick={goContact}
                className="w-full text-left border border-signal/40 rounded-sm bg-[var(--signal-dim)] p-5 cursor-pointer group hover:border-signal hover:-translate-y-0.5 transition-all duration-300 h-full"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[12px] text-signal">✉</span>
                  <ArrowUpRight
                    size={16}
                    className="text-signal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </div>
                <h3 className="m-0 mb-1.5 text-[16px] font-semibold text-signal">
                  Contacto
                </h3>
                <p className="m-0 text-[12.5px] text-mut">
                  ¿Quedó alguna duda? Dejanos tu nombre y tu correo.
                </p>
              </button>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
