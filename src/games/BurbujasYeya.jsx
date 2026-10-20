import React, { useState } from 'react';
import { FAMILIA_FOTOS } from '../data/constants';

export default function JuegoBurbujasYeya({ playSound, onSuccess }) {
  const [burbujas, setBurbujas] = useState([1, 2, 3, 4, 5]);

  const explotar = (id) => {
    playSound('pop');
    setBurbujas((prev) => {
      const remaining = prev.filter((b) => b !== id);
      if (remaining.length === 0) {
        onSuccess();
        setTimeout(() => setBurbujas([1, 2, 3, 4, 5]), 1500);
      }
      return remaining;
    });
  };

  return (
    <div className="p-6 text-center max-w-xl mx-auto">
      <h2 className="text-2xl font-black text-purple-800 mb-4">
        🫧 Burbujas Mágicas de la Yeya
      </h2>
      <div className="flex justify-center mb-6">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-400 bg-purple-100 shadow-xl">
          <img 
            src={FAMILIA_FOTOS.yeya} 
            alt="Yeya" 
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {burbujas.map((b) => (
          <button
            key={b}
            onClick={() => explotar(b)}
            className="w-24 h-24 rounded-full bg-cyan-300/60 border-4 border-white shadow-xl text-4xl flex items-center justify-center animate-pulse hover:scale-110 active:scale-75 transition cursor-pointer"
          >
            🫧
          </button>
        ))}
      </div>
    </div>
  );
}