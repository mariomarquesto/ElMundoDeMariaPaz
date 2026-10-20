import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, Heart, Home, Sparkles } from 'lucide-react';

// ==========================================
// CONFIGURACIÓN DE FOTOS DE LA FAMILIA
// Guárdalas en public/fotos/ en tu proyecto
// ==========================================
const FAMILIA_FOTOS = {
  mama: '/fotos/mama.jpg',
  papa: '/fotos/papa.jpg',           // Foto tuya (Mario)
  francisco: '/fotos/francisco.jpg', // Foto de su hermano Francisco
  yeya: '/fotos/yeya.jpg',
  tiaAna: '/fotos/tia_ana.jpg',
  tiaPato: '/fotos/tia_pato.jpg',
};

const FAMILIARES = [
  { id: 'mama', nombre: 'Mamá', foto: FAMILIA_FOTOS.mama, emoji: '👩' },
  { id: 'papa', nombre: 'Papá Mario', foto: FAMILIA_FOTOS.papa, emoji: '👨' },
  { id: 'francisco', nombre: 'Hermano Francisco', foto: FAMILIA_FOTOS.francisco, emoji: '👦' },
  { id: 'yeya', nombre: 'Yeya', foto: FAMILIA_FOTOS.yeya, emoji: '👵' },
  { id: 'tiaAna', nombre: 'Tía Ana', foto: FAMILIA_FOTOS.tiaAna, emoji: '👩‍🦱' },
  { id: 'tiaPato', nombre: 'Tía Pato', foto: FAMILIA_FOTOS.tiaPato, emoji: '👩‍🦰' },
];

const ANIMALES = [
  { id: 'perro', nombre: 'Perro', emoji: '🐶', audio: 'https://actions.google.com/sounds/v1/animals/dog_bark.ogg', color: 'bg-amber-400' },
  { id: 'gato', nombre: 'Gato', emoji: '🐱', audio: 'https://actions.google.com/sounds/v1/animals/cat_meow.ogg', color: 'bg-orange-400' },
  { id: 'vaca', nombre: 'Vaca', emoji: '🐮', audio: 'https://actions.google.com/sounds/v1/animals/cow_moo.ogg', color: 'bg-emerald-400' },
  { id: 'caballo', nombre: 'Caballo', emoji: '🐴', audio: 'https://actions.google.com/sounds/v1/animals/horse_neigh.ogg', color: 'bg-yellow-500' },
  { id: 'oveja', nombre: 'Oveja', emoji: '🐑', audio: 'https://actions.google.com/sounds/v1/animals/sheep_bleat.ogg', color: 'bg-teal-400' },
  { id: 'pato', nombre: 'Pato', emoji: '🦆', audio: 'https://actions.google.com/sounds/v1/animals/duck_quack.ogg', color: 'bg-sky-400' },
];

