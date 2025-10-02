// src/components/RegionHeroCordoba.jsx
import React from "react";

export default function RegionHeroCordoba() {
  const bg = "/fotos/regiones/cordoba.jpg"; // imagen en public/fotos/regiones/cordoba.jpg

  return (
    <section className="w-screen h-screen overflow-hidden">
      <div className="relative w-full h-full overflow-hidden">
        {/* Fondo */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url('${bg}')` }}
        />

        {/* Banda curva inferior */}
        <div className="absolute left-0 right-0 bottom-0">
          <svg
            viewBox="0 0 1200 200"
            preserveAspectRatio="none"
            className="w-full h-32 md:h-44 lg:h-56"
          >
            <path
              d="M0,40 C200,120 400,100 600,120 C800,140 1000,120 1200,40 L1200,200 L0,200 Z"
              fill="#06070a"
              opacity="0.95"
            />
          </svg>
        </div>

        {/* Elementos principales */}
        <div className="absolute inset-0 flex items-end justify-center pb-6 md:pb-10 lg:pb-14">
          <div className="w-full max-w-[1200px] px-4 flex items-end justify-between">
            {/* Logo izquierdo */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/10 p-2">
                <img
                  src="/fotos/logoo.png"
                  alt="logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-sm text-gray-200">connection.com</div>
            </div>

            {/* Miniaturas centro */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-4">
                {[
                  "/fotos/regiones/cordoba.jpg",
                  "/fotos/regiones/cordoba.jpg",
                  "/fotos/regiones/cordoba.jpg",
                  "/fotos/regiones/cordoba.jpg",
                ].map((src, i) => (
                  <div
                    key={i}
                    className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden shadow-lg border-2 border-white/30 bg-white/5"
                  >
                    <img
                      src={src}
                      alt={`miniatura ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-xs sm:text-sm md:text-base text-gray-200/90">
                Bariloche, ¡Quiero estar ahí!
              </p>
            </div>

            {/* Logo derecho */}
            <div className="hidden md:flex items-center gap-3">
              <div className="text-sm text-gray-200">RIO</div>
              <div className="w-16 h-12 md:w-20 md:h-14 flex items-center justify-center bg-white/5 rounded">
                <img
                  src="/fotos/conectt.png"
                  alt="sello"
                  className="max-h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Puntos de colores inferiores */}
        <div className="absolute left-6 bottom-6 flex gap-2 items-center">
          <div className="w-3 h-3 rounded-full bg-red-400 shadow-sm" />
          <div className="w-3 h-3 rounded-full bg-green-400 shadow-sm" />
          <div className="w-3 h-3 rounded-full bg-blue-400 shadow-sm" />
        </div>

        {/* Badge vertical derecho */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 pr-2">
          <div className="hidden lg:block rotate-90 origin-right">
            <div className="bg-blue-600 text-white text-xs px-3 py-1 rounded-l-full shadow-md">
              connection.com
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
