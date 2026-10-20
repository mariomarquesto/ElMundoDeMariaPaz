import React, { useState, useEffect } from 'react';
import { FAMILIARES } from '../data/constants';

export default function JuegoFamiliaAdivina({ onSuccess, playSound }) {
  const [objetivo, setObjetivo] = useState(() => FAMILIARES[0]);

  // Función para que la app hable en voz alta
  const hablarTexto = (texto) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(texto);
      utterance.lang = 'es-AR';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const nuevoTurno = () => {
    const azar = FAMILIARES[Math.floor(Math.random() * FAMILIARES.length)];
    setObjetivo(azar);
    setTimeout(() => {
      hablarTexto(`¿Dónde está ${azar.nombre}?`);
    }, 300);
  };

  useEffect(() => {
    nuevoTurno();
  }, []);

  const handleSeleccion = (familiar) => {
    if (familiar.id === objetivo.id) {
      hablarTexto(`¡Muy bien! ¡Es ${familiar.nombre}!`);
      onSuccess();
      setTimeout(() => {
        nuevoTurno();
      }, 1500);
    } else {
      playSound('pop');
      hablarTexto(`Ese es ${familiar.nombre}`);
    }
  };

  return (
    <div className="p-6 text-center max-w-2xl mx-auto">
      <div className="bg-linear-to-r from-pink-500 to-rose-500 p-6 rounded-3xl shadow-2xl mb-6 border-4 border-white text-white">
        <h2 className="text-2xl sm:text-3xl font-black drop-shadow-md">
          ¿Dónde está <span className="text-yellow-300 underline">{objetivo.nombre}</span>? 👑
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {FAMILIARES.map((f) => (
          <button
            key={f.id}
            onClick={() => handleSeleccion(f)}
            className="bg-linear-to-b from-pink-100 to-rose-200 p-4 rounded-3xl shadow-xl border-4 border-white hover:border-pink-400 active:scale-95 transition flex flex-col items-center cursor-pointer"
          >
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-pink-400 mb-2 flex items-center justify-center bg-pink-200 shadow-md">
              <img 
                src={f.foto} 
                alt={f.nombre} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
                }}
              />
              <span className="text-5xl hidden">{f.emoji}</span>
            </div>
            <span className="text-lg font-black text-pink-900">{f.nombre}</span>
          </button>
        ))}
      </div>
    </div>
  );
}