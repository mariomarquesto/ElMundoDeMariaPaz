import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { FAMILIA_FOTOS } from '../data/constants';

export default function JuegoCorazonesPapa({ playSound, onSuccess }) {
  const [corazones, setCorazones] = useState(0);

  const darAmor = () => {
    playSound('pop');
    const total = corazones + 1;
    setCorazones(total);
    if (total % 5 === 0) {
      onSuccess();
    }
  };

  return (
    <div className="p-6 text-center max-w-xl mx-auto flex flex-col items-center">
      <h2 className="text-2xl font-black text-pink-700 mb-4">
        💖 Corazones para Papá
      </h2>
      <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-blue-400 bg-blue-100 shadow-2xl mb-6">
        <img 
          src={FAMILIA_FOTOS.papa} 
          alt="Papá" 
          className="w-full h-full object-cover"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>

      <button
        onClick={darAmor}
        className="bg-pink-500 text-white text-3xl font-black px-8 py-4 rounded-full shadow-2xl hover:scale-110 active:scale-90 transition flex items-center gap-3 border-4 border-white cursor-pointer"
      >
        <Heart className="w-10 h-10 fill-current text-white animate-bounce" /> ¡Enviar Corazón!
      </button>

      <p className="mt-6 text-xl font-bold text-purple-700">
        Corazones enviados a Papá: {corazones} 💖
      </p>
    </div>
  );
}