import React, { useState } from 'react';
import { FAMILIA_FOTOS } from '../data/constants';

export default function JuegoCoheteFrancisco({ playSound, onSuccess }) {
  const [estrellas, setEstrellas] = useState(0);

  const tocarEstrella = () => {
    playSound('pop');
    const total = estrellas + 1;
    setEstrellas(total);
    if (total % 5 === 0) {
      onSuccess();
    }
  };

  return (
    <div className="p-6 text-center max-w-xl mx-auto flex flex-col items-center">
      <h2 className="text-2xl font-black text-purple-800 mb-4">
        🚀 El Cohete de Francisco
      </h2>
      <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-blue-400 bg-blue-100 shadow-2xl mb-6">
        <img 
          src={FAMILIA_FOTOS.francisco} 
          alt="Francisco" 
          className="w-full h-full object-cover"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>

      <p className="text-lg font-bold text-slate-700 mb-6">
        Toca las estrellas para ayudar a Francisco a despegar ⭐
      </p>

      <div className="flex gap-4">
        {[1, 2, 3].map((idx) => (
          <button
            key={idx}
            onClick={tocarEstrella}
            className="text-7xl animate-bounce hover:scale-125 transition active:scale-90 cursor-pointer"
          >
            ⭐
          </button>
        ))}
      </div>
    </div>
  );
}