import React from "react";

export default function Logo() {
  return (
    <div className="w-full h-40 bg-black relative">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between p-2 md:p-4">
        {/* Logo */}
        <div
          className="flex justify-center md:justify-start items-center mx-auto md:mx-2 mt-4
         md:mt-0"
        >
          <img
            className="h-20 w-auto md:h-32" // más chico en mobile
            src="/logoo.png"
            alt="logo principal"
          />
          <img
            className="h-10 w-auto -ml-0.5 md:h-16" // más chico en mobile
            src="/conectt.png"
            alt="texto logo"
          />
        </div>

        {/* Selector de idioma desktop */}
        <div className="hidden md:flex text-white text-sm gap-2">
          <button className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 transition">
            EN
          </button>
          <button className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 transition">
            ES
          </button>
        </div>
      </div>

      {/* Selector de idioma mobile */}
      <div className="absolute top-4 right-2 flex md:hidden gap-2 text-white text-sm">
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
