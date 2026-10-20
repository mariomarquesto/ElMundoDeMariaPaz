import React from 'react';

export default function CelebracionModal({ celebrando }) {
  if (!celebrando) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 pointer-events-none p-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl text-center transform animate-bounce border-8 border-yellow-300">
        <span className="text-8xl">🎉</span>
        <h2 className="text-3xl sm:text-4xl font-black text-pink-600 mt-4">
          ¡MUY BIEN, MARÍA PAZ! ⭐
        </h2>
        <p className="text-xl text-purple-600 font-bold mt-2">
          ¡Eres una genia! 👏
        </p>
      </div>
    </div>
  );
}