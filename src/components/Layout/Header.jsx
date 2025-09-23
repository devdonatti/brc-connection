import React from "react";

export default function Header() {
  return (
    <header className="bg-black/50 border-b border-white/5">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between p-3">
        <div className="flex items-center ">
          <nav className="hidden md:flex gap-4 text-center text-sm text-white/90">
            <a className="hover:text-accent transition" href="#">
              Argentina at Night
            </a>
            <a className="hover:text-accent transition" href="#">
              Centros Turísticos
            </a>
            <a className="hover:text-accent transition" href="#">
              Hospedaje
            </a>
            <a className="hover:text-accent transition" href="#">
              Restaurante & Resto
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
