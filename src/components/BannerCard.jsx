import React, { useRef } from "react";

export default function BannerCard({ item }) {
  const videoRef = useRef(null);

  return (
    <div className="bg-black/50 rounded overflow-hidden shadow-md text-white">
      {item.video ? (
        <video
          ref={videoRef}
          src={item.video}
          poster={item.img}
          controls
          muted
          playsInline
          className="w-full h-auto object-contain md:h-40 md:object-cover"
        />
      ) : (
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-auto object-contain md:h-40 md:object-cover"
        />
      )}

      <div className="">
        <h3 className="text-sm font-semibold">{item.title}</h3>
        <p className="text-xs text-white/60">{item.text}</p>
      </div>
    </div>
  );
}
