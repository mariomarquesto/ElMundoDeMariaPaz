import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, Heart, Home, Sparkles, BookOpen, Eraser } from 'lucide-react';

const FAMILIA_FOTOS = {
  mama: '/fotos/mama.jpg',
  papa: '/fotos/papa.jpg',
  francisco: '/fotos/francisco.jpg',
  yeya: '/fotos/yeya.jpg',
  tiaAna: '/fotos/tia_ana.jpg',
  tiaPato: '/fotos/tia_pato.jpg',
};

const FAMILIARES = [
  { id: 'mama', nombre: 'Mamá', foto: FAMILIA_FOTOS.mama, emoji: '👩' },
  { id: 'papa', nombre: 'Papá Mario', foto: FAMILIA_FOTOS.papa, emoji: '👨' },
  { id: 'francisco', nombre: 'Francisco', foto: FAMILIA_FOTOS.francisco, emoji: '👦' },
  { id: 'yeya', nombre: 'Yeya', foto: FAMILIA_FOTOS.yeya, emoji: '👵' },
  { id: 'tiaAna', nombre: 'Tía Ana', foto: FAMILIA_FOTOS.tiaAna, emoji: '👩‍🦱' },
  { id: 'tiaPato', nombre: 'Tía Pato', foto: FAMILIA_FOTOS.tiaPato, emoji: '👩‍🦰' },
];

const ANIMALES = [
  { id: 'perro', nombre: 'Perro', emoji: '🐶', audioUrl: '/sonidos/perro.mp3', color: 'bg-amber-400' },
  { id: 'gato', nombre: 'Gato', emoji: '🐱', audioUrl: '/sonidos/gato.mp3', color: 'bg-orange-400' },
  { id: 'vaca', nombre: 'Vaca', emoji: '🐮', audioUrl: '/sonidos/vaca.mp3', color: 'bg-emerald-400' },
  { id: 'caballo', nombre: 'Caballo', emoji: '🐴', audioUrl: '/sonidos/caballo.mp3', color: 'bg-yellow-500' },
  { id: 'oveja', nombre: 'Oveja', emoji: '🐑', audioUrl: '/sonidos/oveja.mp3', color: 'bg-teal-400' },
  { id: 'pato', nombre: 'Pato', emoji: '🦆', audioUrl: '/sonidos/pato.mp3', color: 'bg-sky-400' },
];

