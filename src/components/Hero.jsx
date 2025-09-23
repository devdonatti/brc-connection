import React from "react";

export default function Hero({ image, title, subtitle }) {
  return (
    <section className="relative rounded overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-52 md:h-72 object-cover rounded"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          {title}
        </h1>
        <p className="text-sm text-white/70 mt-1">{subtitle}</p>
      </div>
    </section>
  );
}
