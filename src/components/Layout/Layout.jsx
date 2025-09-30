// src/components/Layout/Layout.jsx
import React from "react";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen w-full bg-black bg-cover bg-no-repeat bg-center text-white overflow-x-hidden">
      {children}
    </div>
  );
}
