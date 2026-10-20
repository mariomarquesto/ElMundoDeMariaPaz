import React, { useState, useEffect } from 'react';
import { FAMILIARES } from '../data/constants';
import { Sparkles, Puzzle } from 'lucide-react';

export default function JuegoRompecabezasFamilia({ playSound, onSuccess }) {
  const [familiarActual, setFamiliarActual] = useState(FAMILIARES[0]);
  const [piezas, setPiezas] = useState([]);
  const [piezasColocadas, setPiezasColocadas] = useState([]);
  const [modo4Piezas, setModo4Piezas] = useState(false); // false = 2 piezas, true = 4 piezas
  const [completado, setCompletado] = useState(false);

  // Voz natural y tierna
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
      utterance.rate = 1.0;
      utterance.pitch = 1.3;
      window.speechSynthesis.speak(utterance);
    }
  };

  const iniciarJuego = (esDe4 = modo4Piezas) => {
    const familiarRandom = FAMILIARES[Math.floor(Math.random() * FAMILIARES.length)];
    setFamiliarActual(familiarRandom);
    setCompletado(false);
    setPiezasColocadas([]);

    const cantidad = esDe4 ? 4 : 2;
    // Crear array de índices ordenados y desordenarlos para que aparezcan mezclados
    const indices = Array.from({ length: cantidad }, (_, i) => i);
    const mezcladas = [...indices].sort(() => Math.random() - 0.5);
    
    setPiezas(mezcladas);
    hablarTexto(`¡Armemos a ${familiarRandom.nombre}!`);
  };

  useEffect(() => {
    iniciarJuego(modo4Piezas);
  }, [modo4Piezas]);

  const handleTocarPieza = (indexPieza) => {
    if (completado) return;
    
    const siguienteEsperado = piezasColocadas.length;
    
    if (indexPieza === siguienteEsperado) {
      // ¡Acertó la pieza correcta!
      playSound('pop');
      const nuevasColocadas = [...piezasColocadas, indexPieza];
      setPiezasColocadas(nuevasColocadas);

      // Verificar si completó el rompecabezas
      const totalPiezas = modo4Piezas ? 4 : 2;
      if (nuevasColocadas.length === totalPiezas) {
        setCompletado(true);
        hablarTexto(`¡Muy bien! ¡Armaste a ${familiarActual.nombre}!`);
        onSuccess();
        
        // Pasar al siguiente familiar después de unos segundos
        setTimeout(() => {
          iniciarJuego(modo4Piezas);
        }, 3500);
      }
    } else {
      // Toco otra pieza que no era la que tocaba
      playSound('pop');
      hablarTexto("¡Prueba con otra pieza!");
    }
  };

  return (
    <div className="p-6 text-center max-w-xl mx-auto flex flex-col items-center">
      {/* Encabezado */}
      <div className="bg-linear-to-r from-pink-500 to-purple-600 p-5 rounded-3xl shadow-2xl mb-6 border-4 border-white text-white w-full">
        <h2 className="text-2xl sm:text-3xl font-black drop-shadow-md flex items-center justify-center gap-2">
          <Puzzle className="w-8 h-8" /> Rompecabezas de {familiarActual.nombre}
        </h2>
        <p className="text-pink-100 font-bold mt-1">
          {completado ? `🎉 ¡Excelente, es ${familiarActual.nombre}! 🎉` : '¡Toca las piezas para armar la foto!'}
        </p>
      </div>

      {/* Selector de Dificultad (2 o 4 piezas) */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setModo4Piezas(false)}
          className={`px-5 py-2.5 rounded-full font-black text-sm border-2 border-white transition cursor-pointer shadow-md ${
            !modo4Piezas ? 'bg-yellow-400 text-yellow-950 scale-105' : 'bg-pink-700/60 text-white'
          }`}
        >
          🧩 2 Partes (Fácil)
        </button>
        <button
          onClick={() => setModo4Piezas(true)}
          className={`px-5 py-2.5 rounded-full font-black text-sm border-2 border-white transition cursor-pointer shadow-md ${
            modo4Piezas ? 'bg-yellow-400 text-yellow-950 scale-105' : 'bg-pink-700/60 text-white'
          }`}
        >
          🧩 4 Partes (Reto)
        </button>
      </div>

      {/* Tablero del Rompecabezas (Huecos / Foto armada) */}
      <div className={`grid ${modo4Piezas ? 'grid-cols-2 w-72 h-72' : 'grid-cols-1 w-64 h-80'} gap-2 bg-pink-200/80 p-4 rounded-3xl shadow-2xl border-4 border-white mb-8 mx-auto relative overflow-hidden`}>
        {Array.from({ length: modo4Piezas ? 4 : 2 }).map((_, i) => {
          const estaColocada = piezasColocadas.includes(i);
          return (
            <div 
              key={i} 
              className={`rounded-2xl border-4 flex items-center justify-center relative overflow-hidden transition-all duration-300 ${
                estaColocada ? 'border-green-400 shadow-inner' : 'border-dashed border-pink-400 bg-pink-100/50'
              }`}
            >
              {estaColocada ? (
                <div 
                  className="absolute inset-0 bg-cover bg-no-repeat"
                  style={{
                    backgroundImage: `url(${familiarActual.foto})`,
                    backgroundSize: modo4Piezas ? '200% 200%' : '100% 200%',
                    backgroundPosition: 
                      i === 0 ? 'top left' :
                      i === 1 ? (modo4Piezas ? 'top right' : 'bottom center') :
                      i === 2 ? 'bottom left' : 'bottom right'
                  }}
                />
              ) : (
                <span className="text-3xl font-black text-pink-400/70">{i + 1}</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Piezas Mezcladas para Tocar */}
      {!completado && (
        <div className="w-full">
          <p className="text-white font-bold mb-3 drop-shadow-sm">Toca la pieza correcta:</p>
          <div className="flex flex-wrap justify-center gap-4">
            {piezas.map((indiceReal) => {
              const yaEstaPuesta = piezasColocadas.includes(indiceReal);
              if (yaEstaPuesta) return null; // Si ya se colocó, desaparece de abajo

              return (
                <button
                  key={indiceReal}
                  onClick={() => handleTocarPieza(indiceReal)}
                  className="w-28 h-28 rounded-2xl overflow-hidden border-4 border-white shadow-2xl hover:scale-110 active:scale-95 transition cursor-pointer relative bg-pink-300 flex items-center justify-center"
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-no-repeat"
                    style={{
                      backgroundImage: `url(${familiarActual.foto})`,
                      backgroundSize: modo4Piezas ? '200% 200%' : '100% 200%',
                      backgroundPosition: 
                        indiceReal === 0 ? 'top left' :
                        indiceReal === 1 ? (modo4Piezas ? 'top right' : 'bottom center') :
                        indiceReal === 2 ? 'bottom left' : 'bottom right'
                    }}
                  />
                  <span className="absolute bottom-1 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                    Pieza {indiceReal + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}