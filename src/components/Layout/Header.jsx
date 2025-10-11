// src/components/Layout/Header.jsx
import React, { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * Header ahora acepta props opcionales:
 * - mobileOpen (boolean) y setMobileOpen (fn) => control externo del drawer mobile.
 *
 * Si no se pasan, Header usa su propio state interno para seguir funcionando igual.
 */
export default function Header({ mobileOpen, setMobileOpen }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = typeof mobileOpen === "boolean" ? mobileOpen : internalOpen;
  const setOpen =
    typeof setMobileOpen === "function" ? setMobileOpen : setInternalOpen;

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

  // Navegación: cerrar drawer si es mobile
  const handleNavigate = (path) => {
    if (!path || path === "#") return;
    navigate(path);
    setOpen(false);
    setSubmenuIndex(null);
  };

  // Cerrar drawer si viewport >= md (evita quedar abierto al redimensionar)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e) => {
      if (e.matches) {
        setOpen(false);
        setSubmenuIndex(null);
      }
    };
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, [setOpen]);

  return (
    <header className="sticky top-0 z-[9999] bg-gray-400/90 backdrop-blur-sm">
      <div className="flex justify-center">
        <div className="w-full max-w-[1200px] relative">
          {/* Menú desktop (no cambia) */}
          <nav className="hidden md:flex w-full text-sm text-white/90 border-y border-white/20 overflow-visible">
            {links.map((link, i) => (
              <div
                key={i}
                className={`relative flex-1 text-center border-x border-white/20 last:border-r-0 first:border-l-0`}
                onMouseEnter={() =>
                  link.submenu ? setSubmenuIndex(i) : setSubmenuIndex(null)
                }
                onMouseLeave={() => setSubmenuIndex(null)}
              >
                <button
                  className="flex items-center justify-center gap-1 hover:text-accent transition px-4 py-3 w-full cursor-pointer"
                  onClick={() => handleNavigate(link.path)}
                >
                  {link.label}
                  {link.submenu && <ChevronDown size={14} />}
                </button>

                {/* Submenu (desktop) */}
                {link.submenu && submenuIndex === i && (
                  <div className="absolute top-full left-0 w-full bg-gray-700/95 rounded-b shadow-lg flex flex-col z-[99999]">
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

          {/* Botón hamburguesa mobile (sigue aquí, pero ahora responde al state externo si se lo pasás) */}
        </div>
      </div>

      {/* MENÚ MÓVIL (drawer acordeón) */}
      <div
        className={`md:hidden transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden ${
          open ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="w-full bg-gray-500/95 border-t border-white/5 shadow-md">
          <nav className="flex flex-col gap-2 py-3 px-3 text-white/95">
            {links.map((link, i) => (
              <div key={i} className="w-full">
                {!link.submenu ? (
                  <button
                    className="block w-full text-left py-3 text-base hover:bg-white/8 rounded px-3"
                    onClick={() => handleNavigate(link.path)}
                  >
                    {link.label}
                  </button>
                ) : (
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