export default function App() {
  const [juegoActual, setJuegoActual] = useState('menu');
  const [celebrando, setCelebrando] = useState(false);

  const playSoundEffect = (type) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'pop') {
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === 'win') {
        const notes = [261.63, 329.63, 392.00, 523.25];
        notes.forEach((freq, idx) => {
          const noteOsc = ctx.createOscillator();
          const noteGain = ctx.createGain();
          noteOsc.connect(noteGain);
          noteGain.connect(ctx.destination);
          noteOsc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
          noteGain.gain.setValueAtTime(0.3, ctx.currentTime + idx * 0.1);
          noteGain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + (idx + 1) * 0.1);
          noteOsc.start(ctx.currentTime + idx * 0.1);
          noteOsc.stop(ctx.currentTime + (idx + 1) * 0.1);
        });
      }
    } catch (e) {
      console.log('Audio Context error', e);
    }
  };

  const lanzarFiesta = () => {
    setCelebrando(true);
    playSoundEffect('win');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => setCelebrando(false), 2500);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-sky-300 via-purple-200 to-pink-300 text-slate-800 font-sans select-none overflow-hidden pb-12">
      {/* Encabezado Principal */}
      <header className="p-4 bg-white/80 backdrop-blur-md shadow-md flex justify-between items-center">
        <button 
          onClick={() => setJuegoActual('menu')}
          className="flex items-center gap-2 bg-pink-500 text-white font-bold px-4 py-2 rounded-full shadow-lg hover:bg-pink-600 transition"
        >
          <Home className="w-6 h-6" /> Menú
        </button>
        <h1 className="text-xl md:text-2xl font-black text-purple-700 tracking-wide text-center">
          💖 El Mundo de María Paz 👑
        </h1>
        <div className="w-10"></div>
      </header>

      {/* Menú Principal */}
      {juegoActual === 'menu' && (
        <div className="p-6 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-purple-800 mb-6">
            ¡Elige un juego para jugar, María Paz! 🎉
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <BotonMenu 
              titulo="¿Quién es en la Familia?" 
              emoji="👨‍👩‍👧" 
              color="bg-pink-400"
              onClick={() => setJuegoActual('familia-adivina')}
            />
            <BotonMenu 
              titulo="Hormigas de la Tía Ana" 
              emoji="🐜" 
              color="bg-amber-400"
              onClick={() => setJuegoActual('hormigas-tia-ana')}
            />
            <BotonMenu 
              titulo="El Cohete de Francisco" 
              emoji="🚀" 
              color="bg-blue-400"
              onClick={() => setJuegoActual('cohete-francisco')}
            />
            <BotonMenu 
              titulo="Burbujas de la Yeya" 
              emoji="🫧" 
              color="bg-purple-400"
              onClick={() => setJuegoActual('burbujas-yeya')}
            />
            <BotonMenu 
              titulo="Sonidos de Animales" 
              emoji="🐶" 
              color="bg-emerald-400"
              onClick={() => setJuegoActual('animales')}
            />
            <BotonMenu 
              titulo="Corazones para Papá Mario" 
              emoji="💖" 
              color="bg-red-400"
              onClick={() => setJuegoActual('corazones-papa')}
            />
          </div>
        </div>
      )}

      {/* Pantallas de Juegos */}
      {juegoActual === 'familia-adivina' && <JuegoFamiliaAdivina onSuccess={lanzarFiesta} playSound={playSoundEffect} />}
      {juegoActual === 'hormigas-tia-ana' && <JuegoHormigasTiaAna playSound={playSoundEffect} onSuccess={lanzarFiesta} />}
      {juegoActual === 'cohete-francisco' && <JuegoCoheteFrancisco playSound={playSoundEffect} onSuccess={lanzarFiesta} />}
      {juegoActual === 'burbujas-yeya' && <JuegoBurbujasYeya playSound={playSoundEffect} onSuccess={lanzarFiesta} />}
      {juegoActual === 'animales' && <JuegoAnimales playSound={playSoundEffect} onSuccess={lanzarFiesta} />}
      {juegoActual === 'corazones-papa' && <JuegoCorazonesPapa playSound={playSoundEffect} onSuccess={lanzarFiesta} />}

      {/* Cartel de Celebración */}
      {celebrando && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-white p-8 rounded-3xl shadow-2xl text-center transform animate-bounce">
            <span className="text-8xl">🎉</span>
            <h2 className="text-4xl font-black text-pink-600 mt-4">¡MUY BIEN, MARÍA PAZ! ⭐</h2>
            <p className="text-xl text-purple-600 font-bold mt-2">¡Eres una genia! 👏</p>
          </div>
        </div>
      )}
    </div>
  );
}

function BotonMenu({ titulo, emoji, color, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`${color} text-white p-6 rounded-3xl shadow-xl hover:scale-105 active:scale-95 transition flex flex-col items-center justify-center gap-3 border-4 border-white`}
    >
      <span className="text-6xl">{emoji}</span>
      <span className="text-xl font-black text-center drop-shadow">{titulo}</span>
    </button>
  );
}

