import React from "react";

export default function Logo() {
  return (
    <div className="w-full bg-black">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between p-2 md:p-4">
        {/* Logo */}
        <div className="flex justify-center md:justify-start w-full md:w-auto">
          <img className="h-24 w-auto" src="/logo.png" alt="logo" />
        </div>

        {/* Selector de idioma */}
        <div className="mt-2 md:mt-0 flex justify-center md:justify-end w-full md:w-auto text-white text-sm gap-2">
          <button className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 transition">
            EN
          </button>
          <button className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 transition">
            ES
          </button>
        </div>
      </div>
    </div>
  );
}
