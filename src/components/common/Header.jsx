import React from 'react';
import { Home, Sparkles, Smile } from 'lucide-react';

export default function Header({ juegoActual, setJuegoActual, playSoundEffect, lanzarFiesta }) {
  return (
    <header className="p-4 bg-linear-to-r from-pink-600 via-rose-500 to-fuchsia-600 backdrop-blur-md shadow-2xl flex justify-between items-center sticky top-0 z-40 border-b-4 border-white text-white">
      {juegoActual !== 'menu' ? (
        <button 
          onClick={() => { setJuegoActual('menu'); playSoundEffect('pop'); }}
          className="flex items-center gap-2 bg-linear-to-r from-purple-600 to-pink-500 text-white font-black text-lg px-5 py-2.5 rounded-full shadow-lg hover:scale-105 active:scale-95 transition border-2 border-white cursor-pointer"
        >
          <Home className="w-6 h-6" /> Menú
        </button>
      ) : (
        <div className="flex items-center gap-2 bg-pink-100/90 text-pink-900 px-4 py-2 rounded-full font-black text-sm shadow-md">
          <Smile className="w-5 h-5 text-pink-600" /> ¡Hola María Paz!
        </div>
      )}

      <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-wide text-center drop-shadow-md flex items-center gap-2">
        👑 <span className="hidden sm:inline">El Mundo de</span> María Paz ✨
      </h1>

      <button 
        onClick={lanzarFiesta}
        className="bg-yellow-400 text-yellow-950 p-2.5 rounded-full shadow-lg hover:scale-110 active:scale-90 transition border-2 border-white cursor-pointer"
        title="¡Fiesta de confeti!"
      >
        <Sparkles className="w-6 h-6 fill-current" />
      </button>
    </header>
  );
}