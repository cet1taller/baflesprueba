/* ============================================================
   ★★★  NOMBRES DE LOS CREADORES — EDITÁ ESTA LISTA  ★★★
   ------------------------------------------------------------
   Acá van los nombres de tu grupo. Cambiá el texto entre
   comillas por el nombre y el rol de cada uno.
   Si son más o menos de 3, agregá o borrá líneas:
   { nombre: "Nombre Apellido", rol: "Rol en el proyecto" },
   Lo que escribas acá se muestra en el FOOTER (apartado F.3)
   de todas las páginas.
   ============================================================ */

export interface Creador {
  nombre: string;
  rol: string;
}

export const CREADORES: Creador[] = [
  { nombre: "Nahuel", rol: "Rol en el proyecto" },
  { nombre: "Compañero/a 1", rol: "Rol en el proyecto" },
  { nombre: "Compañero/a 2", rol: "Rol en el proyecto" },
];
