import { useEffect, useState } from "react";

/* ============================================================
   NAVEGACIÓN — cada apartado es una PÁGINA distinta.
   Rutas (hash):
   · #/             → Inicio
   · #/herramientas → §01 Herramientas
   · #/especificas  → §02 Herramientas específicas
   · #/pasos        → §03 Pasos
   · #/polaridad    → §04 Polaridad
   · #/ubicacion    → §05 Ubicación
   · #/seguridad    → §06 Seguridad
   · #/contacto     → Contacto
   ============================================================ */

export type Route =
  | "home"
  | "herramientas"
  | "especificas"
  | "pasos"
  | "polaridad"
  | "ubicacion"
  | "seguridad"
  | "contacto";

export interface PageInfo {
  id: Route;
  num: string; // numeración §
  label: string; // nombre corto (menú)
  titulo: string; // título grande de la página
  desc: string; // descripción corta
}

export const PAGES: PageInfo[] = [
  {
    id: "herramientas",
    num: "§01",
    label: "Herramientas",
    titulo: "Antes de empezar",
    desc: "Lo que necesitás sobre la mesa antes de tocar un cable.",
  },
  {
    id: "especificas",
    num: "§02",
    label: "Específicas",
    titulo: "Herramientas específicas del trabajo",
    desc: "El kit profesional ordenado por tarea: medición, cableado y montaje. Marcá lo que ya tenés listo.",
  },
  {
    id: "pasos",
    num: "§03",
    label: "Pasos",
    titulo: "Pasos de instalación",
    desc: "Seguí el orden: cada paso depende del anterior para que el sistema arranque sin sorpresas.",
  },
  {
    id: "polaridad",
    num: "§04",
    label: "Polaridad",
    titulo: "Polaridad: el error más común",
    desc: 'Un cable invertido no rompe nada, pero cancela frecuencias y "vacía" el sonido. Tocá el interruptor para comparar.',
  },
  {
    id: "ubicacion",
    num: "§05",
    label: "Ubicación",
    titulo: "Dónde ubicar el bafle",
    desc: "La posición cambia más el sonido que casi cualquier ajuste de ecualizador.",
  },
  {
    id: "seguridad",
    num: "§06",
    label: "Seguridad",
    titulo: "Seguridad y errores a evitar",
    desc: "Cuatro reglas que cuidan al bafle, al amplificador y a la gente.",
  },
];

/* Orden completo para el pager "anterior / siguiente" */
export const PAGE_ORDER: { id: Route; label: string }[] = [
  { id: "home", label: "Inicio" },
  ...PAGES.map((p) => ({ id: p.id, label: p.label })),
  { id: "contacto", label: "Contacto" },
];

const ALL_ROUTES: string[] = PAGE_ORDER.map((p) => p.id);

export function parseRoute(): Route {
  const h = window.location.hash.replace(/^#\/?/, "").toLowerCase();
  if (!h) return "home";
  return ALL_ROUTES.includes(h) ? (h as Route) : "home";
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(parseRoute);
  useEffect(() => {
    const onHash = () => setRoute(parseRoute());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
}

export function goTo(route: Route) {
  const target = route === "home" ? "/" : `/${route}`;
  const current = window.location.hash.replace(/^#/, "") || "/";
  if (current === target) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  window.location.hash = target;
}

export const goHome = () => goTo("home");
export const goContact = () => goTo("contacto");

export function pageInfo(id: Route): PageInfo | undefined {
  return PAGES.find((p) => p.id === id);
}
