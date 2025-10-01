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
        { label: "Villa Carlos Paz At night", path: "/" },
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
  };

  return (
    <header className="sticky top-0 z-[9999] bg-gray-400/90 backdrop-blur-sm">
      <div className="flex justify-center">
        <div className="w-full max-w-[1200px] relative">
          {/* Menú desktop */}
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

          {/* Botón hamburguesa mobile */}
          <button
            className="md:hidden p-1 rounded-md focus:outline-none focus:ring-1 focus:ring-white/30 absolute right-2 top-2"
            onClick={() => setOpen((s) => !s)}
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {open && (
        <div className="md:hidden">
          <div className="w-full bg-gray-500/95 border-t border-white/5 shadow-md z-[9999]">
            <nav className="flex flex-col items-center gap-2 py-3 text-white/90">
              {links.map((link, i) => (
                <div key={i} className="w-full text-center">
                  {/* Link directo */}
                  {!link.submenu ? (
                    <button
                      className="block w-full py-1 text-sm hover:text-accent transition cursor-pointer"
                      onClick={() => handleNavigate(link.path)}
                    >
                      {link.label}
                    </button>
                  ) : (
                    // Submenu mobile
                    <details className="w-full">
                      <summary className="px-3 py-1 text-sm cursor-pointer hover:bg-white/10 rounded text-center">
                        Ver {link.label}
                      </summary>
                      <div className="flex flex-col gap-1 mt-1">
                        {link.submenu.map((item, j) => (
                          <button
                            key={j}
                            className="px-3 py-1 text-sm hover:bg-white/10 rounded text-center cursor-pointer"
                            onClick={() => handleNavigate(item.path)}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </details>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