export default function App() {
  const [juegoActual, setJuegoActual] = useState('menu');
  const [celebrando, setCelebrando] = useState(false);
  const audioCtxRef = useRef(null);

  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playSoundEffect = (type, audioUrl) => {
    try {
      const ctx = getAudioContext();

      if (type === 'animal' && audioUrl) {
        const audio = new Audio(audioUrl);
        audio.play().catch((e) => console.log('Error reproduciendo audio:', e));
      } else if (type === 'pop' && ctx) {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'win' && ctx) {
        const now = ctx.currentTime;
        const notes = [261.63, 329.63, 392.00, 523.25, 659.25];
        notes.forEach((freq, idx) => {
          const noteOsc = ctx.createOscillator();
          const noteGain = ctx.createGain();
          noteOsc.connect(noteGain);
          noteGain.connect(ctx.destination);
          noteOsc.type = 'sine';
          noteOsc.frequency.setValueAtTime(freq, now + idx * 0.09);
          noteGain.gain.setValueAtTime(0.3, now + idx * 0.09);
          noteGain.gain.linearRampToValueAtTime(0.01, now + (idx + 1) * 0.09);
          noteOsc.start(now + idx * 0.09);
          noteOsc.stop(now + (idx + 1) * 0.09);
        });
      }
    } catch (e) {
      console.log('Error de sonido:', e);
    }
  };

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
    <div 
      onClick={getAudioContext} 
      className="min-h-screen bg-linear-to-b from-sky-300 via-purple-200 to-pink-300 text-slate-800 font-sans select-none overflow-hidden pb-12"
    >
      <header className="p-4 bg-white/80 backdrop-blur-md shadow-md flex justify-between items-center">
        <button 
          onClick={() => { setJuegoActual('menu'); playSoundEffect('pop'); }}
          className="flex items-center gap-2 bg-pink-500 text-white font-bold px-4 py-2 rounded-full shadow-lg hover:bg-pink-600 active:scale-95 transition"
        >
          <Home className="w-6 h-6" /> Menú
        </button>
        <h1 className="text-xl md:text-2xl font-black text-purple-700 tracking-wide text-center">
          💖 El Mundo de María Paz 👑
        </h1>
        <div className="w-10"></div>
      </header>

      {juegoActual === 'menu' && (
        <div className="p-6 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-purple-800 mb-6">
            ¡Elige un juego o cuento, María Paz! 🎉
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <BotonMenu 
              titulo="Descubre a la Familia" 
              emoji="🎨🖼️" 
              color="bg-purple-500"
              onClick={() => { setJuegoActual('descubre-familia'); playSoundEffect('pop'); }}
            />
            <BotonMenu 
              titulo="Corazones para Mamá" 
              emoji="💖👩" 
              color="bg-rose-500"
              onClick={() => { setJuegoActual('corazones-mama'); playSoundEffect('pop'); }}
            />
            <BotonMenu 
              titulo="Corazones para Papá Mario" 
              emoji="💖👨" 
              color="bg-red-400"
              onClick={() => { setJuegoActual('corazones-papa'); playSoundEffect('pop'); }}
            />
            <BotonMenu 
              titulo="Cuentos con Francisco" 
              emoji="📖🚀" 
              color="bg-indigo-500"
              onClick={() => { setJuegoActual('cuentos-francisco'); playSoundEffect('pop'); }}
            />
            <BotonMenu 
              titulo="¿Quién es en la Familia?" 
              emoji="👨‍👩‍👧" 
              color="bg-pink-400"
              onClick={() => { setJuegoActual('familia-adivina'); playSoundEffect('pop'); }}
            />
            <BotonMenu 
              titulo="Hormigas de la Tía Ana" 
              emoji="🐜" 
              color="bg-amber-400"
              onClick={() => { setJuegoActual('hormigas-tia-ana'); playSoundEffect('pop'); }}
            />
            <BotonMenu 
              titulo="El Cohete de Francisco" 
              emoji="🚀" 
              color="bg-blue-400"
              onClick={() => { setJuegoActual('cohete-francisco'); playSoundEffect('pop'); }}
            />
            <BotonMenu 
              titulo="Burbujas de la Yeya" 
              emoji="🫧" 
              color="bg-purple-400"
              onClick={() => { setJuegoActual('burbujas-yeya'); playSoundEffect('pop'); }}
            />
            <BotonMenu 
              titulo="Sonidos de Animales" 
              emoji="🐶" 
              color="bg-emerald-400"
              onClick={() => { setJuegoActual('animales'); playSoundEffect('pop'); }}
            />
          </div>
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

// NUEVO: Juego Borrador Mágico / Raspadita de la Familia
function JuegoDescubreFamilia({ playSound, onSuccess }) {
  const [familiarActual, setFamiliarActual] = useState(FAMILIARES[0]);
  const [desvelado, setDesvelado] = useState(false);
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  const iniciarLienzo = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Ancho y alto fijos para la pantalla de raspar
    canvas.width = 300;
    canvas.height = 300;

    // Pintar la capa superior de color pastel brillante
    ctx.fillStyle = '#ec4899'; // Rosa brillante
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Texto de pista
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ ¡Borra la pintura! ✨', 150, 150);

    setDesvelado(false);
  };

  useEffect(() => {
    iniciarLienzo();
  }, [familiarActual]);

  const cambiarFamiliar = () => {
    const azar = FAMILIARES[Math.floor(Math.random() * FAMILIARES.length)];
    setFamiliarActual(azar);
  };

  const borrarLienzo = (e) => {
    const canvas = canvasRef.current;
    if (!canvas || desvelado) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Usar 'destination-out' para que el trazo borre la pintura rosa
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 35, 0, Math.PI * 2);
    ctx.fill();

    // Reproducir un sonido de pop liviano mientras borra
    playSound('pop');

    // Calcular cuánto porcentaje se ha borrado
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparentPixels = 0;
    for (let i = 3; i < imgData.data.length; i += 4) {
      if (imgData.data[i] === 0) transparentPixels++;
    }

    const porcentajeBorrado = transparentPixels / (canvas.width * canvas.height);

    // Si borró más del 50%, completar automáticamente y celebrar
    if (porcentajeBorrado > 0.45 && !desvelado) {
      setDesvelado(true);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      onSuccess();
    }
  };

  return (
    <div className="p-6 text-center max-w-xl mx-auto flex flex-col items-center select-none">
      <h2 className="text-2xl font-black text-purple-800 mb-2 flex items-center gap-2">
        <Eraser className="w-8 h-8 text-pink-600" /> Borrador Mágico
      </h2>
      <p className="text-lg font-bold text-slate-700 mb-4">
        ¡Pasa tu dedito por la pantalla para descubrir quién está escondido! 🎨
      </p>

      {/* Contenedor de la Foto y el Canvas raspable encima */}
      <div className="relative w-[300px] h-[300px] rounded-3xl overflow-hidden border-8 border-white shadow-2xl bg-purple-100 mb-6">
        <img 
          src={familiarActual.foto} 
          alt={familiarActual.nombre} 
          className="w-full h-full object-cover"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <canvas 
          ref={canvasRef}
          onMouseDown={() => { isDrawing.current = true; }}
          onMouseUp={() => { isDrawing.current = false; }}
          onMouseMove={(e) => { if (isDrawing.current) borrarLienzo(e); }}
          onTouchMove={borrarLienzo}
          className="absolute inset-0 cursor-pointer touch-none"
        />
      </div>

      {desvelado && (
        <div className="bg-white px-6 py-3 rounded-full shadow-lg mb-4 border-4 border-pink-300 animate-bounce">
          <span className="text-2xl font-black text-purple-700">
            ¡Es {familiarActual.nombre}! 🎉
          </span>
        </div>
      )}

      <button
        onClick={cambiarFamiliar}
        className="bg-purple-600 text-white text-xl font-black px-6 py-3 rounded-full shadow-xl hover:scale-105 active:scale-95 transition flex items-center gap-2"
      >
        <Sparkles className="w-6 h-6" /> ¡Otro Familiar! ➡️
      </button>
    </div>
  );
}

// NUEVO: Corazones para Mamá
function JuegoCorazonesMama({ playSound, onSuccess }) {
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
      <h2 className="text-2xl font-black text-rose-600 mb-4">
        💖 Corazones para Mamá
      </h2>
      <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-rose-400 bg-rose-100 shadow-2xl mb-6">
        <img 
          src={FAMILIA_FOTOS.mama} 
          alt="Mamá" 
          className="w-full h-full object-cover"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>

      <button
        onClick={darAmor}
        className="bg-rose-500 text-white text-3xl font-black px-8 py-4 rounded-full shadow-2xl hover:scale-110 active:scale-90 transition flex items-center gap-3"
      >
        <Heart className="w-10 h-10 fill-current text-white animate-bounce" /> ¡Enviar Corazón a Mamá!
      </button>

      <p className="mt-6 text-xl font-bold text-rose-700">
        Corazones enviados a Mamá: {corazones} 💖
      </p>
    </div>
  );
}

