import React, { useState, useEffect } from 'react';
import { FAMILIA_FOTOS } from '../data/constants';

export default function JuegoHormigasTiaAna({ playSound, onSuccess }) {
  const [hormigas, setHormigas] = useState([]);
  const [puntos, setPuntos] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHormigas((prev) => {
        if (prev.length < 6) {
          return [
            ...prev,
            {
              id: Date.now() + Math.random(),
              x: Math.random() * 75 + 10,
              y: Math.random() * 75 + 10,
            },
          ];
        }
        return prev;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const aplastarHormiga = (id) => {
    playSound('pop');
    setHormigas((prev) => prev.filter((h) => h.id !== id));
    setPuntos((prev) => {
      const nuevosPuntos = prev + 1;
      if (nuevosPuntos % 5 === 0) {
        onSuccess();
      }
      return nuevosPuntos;
    });
  };

  return (
    <div className="relative h-[70vh] w-full overflow-hidden p-4">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
        <div className="w-40 h-40 rounded-full bg-amber-200 border-8 border-amber-400 shadow-2xl flex flex-col items-center justify-center overflow-hidden relative">
          <img 
            src={FAMILIA_FOTOS.tiaAna} 
            alt="Tía Ana" 
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <span className="absolute bottom-2 bg-amber-500 text-white font-bold px-3 py-1 rounded-full text-xs">
            Tía Ana 🍪
          </span>
        </div>
      </div>

      {hormigas.map((h) => (
        <button
          key={h.id}
          onClick={() => aplastarHormiga(h.id)}
          style={{ top: `${h.y}%`, left: `${h.x}%` }}
          className="absolute text-5xl hover:scale-125 transition transform active:scale-50 animate-pulse cursor-pointer"
        >
          🐜
        </button>
      ))}

      <div className="absolute top-4 left-4 bg-white/90 font-black text-xl px-4 py-2 rounded-full shadow-lg border-2 border-amber-300">
        🐜 Atrapadas: {puntos}
      </div>
    </div>
  );
}