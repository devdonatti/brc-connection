import React from "react";

export default function Footer() {
  return (
    <footer className="mt-6 bg-black/60 border-t border-white/5 overflow-x-hidden">
      <div className="max-w-[1200px] mx-auto px-4 md:px-0 py-5 text-sm text-white/70 flex flex-col md:flex-row items-center justify-between gap-3">
        <div>{new Date().getFullYear()} BRCconnection.com</div>
      </div>
      <div className="text-sm p-2 text-gray-400 text-center">
        Desarrollado por MDev
      </div>
    </footer>
  );
}
