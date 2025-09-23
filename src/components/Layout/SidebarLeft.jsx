import React from "react";
import { menuItems } from "../../data/menu";

export default function SidebarLeft() {
  return (
    <aside className="hidden lg:block">
      <div className="bg-black/50 p-3 rounded shadow-inner space-y-3 text-sm text-white/90">
        <input
          placeholder="Buscar..."
          className="w-full px-2 py-1 rounded bg-white/5"
        />
        <ul className="space-y-1 max-h-[65vh] overflow-auto pr-2">
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
      </div>
    </aside>
  );
}
