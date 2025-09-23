import React from "react";

export default function Footer() {
  return (
    <footer className="mt-6 bg-black/60 border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-4 py-5 text-sm text-white/70 flex flex-col md:flex-row items-center justify-between gap-3">
        <div>
          © {new Date().getFullYear()} BRC - Clone. Desarrollado por MDev
        </div>
        <div className="flex gap-3 items-center">
          <div className="text-xs">Logos: </div>
          <img src="/assets/logo.png" alt="logo" className="h-6 opacity-80" />
        </div>
      </div>
    </footer>
  );
}
