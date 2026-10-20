import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { ANIMALES } from '../data/constants';

export default function JuegoAnimales({ playSound, onSuccess }) {
  const [animalObjetivo, setAnimalObjetivo] = useState(ANIMALES[0]);

  const reproducirAnimal = (animal) => {
    playSound('animal', animal.audioUrl);
  };

  const seleccionar = (animal) => {
    reproducirAnimal(animal);
    if (animal.id === animalObjetivo.id) {
      setTimeout(() => {
        onSuccess();
        const nuevo = ANIMALES[Math.floor(Math.random() * ANIMALES.length)];
        setAnimalObjetivo(nuevo);
      }, 700);
    }
  };

  return (
    <div className="p-6 text-center max-w-2xl mx-auto">
      <div className="bg-white p-4 rounded-3xl shadow-xl mb-6 flex items-center justify-center gap-4 border-4 border-emerald-300">
        <button 
          onClick={() => reproducirAnimal(animalObjetivo)}
          className="bg-yellow-400 text-white p-4 rounded-full shadow-lg hover:scale-110 active:scale-90 transition animate-bounce border-2 border-white cursor-pointer"
        >
          <Volume2 className="w-10 h-10" />
        </button>
        <span className="text-2xl font-black text-slate-700">
          ¿Dónde está el <span className="text-emerald-600 underline">{animalObjetivo.nombre}</span>?
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {ANIMALES.map((a) => (
          <button
            key={a.id}
            onClick={() => seleccionar(a)}
            className={`${a.color} p-6 rounded-3xl text-white shadow-xl flex flex-col items-center hover:scale-105 active:scale-95 transition border-4 border-white cursor-pointer`}
          >
            <span className="text-7xl mb-2">{a.emoji}</span>
            <span className="text-xl font-black">{a.nombre}</span>
          </button>
        ))}
      </div>
    </div>
  );
}