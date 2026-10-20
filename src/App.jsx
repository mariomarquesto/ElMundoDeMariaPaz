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
    <div className="min-h-screen bg-linear-to-b from-sky-300 via-purple-200 to-pink-300 text-slate-800 font-sans select-none overflow-x-hidden pb-16">
      <Header 
        juegoActual={juegoActual} 
        setJuegoActual={setJuegoActual} 
        playSoundEffect={playSoundEffect} 
        lanzarFiesta={lanzarFiesta} 
      />

      {juegoActual === 'menu' && (
        <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-10">
          <div className="bg-white/80 backdrop-blur-xs p-6 rounded-3xl shadow-xl text-center border-4 border-purple-300 relative overflow-hidden">
            <h2 className="text-2xl sm:text-3xl font-black text-purple-900 mb-1">
              ¡Hola María Paz! 👋🎉
            </h2>
            <p className="text-lg font-bold text-slate-600">
              ¿Qué quieres jugar hoy? ¡Toca cualquier tarjeta! 👇
            </p>
          </div>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">👨‍👩‍👧</span>
              <h3 className="text-xl sm:text-2xl font-black text-purple-900">Juegos de la Familia</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <BotonMenu titulo="Descubre a la Familia" subtitulo="¡Raspa la pintura!" emoji="🎨🖼️" gradient="from-purple-500 to-indigo-600" onClick={() => { setJuegoActual('descubre-familia'); playSoundEffect('pop'); }} />
              <BotonMenu titulo="¿Quién es en la Familia?" subtitulo="Encuentra a cada uno" emoji="👨‍👩‍👧" gradient="from-pink-400 to-rose-500" onClick={() => { setJuegoActual('familia-adivina'); playSoundEffect('pop'); }} />
              <BotonMenu titulo="Corazones para Mamá" subtitulo="¡Mucho amor!" emoji="💖👩" gradient="from-rose-400 to-pink-600" onClick={() => { setJuegoActual('corazones-mama'); playSoundEffect('pop'); }} />
              <BotonMenu titulo="Corazones para Papá" subtitulo="Abrazos para Papá Mario" emoji="💖👨" gradient="from-red-400 to-rose-600" onClick={() => { setJuegoActual('corazones-papa'); playSoundEffect('pop'); }} />
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🚀</span>
              <h3 className="text-xl sm:text-2xl font-black text-indigo-900">Aventuras con Francisco</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <BotonMenu titulo="Cuentos de Aventuras" subtitulo="Historias de hermanos" emoji="📖✨" gradient="from-indigo-500 to-blue-600" onClick={() => { setJuegoActual('cuentos-francisco'); playSoundEffect('pop'); }} />
              <BotonMenu titulo="El Cohete de Francisco" subtitulo="¡A volar a las estrellas!" emoji="🚀⭐" gradient="from-blue-500 to-cyan-600" onClick={() => { setJuegoActual('cohete-francisco'); playSoundEffect('pop'); }} />
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🐾</span>
              <h3 className="text-xl sm:text-2xl font-black text-emerald-900">Juegos Divertidos</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <BotonMenu titulo="Sonidos de Animales" subtitulo="Audios reales" emoji="🐶🐱" gradient="from-emerald-400 to-teal-600" onClick={() => { setJuegoActual('animales'); playSoundEffect('pop'); }} />
              <BotonMenu titulo="Burbujas de la Yeya" subtitulo="¡Revienta las burbujas!" emoji="🫧✨" gradient="from-purple-400 to-fuchsia-600" onClick={() => { setJuegoActual('burbujas-yeya'); playSoundEffect('pop'); }} />
              <BotonMenu titulo="Hormigas de la Tía Ana" subtitulo="¡Atrapa las hormigas!" emoji="🐜🍪" gradient="from-amber-400 to-orange-500" onClick={() => { setJuegoActual('hormigas-tia-ana'); playSoundEffect('pop'); }} />
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

      <CelebracionModal celebrando={celebrando} />
    </div>
  );
}