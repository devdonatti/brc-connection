// src/components/Layout/Header.jsx
import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const links = [
    "Argentina at Night",
    "Centros Turísticos",
    "Restaurante & Resto",
  ];

  const regiones = ["Buenos Aires", "San Carlos de Bariloche", "Rosario"];

  return (
    // header ahora ocupa el 100% del ancho del viewport pero NO impone max-w.
    <header className="sticky p-2 top-0 z-[9999] bg-gray-400/90 backdrop-blur-sm border-b border-white/5">
      {/* Contenedor interior (su anchura la controla el padre — Home) */}
      <div className="flex items-center justify-center p-2 md:p-3 relative">
        <div className="w-full flex items-center justify-center relative">
          {/* Menú desktop */}
          <nav className="hidden md:flex gap-4 text-sm text-white/90 relative z-[9999]">
            {links.map((link, i) => (
              <a key={i} href="#" className="hover:text-accent transition">
                {link}
              </a>
            ))}

            {/* Link con submenu */}
            <div
              className="relative"
              onMouseEnter={() => setSubmenuOpen(true)}
              onMouseLeave={() => setSubmenuOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-accent transition">
                Regiones de la Argentina <ChevronDown size={16} />
              </button>
              {submenuOpen && (
                <div className="absolute top-full left-0 mt-1 w-40 bg-gray-500/95 rounded shadow-lg flex flex-col z-[9999]">
                  {regiones.map((r, i) => (
                    <a
                      key={i}
                      href="#"
                      className="px-3 py-2 hover:bg-white/10 transition text-white/90 text-sm"
                    >
                      {r}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Botón hamburguesa mobile */}
          <button
            className="md:hidden p-1 rounded-md focus:outline-none focus:ring-1 focus:ring-white/30 absolute right-2"
            onClick={() => setOpen((s) => !s)}
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Menú móvil desplegable (aparecerá alineado con el ancho del padre) */}
      {open && (
        <div className="md:hidden">
          <div className="w-full bg-gray-500/95 border-t border-white/5 shadow-md z-[9999]">
            <nav className="flex flex-col items-center gap-2 py-3 text-white/90">
              {links.map((link, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-full text-center py-1 text-sm hover:text-accent transition"
                  onClick={() => setOpen(false)}
                >
                  {link}
                </a>
              ))}
              {/* Submenu mobile */}
              <details className="w-full">
                <summary className="px-3 py-1 text-sm cursor-pointer hover:bg-white/10 rounded text-center">
                  Regiones de la Argentina
                </summary>
                <div className="flex flex-col gap-1 mt-1">
                  {regiones.map((r, i) => (
                    <a
                      key={i}
                      href="#"
                      className="px-3 py-1 text-sm hover:bg-white/10 rounded text-center"
                      onClick={() => setOpen(false)}
                    >
                      {r}
                    </a>
                  ))}
                </div>
              </details>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
