import React from "react";
import { menuItems } from "../../data/menu";
import BannerCard from "../BannerCard"; // asumimos que tienes este componente

export default function SidebarLeft() {
  return (
    <aside className="hidden lg:block">
      <div className="mt-2">
        <BannerCard
          item={{
            id: "sidebar-banner",

            img: "/1 (4).jpeg", // cambia por tu imagen de banner
          }}
        />
      </div>
      <div className="bg-black/50 p-3 rounded shadow-inner text-sm text-white/90 flex flex-col gap-3">
        {/* Input de búsqueda */}
        <input
          placeholder="Buscar..."
          className="w-full px-2 py-1 rounded bg-white/5 focus:outline-none focus:ring-1 focus:ring-green-500"
        />

        {/* Lista de items */}
        <ul className="flex flex-col gap-1 max-h-[65vh] overflow-y-auto pr-2 scrollbar-none">
          {menuItems.map((i) => (
            <li key={i.id}>
              <a
                href={i.href}
                className="block px-2 py-1 rounded hover:bg-white/5"
              >
                {i.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Banner al final */}
        <div className="mt-2">
          <BannerCard
            item={{
              id: "sidebar-banner",

              img: "/1 (4).jpeg", // cambia por tu imagen de banner
            }}
          />
        </div>
      </div>
    </aside>
  );
}
