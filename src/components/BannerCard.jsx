import React, { useRef } from "react";

export default function BannerCard({ item }) {
  const videoRef = useRef(null);

  return (
    <div className="bg-black/50 rounded overflow-hidden shadow-md text-white">
      {item.video ? (
        <video
          ref={videoRef}
          src={item.video} // ej: "/videos/promo.mp4" en public/
          poster={item.img} // fallback
          controls
          muted
          playsInline
          className="w-full h-40 object-cover"
        />
      ) : (
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-40 object-cover"
        />
      )}

      <div className="p-2">
        <h3 className="text-sm font-semibold">{item.title}</h3>
        <p className="text-xs text-white/60">{item.text}</p>
      </div>
    </div>
  );
}
