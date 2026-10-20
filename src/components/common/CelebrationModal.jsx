import React from 'react';

export default function CelebracionModal({ celebrando }) {
  if (!celebrando) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 pointer-events-none p-4">
      <div className="bg-linear-to-br from-pink-500 via-rose-500 to-purple-600 p-8 rounded-3xl shadow-2xl text-center transform animate-bounce border-8 border-white">
        <span className="text-8xl">🎉</span>
        <h2 className="text-3xl sm:text-4xl font-black text-white mt-4 drop-shadow-md">
          ¡MUY BIEN, MARÍA PAZ! ⭐
        </h2>
        <p className="text-xl text-pink-100 font-bold mt-2 drop-shadow-sm">
          ¡Eres una genia! 👏
        </p>
      </div>
    </div>
  );
}