import React from "react";
import { menuItems } from "../../data/menu";
import BannerCard from "../BannerCard"; // asumimos que tienes este componente

export default function SidebarLeft() {
  return (
    <aside className="hidden lg:block">
      {/* Banner superior */}
      <div className="mt-2">
        <BannerCard
          item={{
            id: "sidebar-banner",
            img: "/fotos/publicidad/1 (4).jpeg", // cambia por tu imagen de banner
          }}
        />
      </div>

      {/* Caja del menú */}
      <div className="bg-black/50 p-3 rounded shadow-inner text-sm text-white/90 flex flex-col gap-3">
        {/* Input de búsqueda */}
        <input
          placeholder="Buscar..."
          className="w-full px-2 py-1 rounded bg-white/5 focus:outline-none focus:ring-1 focus:ring-green-500"
        />

        {/* Lista de items con divisores */}
        <ul className="flex flex-col max-h-[65vh] overflow-y-auto pr-1">
          {menuItems.map((i, index) => (
            <React.Fragment key={i.id}>
              <li>
                <a
                  href={i.href}
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
              img: "/fotos/publicidad/1 (4).jpeg", // cambia por tu imagen de banner
            }}
          />
        </div>
      </div>
    </aside>
  );
}
