// src/components/Layout/Header.jsx
import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const navigate = useNavigate();

  const links = [
    {
      label: "Argentina at Night",
      path: "/argentinanight",
      submenu: [
        { label: "Bariloche at night", path: "/brcnight" },
        { label: "Rosario At night", path: "/" },
        { label: "Villa Carlos Paz At night", path: "/cbanight" },
      ],
    },
    {
      label: "Centros Turísticos",
      path: "#",
      submenu: [
        { label: "Buenos Aires", path: "/" },
        { label: "Bariloche", path: "/herobanner" },
        { label: "Rosario", path: "/" },
      ],
    },
    { label: "Restaurante & Resto", path: "/restos" },
    {
      label: "Regiones de la Argentina",
      path: "#",
      submenu: [
        { label: "Buenos Aires", path: "/" },
        { label: "San Carlos de Bariloche", path: "/" },
        { label: "Rosario", path: "/" },
      ],
    },
  ];

  const handleNavigate = (path) => {
    if (!path || path === "#") return;
    navigate(path);
    setOpen(false); // cierra menú móvil si estaba abierto
    setSubmenuIndex(null);
  };

  return (
    <header className="sticky top-0 z-[9999] bg-gray-400/90 backdrop-blur-sm">
      <div className="flex justify-center">
        <div className="w-full max-w-[1200px] relative">
          {/* Menú desktop (IGUAL que el original) */}
          <nav className="hidden md:flex w-full text-sm text-white/90 border-y border-white/20">
            {links.map((link, i) => (
              <div
                key={i}
                className={`relative flex-1 text-center border-x border-white/20 last:border-r-0 first:border-l-0`}
                onMouseEnter={() =>
                  link.submenu ? setSubmenuIndex(i) : setSubmenuIndex(null)
                }
                onMouseLeave={() => setSubmenuIndex(null)}
              >
                {/* Link principal */}
                <button
                  className="flex items-center justify-center gap-1 hover:text-accent transition px-4 py-3 w-full cursor-pointer"
                  onClick={() => handleNavigate(link.path)}
                >
                  {link.label}
                  {link.submenu && <ChevronDown size={14} />}
                </button>

                {/* Submenu */}
                {link.submenu && submenuIndex === i && (
                  <div className="absolute top-full left-0 w-full bg-gray-700/95 rounded-b shadow-lg flex flex-col z-[9999]">
                    {link.submenu.map((item, j) => (
                      <button
                        key={j}
                        className="px-3 py-2 hover:bg-white/10 transition text-white/90 text-sm text-left w-full cursor-pointer"
                        onClick={() => handleNavigate(item.path)}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Botón hamburguesa mobile (misma posición que tenías) */}
          {/* Botón hamburguesa mobile */}
          <button
            className="md:hidden p-1 rounded-md focus:outline-none focus:ring-1 focus:ring-black absolute right-2 "
            onClick={() => setOpen((s) => !s)}
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? (
              <X size={20} className="text-black" />
            ) : (
              <Menu size={20} className="text-black" />
            )}
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL MEJORADO (solo esta parte cambia) */}
      <div
        className={`md:hidden transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden ${
          open ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="w-full bg-gray-500/95 border-t border-white/5 shadow-md">
          <nav className="flex flex-col gap-2 py-3 px-3 text-white/95">
            {links.map((link, i) => (
              <div key={i} className="w-full">
                {/* Si no tiene submenu: botón grande y accesible */}
                {!link.submenu ? (
                  <button
                    className="block w-full text-left py-3 text-base hover:bg-white/8 rounded px-3"
                    onClick={() => handleNavigate(link.path)}
                  >
                    {link.label}
                  </button>
                ) : (
                  /* Acordeón simple por cada link con submenu */
                  <div className="w-full">
                    <button
                      onClick={() =>
                        setSubmenuIndex((prev) => (prev === i ? null : i))
                      }
                      className="w-full flex items-center justify-between py-3 px-3 hover:bg-white/8 rounded"
                      aria-expanded={submenuIndex === i}
                    >
                      <span className="text-base">{link.label}</span>
                      <ChevronDown
                        size={18}
                        className={`transition-transform ${
                          submenuIndex === i ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>

                    {/* Submenu expandible */}
                    <div
                      className={`overflow-hidden transition-[max-height,opacity] duration-300 ${
                        submenuIndex === i
                          ? "max-h-40 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="flex flex-col gap-1 mt-1 pl-4 pr-2 pb-2">
                        {link.submenu.map((item, j) => (
                          <button
                            key={j}
                            className="py-2 text-sm text-left hover:bg-white/6 rounded px-2"
                            onClick={() => handleNavigate(item.path)}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Acción extra abajo (Contacto) */}
            <div className="pt-2 px-3">
              <button
                onClick={() => {
                  navigate("/contacto");
                  setOpen(false);
                }}
                className="w-full py-3 bg-white/5 hover:bg-white/10 rounded text-white text-center"
              >
                Contacto
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
