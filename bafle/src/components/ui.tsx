import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import { cn } from "../utils/cn";

/* ---------- Scroll reveal wrapper ---------- */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style: CSSProperties = delay ? { transitionDelay: `${delay}ms` } : {};
  return (
    <div ref={ref} className={cn("reveal", className)} style={style}>
      {children}
    </div>
  );
}

/* ---------- Section header: § numerado + título Bebas ---------- */
export function SectionHead({
  num,
  title,
  desc,
}: {
  num: string;
  title: ReactNode;
  desc?: string;
}) {
  return (
    <Reveal className="mb-10 md:mb-12">
      <div className="font-mono text-[13px] text-mut">{num}</div>
      <h2 className="font-bebas text-[clamp(28px,4vw,40px)] uppercase tracking-[0.01em] leading-none mt-1.5 mb-2.5">
        {title}
      </h2>
      {desc && <p className="text-mut max-w-[560px]">{desc}</p>}
    </Reveal>
  );
}

/* ---------- Mini ecualizador decorativo ---------- */
export function EqBars({ className }: { className?: string }) {
  return (
    <span className={cn("eq", className)} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

/* ---------- Eyebrow con línea ---------- */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="font-mono text-xs tracking-[0.14em] text-signal uppercase flex items-center gap-2.5">
      <span className="inline-block w-6 h-px bg-signal" />
      {children}
    </div>
  );
}
