import React, { useState } from 'react';

const SORPRESAS = [
  { titulo: "¡Hola María Paz!", emoji: "👑", color: "from-pink-500 to-rose-500", tipo: "voz", texto: "¡Hola hermosa!" },
  { titulo: "¡Guau Guau!", emoji: "🐶", color: "from-amber-500 to-orange-500", tipo: "audio", archivo: "perro" },
  { titulo: "¡Miau Miau!", emoji: "🐱", color: "from-purple-500 to-indigo-500", tipo: "audio", archivo: "gato" },
  { titulo: "¡Muuu!", emoji: "🐮", color: "from-blue-500 to-cyan-500", tipo: "audio", archivo: "vaca" },
  { titulo: "¡Oinc Oinc!", emoji: "🐷", color: "from-emerald-500 to-teal-500", tipo: "audio", archivo: "chancho" },
  { titulo: "¡Estrella Mágica!", emoji: "⭐", color: "from-yellow-400 to-amber-500", tipo: "voz", texto: "¡Brillan las estrellas para María Paz!" },
  { titulo: "¡Mucho Amor!", emoji: "💖", color: "from-rose-500 to-pink-600", tipo: "voz", texto: "¡Muchos besos!" },
  { titulo: "¡Fiesta!", emoji: "🎉", color: "from-fuchsia-500 to-purple-600", tipo: "fiesta", texto: "¡A festejar!" },
];

export default function JuegoBotonSorpresa({ playSound, onSuccess }) {
  const [actual, setActual] = useState(SORPRESAS[0]);

  // Voz natural, aguda y tierna (adiós robot)
  const hablarTexto = (texto) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(texto);
      
      const voces = window.speechSynthesis.getVoices();
      const vozEspañol = voces.find(v => 
        v.lang.includes('es') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Paulina'))
      ) || voces.find(v => v.lang.includes('es'));

      if (vozEspañol) utterance.voice = vozEspañol;

      utterance.lang = 'es-AR';
      utterance.rate = 1.0;  // Velocidad normal
      utterance.pitch = 1.3; // Tono más agudo, dulce e infantil
      window.speechSynthesis.speak(utterance);
    }
  };

  // Reproductor para tus archivos MP3 reales de la carpeta public/audios/
  const reproducirMp3 = (nombreArchivo) => {
    try {
      const audio = new Audio(`/sonidos/${nombreArchivo}.mp3`);
      audio.currentTime = 0;
      audio.play().catch(e => console.log("Error reproduciendo MP3:", e));
    } catch (err) {
      console.log("No se encontró el archivo MP3:", err);
    }
  };

  const tocarBoton = (item) => {
    setActual(item);
    playSound('pop');

    if (item.tipo === 'audio') {
      reproducirMp3(item.archivo);
    } else if (item.tipo === 'voz') {
      hablarTexto(item.texto);
    } else if (item.tipo === 'fiesta') {
      hablarTexto(item.texto);
      onSuccess();
    }
  };

  return (
    <div className="p-6 text-center max-w-2xl mx-auto flex flex-col items-center">
      {/* Banner Principal Interactivo */}
      <div className={`bg-linear-to-r ${actual.color} p-8 rounded-3xl shadow-2xl mb-8 border-4 border-white text-white w-full transition-all duration-300 transform scale-105`}>
        <span className="text-8xl block mb-2 animate-bounce">{actual.emoji}</span>
        <h2 className="text-3xl sm:text-4xl font-black drop-shadow-md">
          {actual.titulo}
        </h2>
      </div>

      <p className="text-lg font-bold text-white mb-6 drop-shadow-sm">
        ✨ ¡Toca cualquier botón para escuchar! ✨
      </p>

      {/* Cuadrícula de Botones Gigantes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full mb-6">
        {SORPRESAS.map((item, idx) => (
          <button
            key={idx}
            onClick={() => tocarBoton(item)}
            className={`bg-linear-to-br ${item.color} text-white p-6 rounded-3xl shadow-xl flex flex-col items-center justify-center h-36 border-4 border-white hover:scale-110 active:scale-95 transition cursor-pointer`}
          >
            <span className="text-5xl mb-1">{item.emoji}</span>
            <span className="text-sm font-black drop-shadow-sm">{item.titulo}</span>
          </button>
        ))}
      </div>
    </div>
  );
}