// Corazones para Papá Mario
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

// Cuentos de Aventuras con Francisco y María Paz
function JuegoCuentosFrancisco({ playSound, onSuccess }) {
  const [pagina, setPagina] = useState(0);

  const escenas = [
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

  const siguientePagina = () => {
    playSound('pop');
    if (pagina < escenas.length - 1) {
      setPagina(pagina + 1);
    } else {
      onSuccess();
      setPagina(0);
    }
  };

  const escenaActual = escenas[pagina];

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
        className="bg-indigo-500 text-white text-2xl font-black px-8 py-4 rounded-full shadow-xl hover:scale-110 active:scale-95 transition flex items-center gap-3"
      >
        <Sparkles className="w-8 h-8" /> Siguiente Página ➡️
      </button>

      <p className="mt-4 text-sm font-bold text-slate-600">
        Página {pagina + 1} de {escenas.length}
      </p>
    </div>
  );
}

// ¿Quién es en la Familia?
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
            className="bg-white p-4 rounded-3xl shadow-lg border-4 border-white hover:border-pink-400 active:scale-95 transition flex flex-col items-center"
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

// Las Hormigas de la Tía Ana
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
            x: Math.random() * 75 + 10,
            y: Math.random() * 75 + 10,
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
    <div className="relative h-[70vh] w-full overflow-hidden p-4">
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

// Cohete de Francisco
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
        🚀 El Cohete de Francisco
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
        Toca las estrellas para ayudar a Francisco a despegar ⭐
      </p>

      <div className="flex gap-4">
        {[1, 2, 3].map((idx) => (
          <button
            key={idx}
            onClick={tocarEstrella}
            className="text-7xl animate-bounce hover:scale-125 transition active:scale-90"
          >
            ⭐
          </button>
        ))}
      </div>
    </div>
  );
}

// Burbujas de la Yeya
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
            className="w-24 h-24 rounded-full bg-cyan-300/60 border-4 border-white shadow-xl text-4xl flex items-center justify-center animate-pulse hover:scale-110 active:scale-75 transition"
          >
            🫧
          </button>
        ))}
      </div>
    </div>
  );
}

// Animales
function JuegoAnimales({ playSound, onSuccess }) {
  const [animalObjetivo, setAnimalObjetivo] = useState(ANIMALES[0]);

  const reproducirAnimal = (animal) => {
    playSound('animal', animal.audioUrl);
  };

  const seleccionar = (animal) => {
    reproducirAnimal(animal);
    if (animal.id === animalObjetivo.id) {
      setTimeout(() => {
        onSuccess();
        const nuevo = ANIMALES[Math.floor(Math.random() * ANIMALES.length)];
        setAnimalObjetivo(nuevo);
      }, 700);
    }
  };

  return (
    <div className="p-6 text-center max-w-2xl mx-auto">
      <div className="bg-white p-4 rounded-3xl shadow-xl mb-6 flex items-center justify-center gap-4 border-4 border-emerald-300">
        <button 
          onClick={() => reproducirAnimal(animalObjetivo)}
          className="bg-yellow-400 text-white p-4 rounded-full shadow-lg hover:scale-110 active:scale-90 transition animate-bounce"
        >
          <Volume2 className="w-10 h-10" />
        </button>
        <span className="text-2xl font-black text-slate-700">
          ¿Dónde está el <span className="text-emerald-600 underline">{animalObjetivo.nombre}</span>?
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {ANIMALES.map((a) => (
          <button
            key={a.id}
            onClick={() => seleccionar(a)}
            className={`${a.color} p-6 rounded-3xl text-white shadow-xl flex flex-col items-center hover:scale-105 active:scale-95 transition border-4 border-white`}
          >
            <span className="text-7xl mb-2">{a.emoji}</span>
            <span className="text-xl font-black">{a.nombre}</span>
          </button>
        ))}
      </div>
    </div>
  );
}