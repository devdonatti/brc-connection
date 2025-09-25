import React from "react";

export default function Logo() {
  return (
    <div className="w-full bg-black relative">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between p-2 md:p-4">
        {/* Logo */}
        <div className="flex justify-center md:justify-start md:w-auto items-center mx-auto md:mx-0">
          <img className="h-34 w-auto" src="/logoo.png" alt="logo" />
          <img
            className="h-40 w-auto -ml-2 pt-1"
            src="/conectt.png"
            alt="logo"
          />
        </div>

        {/* Selector de idioma */}
        <div className="hidden md:flex justify-center md:justify-between md:w-auto text-white text-sm gap-2">
          <button className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 transition">
            EN
          </button>
          <button className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 transition">
            ES
          </button>
        </div>
      </div>

      {/* Selector en mobile (arriba a la derecha) */}
      <div className="absolute top-2 right-2 flex md:hidden gap-2 text-white text-sm">
        <button className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 transition">
          EN
        </button>
        <button className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 transition">
          ES
        </button>
      </div>
    </div>
  );
}
