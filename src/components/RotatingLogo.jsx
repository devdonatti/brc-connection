import React from "react";

const RotatingLogo = ({ src = "/fotos/logos/logo.png", size = "80px" }) => {
  return (
    <div
      className="flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <img
        src={src}
        alt="Logo giratorio"
        className="animate-spin-slow"
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </div>
  );
};

export default RotatingLogo;
