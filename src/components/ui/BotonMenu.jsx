import React from 'react';

export default function BotonMenu({ titulo, subtitulo, emoji, gradient, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`bg-linear-to-br ${gradient} text-white p-6 rounded-3xl shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex flex-col items-center justify-center gap-2 border-4 border-white/90 relative overflow-hidden group min-h-[160px] cursor-pointer`}
    >
      <div className="absolute top-2 right-2 text-white/20 text-3xl group-hover:scale-125 transition">
        ✨
      </div>
      <span className="text-6xl drop-shadow-md group-hover:animate-bounce">
        {emoji}
      </span>
      <span className="text-2xl font-black text-center drop-shadow-md">
        {titulo}
      </span>
      {subtitulo && (
        <span className="text-sm font-bold bg-black/20 px-3 py-1 rounded-full text-white/90">
          {subtitulo}
        </span>
      )}
    </button>
  );
}