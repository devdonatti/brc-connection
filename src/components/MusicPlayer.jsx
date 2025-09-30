import React, { useRef, useState, useEffect } from "react";

// Ejemplo de 30 canciones locales
const tracks = Array.from({ length: 30 }, (_, i) => ({
  title: `${i + 1} - Canción ${i + 1}`,
  file: `/songs/${String(i + 1).padStart(2, "0")}-cancion-${i + 1}.mp3`,
}));

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);

  // Auto-reproducción al cargar la página
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = true; // silenciado para autoplay
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() =>
        setError("Autoplay bloqueado, interactúa para reproducir con sonido")
      );

    const handleEnded = () => setIndex((i) => (i + 1) % tracks.length);
    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
    if (isPlaying) {
      audio.play().catch(() => console.warn("Reproducción bloqueada"));
    }
  }, [index, isPlaying]);

  const handlePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      audio.muted = false;
      await audio.play();
      setIsPlaying(true);
      setError(null);
    } catch (err) {
      console.error("play blocked", err);
      setError("Reproducción bloqueada. Interactuá con la página.");
    }
  };

  const handlePause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const handleNext = () => {
    setIndex((i) => (i + 1) % tracks.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setIndex((i) => (i - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  return (
    <div className="p-4 bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-xl shadow-lg w-full max-w-sm mx-auto flex flex-col items-center gap-3">
      {/* Título de la canción */}
      <div className="font-semibold text-white text-center text-sm md:text-base truncate">
        {tracks[index].title}
      </div>

      {/* Barra de progreso simulada */}
      <div className="w-full h-1 bg-gray-600 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all duration-300"
          style={{ width: isPlaying ? "70%" : "0%" }}
        ></div>
      </div>

      {/* Controles */}
      <div className="flex gap-2">
        <button
          onClick={handlePrev}
          className="bg-gray-700 hover:bg-gray-600 text-white rounded-full p-2 shadow-md transition text-xs"
        >
          ⏮
        </button>
        <button
          onClick={handlePlay}
          className="bg-gray-500 hover:bg-green-400 text-white rounded-full p-2 shadow-md transition text-xs"
        >
          ▶️
        </button>
        <button
          onClick={handlePause}
          className="bg-gray-500 hover:bg-yellow-400 text-white rounded-full p-2 shadow-md transition text-xs"
        >
          ⏸
        </button>
        <button
          onClick={handleNext}
          className="bg-gray-500 hover:bg-blue-400 text-white rounded-full p-2 shadow-md transition text-xs"
        >
          ⏭
        </button>
      </div>

      {/* Mensaje de error */}
      {error && <div className="text-gray text-xs text-center">{error}</div>}

      <audio ref={audioRef} className="hidden">
        <source src={tracks[index].file} type="audio/mpeg" />
        Tu navegador no soporta audio.
      </audio>

      <div className="mt-1 text-xs text-white/50 text-center">
        ⚠️ Algunos navegadores bloquearán autoplay hasta que interactúes.
      </div>
    </div>
  );
}
