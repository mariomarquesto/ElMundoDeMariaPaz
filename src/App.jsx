import React, { useState } from 'react';
import confetti from 'canvas-confetti';

import { playSoundEffect } from './utils/soundEffects';

// Componentes comunes y UI
import Header from './components/common/Header';
import CelebracionModal from './components/common/CelebrationModal';
import BotonMenu from './components/ui/BotonMenu';

// Juegos
import JuegoDescubreFamilia from './games/DescubreFamilia';
import JuegoCorazonesMama from './games/CorazonesMama';
import JuegoCorazonesPapa from './games/CorazonesPapa';
import JuegoCuentosFrancisco from './games/CuentosFrancisco';
import JuegoFamiliaAdivina from './games/AdivinaFamilia';
import JuegoHormigasTiaAna from './games/HormigasTiaAna';
import JuegoCoheteFrancisco from './games/CoheteFrancisco';
import JuegoBurbujasYeya from './games/BurbujasYeya';
import JuegoAnimales from './games/Animales';
import JuegoBotonSorpresa from './games/BotonSorpresa';

export default function App() {
  const [juegoActual, setJuegoActual] = useState('menu');
  const [celebrando, setCelebrando] = useState(false);

  const lanzarFiesta = () => {
    setCelebrando(true);
    playSoundEffect('win');
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        disableForReducedMotion: true
      });
    } catch (err) {
      console.log('Confeti error:', err);
    }
    setTimeout(() => setCelebrando(false), 2500);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-pink-400 via-fuchsia-300 to-purple-400 text-slate-800 font-sans select-none overflow-x-hidden pb-16">
      <Header 
        juegoActual={juegoActual} 
        setJuegoActual={setJuegoActual} 
        playSoundEffect={playSoundEffect} 
        lanzarFiesta={lanzarFiesta} 
      />

      {juegoActual === 'menu' && (
        <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-10">
          
          {/* Banner de Bienvenida en Rosa Fucsia Mágico */}
          <div className="bg-linear-to-r from-pink-500 via-rose-500 to-fuchsia-600 p-6 rounded-3xl shadow-2xl text-center border-4 border-white relative overflow-hidden text-white">
            <div className="absolute -top-6 -left-6 text-6xl opacity-20">🎨</div>
            <div className="absolute -bottom-6 -right-6 text-6xl opacity-20">🚀</div>
            <h2 className="text-2xl sm:text-3xl font-black mb-1 drop-shadow-md">
              ¡Hola María Paz! 👋🎉
            </h2>
            <p className="text-lg font-bold text-pink-100 drop-shadow-sm">
              ¿Qué quieres jugar hoy? ¡Toca cualquier tarjeta! 👇
            </p>
          </div>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">👨‍👩‍👧</span>
              <h3 className="text-xl sm:text-2xl font-black text-purple-950 drop-shadow-xs">Juegos de la Familia</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <BotonMenu titulo="Descubre a la Familia" subtitulo="¡Raspa la pintura!" emoji="🎨🖼️" gradient="from-purple-500 to-indigo-600" onClick={() => { setJuegoActual('descubre-familia'); playSoundEffect('pop'); }} />
              <BotonMenu titulo="¿Quién es en la Familia?" subtitulo="Encuentra a cada uno" emoji="👨‍👩‍👧" gradient="from-pink-500 to-rose-600" onClick={() => { setJuegoActual('familia-adivina'); playSoundEffect('pop'); }} />
              <BotonMenu titulo="Corazones para Mamá" subtitulo="¡Mucho amor!" emoji="💖👩" gradient="from-rose-500 to-pink-600" onClick={() => { setJuegoActual('corazones-mama'); playSoundEffect('pop'); }} />
              <BotonMenu titulo="Corazones para Papá" subtitulo="Abrazos para Papá Mario" emoji="💖👨" gradient="from-red-500 to-rose-600" onClick={() => { setJuegoActual('corazones-papa'); playSoundEffect('pop'); }} />
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🚀</span>
              <h3 className="text-xl sm:text-2xl font-black text-purple-950 drop-shadow-xs">Aventuras con Francisco</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <BotonMenu titulo="Cuentos de Aventuras" subtitulo="Historias de hermanos" emoji="📖✨" gradient="from-indigo-500 to-purple-600" onClick={() => { setJuegoActual('cuentos-francisco'); playSoundEffect('pop'); }} />
              <BotonMenu titulo="El Cohete de Francisco" subtitulo="¡A volar a las estrellas!" emoji="🚀⭐" gradient="from-blue-500 to-indigo-600" onClick={() => { setJuegoActual('cohete-francisco'); playSoundEffect('pop'); }} />
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🐾</span>
              <h3 className="text-xl sm:text-2xl font-black text-purple-950 drop-shadow-xs">Juegos Divertidos</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <BotonMenu titulo="Botón Sorpresa" subtitulo="¡Toca y escucha!" emoji="🎁✨" gradient="from-amber-400 to-pink-500" onClick={() => { setJuegoActual('boton-sorpresa'); playSoundEffect('pop'); }} />
              <BotonMenu titulo="Sonidos de Animales" subtitulo="Audios reales" emoji="🐶🐱" gradient="from-emerald-500 to-teal-600" onClick={() => { setJuegoActual('animales'); playSoundEffect('pop'); }} />
              <BotonMenu titulo="Burbujas de la Yeya" subtitulo="¡Revienta las burbujas!" emoji="🫧✨" gradient="from-fuchsia-500 to-purple-600" onClick={() => { setJuegoActual('burbujas-yeya'); playSoundEffect('pop'); }} />
              <BotonMenu titulo="Hormigas de la Tía Ana" subtitulo="¡Atrapa las hormigas!" emoji="🐜🍪" gradient="from-amber-500 to-orange-600" onClick={() => { setJuegoActual('hormigas-tia-ana'); playSoundEffect('pop'); }} />
            </div>
          </section>
        </div>
      )}

      {juegoActual === 'descubre-familia' && <JuegoDescubreFamilia playSound={playSoundEffect} onSuccess={lanzarFiesta} />}
      {juegoActual === 'corazones-mama' && <JuegoCorazonesMama playSound={playSoundEffect} onSuccess={lanzarFiesta} />}
      {juegoActual === 'corazones-papa' && <JuegoCorazonesPapa playSound={playSoundEffect} onSuccess={lanzarFiesta} />}
      {juegoActual === 'cuentos-francisco' && <JuegoCuentosFrancisco playSound={playSoundEffect} onSuccess={lanzarFiesta} />}
      {juegoActual === 'familia-adivina' && <JuegoFamiliaAdivina onSuccess={lanzarFiesta} playSound={playSoundEffect} />}
      {juegoActual === 'hormigas-tia-ana' && <JuegoHormigasTiaAna playSound={playSoundEffect} onSuccess={lanzarFiesta} />}
      {juegoActual === 'cohete-francisco' && <JuegoCoheteFrancisco playSound={playSoundEffect} onSuccess={lanzarFiesta} />}
      {juegoActual === 'burbujas-yeya' && <JuegoBurbujasYeya playSound={playSoundEffect} onSuccess={lanzarFiesta} />}
      {juegoActual === 'animales' && <JuegoAnimales playSound={playSoundEffect} onSuccess={lanzarFiesta} />}
      {juegoActual === 'boton-sorpresa' && <JuegoBotonSorpresa playSound={playSoundEffect} onSuccess={lanzarFiesta} />}

      <CelebracionModal celebrando={celebrando} />
    </div>
  );
}