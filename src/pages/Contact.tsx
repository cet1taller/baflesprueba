import { useEffect, useState, type FormEvent } from "react";
import {
  Mail,
  Phone,
  GraduationCap,
  Send,
  ArrowLeft,
} from "lucide-react";
import { Reveal, Eyebrow } from "../components/ui";
import { goHome } from "../lib/nav";
import { cn } from "../utils/cn";

/* ============================================================
   PÁGINA: CONTACTO (proyecto escolar)
   Formulario simple: nombre, gmail y teléfono (opcional).
   Al enviar se abre el correo con los datos listos para
   mandar a: nahuelmir2019@gmail.com
   ============================================================ */

const DESTINO = "nahuelmir2019@gmail.com"; // ← correo que recibe los mensajes

interface FormState {
  nombre: string;
  gmail: string;
  telefono: string;
}

const EMPTY: FormState = { nombre: "", gmail: "", telefono: "" };

export function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof FormState, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (form.nombre.trim().length < 2)
      e.nombre = "Ingresá tu nombre (mínimo 2 letras).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.gmail.trim()))
      e.gmail = "Ingresá un correo válido (ej: nombre@gmail.com).";
    if (form.telefono.trim() && !/^[+\d][\d\s()-]{5,}$/.test(form.telefono.trim()))
      e.telefono = "Solo números, espacios y + ( ) -";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    /* Arma el mailto: abre la app de correo con todo listo para enviar */
    const subject = encodeURIComponent(
      `Contacto — Guía de instalación de bafle (${form.nombre.trim()})`
    );
    const body = encodeURIComponent(
      [
        "¡Hola! Te dejo mis datos desde la guía de instalación de bafle:",
        "",
        `Nombre: ${form.nombre.trim()}`,
        `Gmail: ${form.gmail.trim()}`,
        `Teléfono: ${form.telefono.trim() || "— (no dejó)"}`,
      ].join("\n")
    );
    window.location.href = `mailto:${DESTINO}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <main className="relative z-[1]">
      {/* ============================ CABECERA ============================ */}
      <section className="border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1080px] px-6 pt-12 pb-10 md:pt-16 md:pb-12">
          <Reveal>
            <button
              onClick={goHome}
              className="font-mono text-[11.5px] text-mut hover:text-signal transition-colors flex items-center gap-1.5 mb-8 cursor-pointer"
            >
              <ArrowLeft size={13} /> Volver al inicio
            </button>
            <Eyebrow>Contacto · Proyecto escolar</Eyebrow>
            <h1 className="font-bebas uppercase leading-[0.94] text-[clamp(40px,7vw,72px)] m-0 mt-5 mb-4">
              Dejanos tus <span className="text-signal">datos</span>
            </h1>
            <p className="max-w-[560px] text-mut text-[16.5px] m-0">
              Solo necesitamos tu nombre y tu Gmail. El teléfono es opcional.
              Al enviar, tu correo se abre con el mensaje listo para llegar a{" "}
              <span className="text-signal font-mono text-[14px]">{DESTINO}</span>.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================ FORMULARIO ============================ */}
      <section className="py-14 md:py-16">
        <div className="mx-auto max-w-[1080px] px-6 grid lg:grid-cols-12 gap-10">
          {/* ---- Formulario ---- */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="border border-[var(--line)] rounded-sm bg-panel p-5 sm:p-8 relative overflow-hidden">
                <div className="font-mono text-[11px] text-mut tracking-[0.12em] uppercase mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal" />
                  Formulario de contacto
                </div>

                {!sent ? (
                  <form onSubmit={onSubmit} noValidate>
                    <div className="mb-4">
                      <label htmlFor="f-nombre" className="field-label">
                        Nombre y apellido *
                      </label>
                      <input
                        id="f-nombre"
                        type="text"
                        className={cn("field-input", errors.nombre && "field-error")}
                        placeholder="Ej: Juan Pérez"
                        value={form.nombre}
                        maxLength={40}
                        onChange={(e) => set("nombre", e.target.value)}
                      />
                      {errors.nombre && <Err msg={errors.nombre} />}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="f-gmail" className="field-label">
                        Gmail *
                      </label>
                      <input
                        id="f-gmail"
                        type="email"
                        className={cn("field-input", errors.gmail && "field-error")}
                        placeholder="nombre@gmail.com"
                        value={form.gmail}
                        maxLength={60}
                        onChange={(e) => set("gmail", e.target.value)}
                      />
                      {errors.gmail && <Err msg={errors.gmail} />}
                    </div>

                    <div className="mb-7">
                      <label htmlFor="f-tel" className="field-label">
                        Número de teléfono{" "}
                        <span className="text-mut/60">(opcional)</span>
                      </label>
                      <input
                        id="f-tel"
                        type="tel"
                        className={cn("field-input", errors.telefono && "field-error")}
                        placeholder="+54 11 5555 5555"
                        value={form.telefono}
                        maxLength={24}
                        onChange={(e) => set("telefono", e.target.value)}
                      />
                      {errors.telefono && <Err msg={errors.telefono} />}
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-signal text-[#08110d] font-mono text-[12.5px] font-bold tracking-[0.1em] uppercase px-8 py-3.5 rounded-sm cursor-pointer hover:shadow-[0_0_24px_rgba(79,209,165,0.35)] transition-shadow"
                    >
                      <Send size={15} />
                      Enviar datos
                    </button>
                  </form>
                ) : (
                  /* ---- Estado enviado ---- */
                  <div className="text-center py-10">
                    <div className="pop-in inline-flex w-16 h-16 rounded-full bg-[var(--signal-dim)] border border-signal/50 items-center justify-center mb-5">
                      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
                        <path
                          d="M5 12.5 L10 17.5 L19 7"
                          stroke="#4fd1a5"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="draw-check"
                        />
                      </svg>
                    </div>
                    <h3 className="font-bebas text-3xl tracking-[0.03em] uppercase m-0 mb-3">
                      ¡Listo, {form.nombre.split(" ")[0]}!
                    </h3>
                    <p className="text-mut text-sm max-w-[440px] mx-auto mb-2">
                      Se abrió tu aplicación de correo con los datos listos
                      para enviar a{" "}
                      <span className="text-signal font-mono text-[12.5px]">
                        {DESTINO}
                      </span>
                      . Solo tenés que apretar «Enviar» allá.
                    </p>
                    <p className="font-mono text-[11px] text-mut mb-7">
                      ¿No se abrió? Escribinos directo a {DESTINO}
                    </p>
                    <button
                      onClick={() => {
                        setForm(EMPTY);
                        setSent(false);
                      }}
                      className="font-mono text-[11.5px] tracking-[0.1em] uppercase border border-[var(--line)] rounded-sm px-6 py-3 hover:border-signal hover:text-signal transition-colors cursor-pointer"
                    >
                      Cargar otros datos
                    </button>
                  </div>
                )}
              </div>
            </Reveal>
          </div>

          {/* ---- Info lateral ---- */}
          <div className="lg:col-span-5">
            <Reveal delay={120}>
              <div className="border border-[var(--line)] rounded-sm overflow-hidden">
                <div className="relative h-36">
                  <img
                    src={`${import.meta.env.BASE_URL}images/audio-rack.jpg`}
                    alt="Rack de amplificadores con cables speakon"
                    className="absolute inset-0 w-full h-full object-cover saturate-[0.8] contrast-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
                  <span className="absolute bottom-3 left-4 font-mono text-[10.5px] text-mut tracking-[0.1em]">
                    CANAL DIRECTO CON EL EQUIPO
                  </span>
                </div>
                <div className="bg-panel divide-y divide-[var(--line)]">
                  <div className="px-5 py-4 flex items-center gap-3.5">
                    <span className="flex-none w-8 h-8 rounded-[3px] border border-[var(--line)] flex items-center justify-center text-signal">
                      <Mail size={14} />
                    </span>
                    <div className="min-w-0">
                      <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-mut">
                        Los datos llegan a
                      </div>
                      <div className="text-[13.5px] truncate font-mono">
                        {DESTINO}
                      </div>
                    </div>
                  </div>
                  <div className="px-5 py-4 flex items-center gap-3.5">
                    <span className="flex-none w-8 h-8 rounded-[3px] border border-[var(--line)] flex items-center justify-center text-signal">
                      <GraduationCap size={14} />
                    </span>
                    <div className="min-w-0">
                      <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-mut">
                        Tipo de proyecto
                      </div>
                      <div className="text-[13.5px]">
                        Trabajo escolar — guía técnica
                      </div>
                    </div>
                  </div>
                  <div className="px-5 py-4 flex items-center gap-3.5">
                    <span className="flex-none w-8 h-8 rounded-[3px] border border-[var(--line)] flex items-center justify-center text-signal">
                      <Phone size={14} />
                    </span>
                    <div className="min-w-0">
                      <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-mut">
                        Teléfono
                      </div>
                      <div className="text-[13.5px]">
                        Opcional — dejalo solo si querés
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}

/* Mensaje de error de campo */
function Err({ msg }: { msg: string }) {
  return (
    <p className="m-0 mt-1.5 text-[11.5px] text-warn flex items-center gap-1.5 font-mono">
      <span className="inline-block w-1 h-1 rounded-full bg-warn" />
      {msg}
    </p>
  );
}
