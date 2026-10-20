import React, { useState } from 'react';
import { BookOpen, Sparkles } from 'lucide-react';
import { FAMILIA_FOTOS } from '../data/constants';

const ESCENAS = [
  {
    titulo: "El Mapa Mágico 🗺️",
    texto: "Francisco y María Paz encontraron un mapa brillante en el jardín. ¡Dice que hay un tesoro escondido!",
    icono: "🗺️"
  },
  {
    titulo: "El Bote Volador 🛶✨",
    texto: "Para cruzar el cielo de nubes de algodón, Francisco armó un barquito mágico con María Paz.",
    icono: "☁️"
  },
  {
    titulo: "El Bosque de Estrellas ⭐",
    texto: "Llegaron a un lugar lleno de estrellas musicales que brillaban al ritmo de la risa de María Paz.",
    icono: "🌟"
  },
  {
    titulo: "¡El Tesoro Encontrado! 👑",
    texto: "¡Encontraron un cofre lleno de abrazos y galletas de la Tía Ana! ¡Aventura completada con éxito!",
    icono: "🎁"
  }
];

export default function JuegoCuentosFrancisco({ playSound, onSuccess }) {
  const [pagina, setPagina] = useState(0);

  const siguientePagina = () => {
    playSound('pop');
    if (pagina < ESCENAS.length - 1) {
      setPagina(pagina + 1);
    } else {
      onSuccess();
      setPagina(0);
    }
  };

  const escenaActual = ESCENAS[pagina];

  return (
    <div className="p-6 max-w-xl mx-auto text-center flex flex-col items-center">
      <h2 className="text-2xl font-black text-indigo-800 mb-4 flex items-center gap-2">
        <BookOpen className="w-8 h-8" /> Aventuras de Francisco y María Paz
      </h2>

      <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border-4 border-indigo-300 w-full mb-6 min-h-[300px] flex flex-col items-center justify-center">
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-indigo-400 bg-indigo-100 shadow-lg mb-4 flex items-center justify-center">
          <img 
            src={FAMILIA_FOTOS.francisco} 
            alt="Francisco" 
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
        
        <span className="text-6xl mb-3 animate-bounce">{escenaActual.icono}</span>
        <h3 className="text-xl font-black text-purple-700 mb-2">{escenaActual.titulo}</h3>
        <p className="text-lg font-bold text-slate-700">{escenaActual.texto}</p>
      </div>

      <button
        onClick={siguientePagina}
        className="bg-indigo-500 text-white text-2xl font-black px-8 py-4 rounded-full shadow-xl hover:scale-110 active:scale-95 transition flex items-center gap-3 border-4 border-white cursor-pointer"
      >
        <Sparkles className="w-8 h-8" /> Siguiente Página ➡️
      </button>

      <p className="mt-4 text-sm font-bold text-slate-600">
        Página {pagina + 1} de {ESCENAS.length}
      </p>
    </div>
  );
}