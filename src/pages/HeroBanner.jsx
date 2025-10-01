export default function HeroBanner({
  mainImage = "/fotos/publicidad/portada.jpg",
  thumbnails = [],
  leftLogo,
  rightLogo,
  caption,
}) {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Imagen principal */}
      <img
        src={mainImage}
        alt={caption || "Hero image"}
        className="w-full h-56 sm:h-72 md:h-96 object-cover"
      />

      {/* Overlay curvo (SVG) encima de la imagen para crear la franja negra curva */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 200"
          className="w-full h-[100px] md:h-[140px] lg:h-[180px]"
          preserveAspectRatio="none"
        >
          {/* curva negra */}
          <path
            d="M0,120 C240,200 480,0 720,60 C960,120 1200,80 1440,140 L1440,200 L0,200 Z"
            fill="rgba(8,8,10,0.85)"
          />
        </svg>
      </div>

      {/* Logos superpuestos */}
      {leftLogo && (
        <div className="absolute left-4 top-4 hidden sm:block">
          <img src={leftLogo} alt="left logo" className="h-12 object-contain" />
        </div>
      )}

      {rightLogo && (
        <div className="absolute right-2 top-6 hidden md:block">
          <img
            src={rightLogo}
            alt="right logo"
            className="h-20 object-contain transform rotate-0"
          />
        </div>
      )}

      {/* Miniaturas circulares centradas (sobre la franja) */}
      <div className="absolute left-0 right-0 -bottom-6 flex justify-center items-end pointer-events-auto">
        <div className="flex items-center gap-3 bg-transparent px-2">
          {thumbnails.length > 0 ? (
            thumbnails.map((t, i) => (
              <div
                key={i}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-4 border-white/20 bg-white/5 shadow-lg"
              >
                <img
                  src={t.src}
                  alt={t.alt || `thumb-${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))
          ) : (
            <div className="text-white/60 text-sm">Miniaturas aquí</div>
          )}
        </div>
      </div>

      {/* Texto/caption en la franja (debajo de las miniaturas) */}
      <div className="absolute left-0 right-0 bottom-0 pb-4 md:pb-6 text-center">
        <div className="max-w-[900px] mx-auto px-4">
          <p className="text-white/80 text-sm md:text-base">
            {caption ||
              "San Martín de los Andes es el lugar, Chapelco es la montaña."}
          </p>
        </div>
      </div>

      {/* Espacio extra para que no tape el contenido siguiente por las miniaturas */}
      <div className="h-10 md:h-14" />
    </section>
  );
}
