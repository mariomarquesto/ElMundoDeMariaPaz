import React, { useState, useEffect } from 'react';
import { FAMILIARES } from '../data/constants';

export default function JuegoFamiliaAdivina({ onSuccess, playSound }) {
  const [objetivo, setObjetivo] = useState(FAMILIARES[0]);

  const nuevoTurno = () => {
    const azar = FAMILIARES[Math.floor(Math.random() * FAMILIARES.length)];
    setObjetivo(azar);
  };

  useEffect(() => {
    nuevoTurno();
  }, []);

  const handleSeleccion = (familiar) => {
    if (familiar.id === objetivo.id) {
      onSuccess();
      nuevoTurno();
    } else {
      playSound('pop');
    }
  };

  return (
    <div className="p-6 text-center max-w-2xl mx-auto">
      <div className="bg-white p-6 rounded-3xl shadow-xl mb-6 border-4 border-pink-300">
        <h2 className="text-2xl font-black text-purple-700">
          ¿Dónde está <span className="text-pink-600 underline">{objetivo.nombre}</span>?
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {FAMILIARES.map((f) => (
          <button
            key={f.id}
            onClick={() => handleSeleccion(f)}
            className="bg-white p-4 rounded-3xl shadow-lg border-4 border-white hover:border-pink-400 active:scale-95 transition flex flex-col items-center cursor-pointer"
          >
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-pink-300 mb-2 flex items-center justify-center bg-pink-100">
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
            <span className="text-lg font-bold text-slate-700">{f.nombre}</span>
          </button>
        ))}
      </div>
    </div>
  );
}