import { useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { HerramientasPage } from "./pages/Herramientas";
import { EspecificasPage } from "./pages/Especificas";
import { PasosPage } from "./pages/Pasos";
import { PolaridadPage } from "./pages/PolaridadPage";
import { UbicacionPage } from "./pages/Ubicacion";
import { SeguridadPage } from "./pages/Seguridad";
import { Contact } from "./pages/Contact";
import { useRoute, pageInfo, type Route } from "./lib/nav";

/* ============================================================
   APP — Guía técnica: Instalación de Parlantes Bafle
   Cada apartado es una página distinta (cambio por hash):
   · #/ → Inicio            · #/polaridad   → §04
   · #/herramientas → §01   · #/ubicacion   → §05
   · #/especificas  → §02   · #/seguridad   → §06
   · #/pasos        → §03   · #/contacto    → Contacto
   ============================================================ */

const TITLES: Record<Route, string> = {
  home: "Instalación de Parlantes Bafle — Guía Técnica",
  contacto: "Contacto — Guía Bafle",
  ...Object.fromEntries(
    ["herramientas", "especificas", "pasos", "polaridad", "ubicacion", "seguridad"].map(
      (id) => {
        const p = pageInfo(id as Route)!;
        return [id, `${p.num} ${p.label} — Guía Bafle`];
      }
    )
  ),
} as Record<Route, string>;

export default function App() {
  const route = useRoute();

  /* Al cambiar de página: scroll arriba + título de la pestaña */
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = TITLES[route];
  }, [route]);

  return (
    <div className="min-h-screen bg-bg text-ink">
      <Header route={route} />

      {/* key={route} → cada página monta de nuevo con su animación */}
      <div key={route} className="page-enter">
        {route === "home" && <Home />}
        {route === "herramientas" && <HerramientasPage />}
        {route === "especificas" && <EspecificasPage />}
        {route === "pasos" && <PasosPage />}
        {route === "polaridad" && <PolaridadPage />}
        {route === "ubicacion" && <UbicacionPage />}
        {route === "seguridad" && <SeguridadPage />}
        {route === "contacto" && <Contact />}
      </div>

      <Footer />
    </div>
  );
}
