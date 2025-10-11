import React, { useEffect, useState } from "react";
import { menuItems } from "../../data/menu";
import BannerCard from "../BannerCard";

export default function SidebarLeft() {
  const [open, setOpen] = useState(false);

  // Cierra el drawer si la pantalla pasa a desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  return (
    <>
      {/* TOP BAR - visible solo en pantallas < lg */}
      <header className="lg:hidden sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              aria-label="Abrir menú"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
            >
              {/* Icono hamburger (visible) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <div className="text-lg font-semibold text-black">
              BRC Connection
            </div>
          </div>

          {/* Banner pequeño opcional en el top bar */}
          <div className="hidden sm:block">
            <img
              src="/fotos/publicidad/1 (4).jpeg"
              alt="banner"
              className="h-8 object-contain"
            />
          </div>
        </div>
      </header>

      {/* Overlay (fondo oscuro) */}
      <div
        className={`fixed inset-0 z-40 transition-opacity ${
          open ? "opacity-60 visible" : "opacity-0 invisible"
        } bg-black`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      {/* Drawer panel */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-[280px] max-w-[85vw] transform bg-white shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:block lg:w-auto lg:max-w-none`}
        aria-hidden={!open}
      >
        <div className="h-full flex flex-col p-4 gap-4">
          {/* Close button visible solo en mobile */}
          <div className="flex items-center justify-between lg:hidden">
            <div className="text-lg font-semibold">Navegación</div>
            <button
              aria-label="Cerrar menú"
              onClick={() => setOpen(false)}
              className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Banner superior */}
          <div className="mt-2">
            <BannerCard
              item={{
                id: "sidebar-banner",
                img: "/fotos/publicidad/1 (4).jpeg",
              }}
            />
          </div>

          {/* Caja del menú */}
          <div className="bg-black/60 p-3 rounded shadow-inner text-sm text-white/90 flex flex-col gap-3">
            {/* Input de búsqueda */}
            <input
              placeholder="Buscar..."
              className="w-full px-2 py-1 rounded bg-white/5 focus:outline-none focus:ring-1 focus:ring-green-500 text-white placeholder-white/70"
            />

            {/* Lista de items con divisores */}
            <ul className="flex flex-col max-h-[60vh] overflow-y-auto pr-1">
              {menuItems.map((i, index) => (
                <React.Fragment key={i.id}>
                  <li>
                    <a
                      href={i.href}
                      onClick={() => setOpen(false)} // cerramos drawer al navegar en mobile
                      className="block px-2 py-2 hover:bg-white/10 rounded transition-colors"
                    >
                      {i.label}
                    </a>
                  </li>

                  {/* Línea divisoria entre items */}
                  {index < menuItems.length - 1 && (
                    <hr className="border-t border-white/20 my-1" />
                  )}
                </React.Fragment>
              ))}
            </ul>

            {/* Banner inferior */}
            <div className="mt-2">
              <BannerCard
                item={{
                  id: "sidebar-banner-bottom",
                  img: "/fotos/publicidad/1 (4).jpeg",
                }}
              />
            </div>
          </div>
        </div>
      </aside>

      {/* Sidebar placeholder para layout en desktop */}
      <div className="hidden lg:block lg:col-span-3" />
    </>
  );
}