// 1. ¿Quién es en la Familia?
function JuegoFamiliaAdivina({ onSuccess, playSound }) {
  const [objetivo, setObjetivo] = useState(FAMILIARES[0]);

  const nuevoTurno = () => {
    const azar = FAMILIARES[Math.floor(Math.random() * FAMILIARES.length)];
    setObjetivo(azar);
  };

  useEffect(() => {
    nuevoTurno();
  }, []);

  const handleSeleccion = (familiar) => {
    if (familiar.id === objetivo.id) {
      onSuccess();
      nuevoTurno();
    } else {
      playSound('pop');
    }
  };

  return (
    <div className="p-6 text-center max-w-2xl mx-auto">
      <div className="bg-white p-6 rounded-3xl shadow-xl mb-6 border-4 border-pink-300">
        <h2 className="text-2xl font-black text-purple-700">
          ¿Dónde está <span className="text-pink-600 underline">{objetivo.nombre}</span>?
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {FAMILIARES.map((f) => (
          <button
            key={f.id}
            onClick={() => handleSeleccion(f)}
            className="bg-white p-4 rounded-3xl shadow-lg border-4 border-white hover:border-pink-400 transition flex flex-col items-center"
          >
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-pink-300 mb-2 flex items-center justify-center bg-pink-100">
              <img 
                src={f.foto} 
                alt={f.nombre} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <span className="text-5xl hidden">{f.emoji}</span>
            </div>
            <span className="text-lg font-bold text-slate-700">{f.nombre}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// 2. Las Hormigas de la Tía Ana
function JuegoHormigasTiaAna({ playSound, onSuccess }) {
  const [hormigas, setHormigas] = useState([]);
  const [puntos, setPuntos] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (hormigas.length < 6) {
        setHormigas((prev) => [
          ...prev,
          {
            id: Date.now(),
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10,
          },
        ]);
      }
    }, 1200);
    return () => clearInterval(interval);
  }, [hormigas]);

  const aplastarHormiga = (id) => {
    playSound('pop');
    setHormigas((prev) => prev.filter((h) => h.id !== id));
    const nuevosPuntos = puntos + 1;
    setPuntos(nuevosPuntos);
    if (nuevosPuntos % 5 === 0) {
      onSuccess();
    }
  };

  return (
    <div className="relative h-[75vh] w-full overflow-hidden p-4">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="w-40 h-40 rounded-full bg-amber-200 border-8 border-amber-400 shadow-2xl flex flex-col items-center justify-center overflow-hidden relative">
          <img 
            src={FAMILIA_FOTOS.tiaAna} 
            alt="Tía Ana" 
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <span className="absolute bottom-2 bg-amber-500 text-white font-bold px-3 py-1 rounded-full text-xs">
            Tía Ana 🍪
          </span>
        </div>
      </div>

      {hormigas.map((h) => (
        <button
          key={h.id}
          onClick={() => aplastarHormiga(h.id)}
          style={{ top: `${h.y}%`, left: `${h.x}%` }}
          className="absolute text-5xl hover:scale-125 transition transform active:scale-50 animate-pulse"
        >
          🐜
        </button>
      ))}

      <div className="absolute top-4 left-4 bg-white/90 font-black text-xl px-4 py-2 rounded-full shadow-lg">
        🐜 Atrapadas: {puntos}
      </div>
    </div>
  );
}

// 3. Cohete de Francisco
function JuegoCoheteFrancisco({ playSound, onSuccess }) {
  const [estrellas, setEstrellas] = useState(0);

  const tocarEstrella = () => {
    playSound('pop');
    const total = estrellas + 1;
    setEstrellas(total);
    if (total % 5 === 0) {
      onSuccess();
    }
  };

  return (
    <div className="p-6 text-center max-w-xl mx-auto flex flex-col items-center">
      <h2 className="text-2xl font-black text-purple-800 mb-4">
        🚀 El Cohete de su Hermano Francisco
      </h2>
      <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-blue-400 bg-blue-100 shadow-2xl mb-6">
        <img 
          src={FAMILIA_FOTOS.francisco} 
          alt="Francisco" 
          className="w-full h-full object-cover"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>

      <p className="text-lg font-bold text-slate-700 mb-6">
        Toca las estrellas para ayudar a Francisco a despejar ⭐
      </p>

      <div className="flex gap-4">
        {[1, 2, 3].map((idx) => (
          <button
            key={idx}
            onClick={tocarEstrella}
            className="text-7xl animate-bounce hover:scale-125 transition"
          >
            ⭐
          </button>
        ))}
      </div>
    </div>
  );
}

// 4. Burbujas de la Yeya
function JuegoBurbujasYeya({ playSound, onSuccess }) {
  const [burbujas, setBurbujas] = useState([1, 2, 3, 4, 5]);

  const explotar = (id) => {
    playSound('pop');
    setBurbujas((prev) => prev.filter((b) => b !== id));
    if (burbujas.length <= 1) {
      onSuccess();
      setTimeout(() => setBurbujas([1, 2, 3, 4, 5]), 1500);
    }
  };

  return (
    <div className="p-6 text-center max-w-xl mx-auto">
      <h2 className="text-2xl font-black text-purple-800 mb-4">
        🫧 Burbujas Mágicas de la Yeya
      </h2>
      <div className="flex justify-center mb-6">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-400 bg-purple-100 shadow-xl">
          <img 
            src={FAMILIA_FOTOS.yeya} 
            alt="Yeya" 
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {burbujas.map((b) => (
          <button
            key={b}
            onClick={() => explotar(b)}
            className="w-24 h-24 rounded-full bg-cyan-300/60 border-4 border-white shadow-xl text-4xl flex items-center justify-center animate-pulse hover:scale-110 transition"
          >
            🫧
          </button>
        ))}
      </div>
    </div>
  );
}

// 5. Animales
function JuegoAnimales({ playSound, onSuccess }) {
  const [animalObjetivo, setAnimalObjetivo] = useState(ANIMALES[0]);

  const sonar = (animal) => {
    const audio = new Audio(animal.audio);
    audio.play().catch(() => {});
  };

  const seleccionar = (animal) => {
    if (animal.id === animalObjetivo.id) {
      onSuccess();
      const nuevo = ANIMALES[Math.floor(Math.random() * ANIMALES.length)];
      setAnimalObjetivo(nuevo);
    } else {
      playSound('pop');
    }
  };

  return (
    <div className="p-6 text-center max-w-2xl mx-auto">
      <div className="bg-white p-4 rounded-3xl shadow-xl mb-6 flex items-center justify-center gap-4">
        <button 
          onClick={() => sonar(animalObjetivo)}
          className="bg-yellow-400 text-white p-4 rounded-full shadow-lg hover:scale-110 transition"
        >
          <Volume2 className="w-10 h-10" />
        </button>
        <span className="text-2xl font-black text-slate-700">Toca para escuchar el animal</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {ANIMALES.map((a) => (
          <button
            key={a.id}
            onClick={() => seleccionar(a)}
            className={`${a.color} p-6 rounded-3xl text-white shadow-xl flex flex-col items-center hover:scale-105 transition`}
          >
            <span className="text-7xl mb-2">{a.emoji}</span>
            <span className="text-xl font-black">{a.nombre}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// 6. Corazones para Papá Mario
function JuegoCorazonesPapa({ playSound, onSuccess }) {
  const [corazones, setCorazones] = useState(0);

  const darAmor = () => {
    playSound('pop');
    const total = corazones + 1;
    setCorazones(total);
    if (total % 5 === 0) {
      onSuccess();
    }
  };

  return (
    <div className="p-6 text-center max-w-xl mx-auto flex flex-col items-center">
      <h2 className="text-2xl font-black text-pink-700 mb-4">
        💖 Corazones para Papá Mario
      </h2>
      <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-blue-400 bg-blue-100 shadow-2xl mb-6">
        <img 
          src={FAMILIA_FOTOS.papa} 
          alt="Papá Mario" 
          className="w-full h-full object-cover"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>

      <button
        onClick={darAmor}
        className="bg-pink-500 text-white text-3xl font-black px-8 py-4 rounded-full shadow-2xl hover:scale-110 active:scale-90 transition flex items-center gap-3"
      >
        <Heart className="w-10 h-10 fill-current text-white animate-bounce" /> ¡Enviar Corazón!
      </button>

      <p className="mt-6 text-xl font-bold text-purple-700">
        Corazones enviados a Papá: {corazones} 💖
      </p>
    </div>
  );
}