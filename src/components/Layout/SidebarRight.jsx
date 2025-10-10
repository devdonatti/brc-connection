import React from "react";

export default function SidebarRight() {
  const ads = [
    "/fotos/publicidad/youtube.jpg",
    "/fotos/publicidad/1 (2).jpeg",
    "/fotos/publicidad/1 (3).jpeg",
    "/fotos/publicidad/1 (4).jpeg",
    "/fotos/publicidad/youtube1.jpg",

    "/fotos/publicidad/afa.jpg",
    "/fotos/publicidad/facebook1.jpg",
    "/fotos/publicidad/pepsi.jpg",
  ];

  return (
    <aside className="w-full box-border">
      {/* Desktop: columna (oculto en mobile) */}
      <div className="hidden lg:flex flex-col  w-full">
        {ads.map((src, i) => (
          <a
            key={i}
            href="#"
            className="block overflow-hidden rounded bg-black/60 w-full"
            aria-label={`Publicidad ${i + 1}`}
          >
            <img
              src={src}
              alt={`ad-${i}`}
              loading="lazy"
              decoding="async"
              className="w-full max-w-full h-36 object-cover block"
            />
          </a>
        ))}
      </div>

      {/* Mobile: fila scrollable con animación lenta pero sin desbordar */}
      <div className="lg:hidden relative w-full overflow-hidden py-2">
        {/* Scroll track: duplicamos los items para loop suave */}
        <div className="scroll-track flex gap-4 items-center will-change-transform">
          {/** primera pasada */}
          {ads.map((src, i) => (
            <a
              key={`a-${i}`}
              href="#"
              className="inline-block flex-shrink-0 w-40 h-36 rounded bg-black/60 overflow-hidden"
              aria-label={`Publicidad móvil ${i + 1}`}
            >
              <img
                src={src}
                alt={`ad-mobile-${i}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover block"
              />
            </a>
          ))}

          {/** segunda pasada (para que el loop no muestre salto) */}
          {ads.map((src, i) => (
            <a
              key={`b-${i}`}
              href="#"
              className="inline-block flex-shrink-0 w-40 h-36 rounded bg-black/60 overflow-hidden"
              aria-label={`Publicidad móvil dup ${i + 1}`}
            >
              <img
                src={src}
                alt={`ad-mobile-dup-${i}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover block"
              />
            </a>
          ))}
        </div>

        {/* Estilos específicos (animación contenida) */}
        <style jsx>{`
          /* animación lenta que mueve la pista hacia la izquierda */
          @keyframes slow-scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          /* Aseguramos que la pista sea lo suficientemente ancha (duplica contenido) */
          .scroll-track {
            display: flex;
            gap: 1rem;
            align-items: center;
            /* animation sólo activa en pantallas pequeñas para no interferir con desktop */
            animation: slow-scroll 30s linear infinite;
          }

          /* Evitamos cualquier posible salto de layout */
          .scroll-track > a {
            box-sizing: border-box;
          }

          /* Si querés desactivar la animación en dispositivos con reduce-motion */
          @media (prefers-reduced-motion: reduce) {
            .scroll-track {
              animation: none;
            }
          }
        `}</style>
      </div>
    </aside>
  );
}
