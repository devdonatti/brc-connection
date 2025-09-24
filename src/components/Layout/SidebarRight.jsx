import React from "react";

export default function SidebarRight() {
  const ads = [
    "/1 (1).jpeg",
    "/1 (2).jpeg",
    "/1 (3).jpeg",
    "/1 (4).jpeg",
    "/1 (5).jpeg",
  ];

  return (
    <aside className="lg:flex lg:flex-col lg:space-y-4 w-full">
      {/* Desktop: columna */}
      <div className="hidden lg:flex flex-col space-y-4">
        {ads.map((src, i) => (
          <a
            key={i}
            href="#"
            className="block overflow-hidden rounded bg-black/60"
          >
            <img
              src={src}
              alt={`ad-${i}`}
              className="w-full h-36 object-cover"
            />
          </a>
        ))}
      </div>

      {/* Mobile: fila scrollable con animación lenta */}
      <div className="flex lg:hidden gap-4 overflow-x-auto whitespace-nowrap animate-scroll py-2">
        {ads.map((src, i) => (
          <a
            key={i}
            href="#"
            className="inline-block flex-shrink-0 w-40 h-36 rounded bg-black/60 overflow-hidden"
          >
            <img
              src={src}
              alt={`ad-${i}`}
              className="w-full h-full object-contain"
            />
          </a>
        ))}
      </div>

      {/* Animación scroll lento */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </aside>
  );
}
