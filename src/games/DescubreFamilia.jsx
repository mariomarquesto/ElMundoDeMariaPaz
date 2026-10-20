import React, { useState, useEffect, useRef } from 'react';
import { Eraser, Sparkles } from 'lucide-react';
import { FAMILIARES } from '../data/constants';

export default function JuegoDescubreFamilia({ playSound, onSuccess }) {
  const [familiarActual, setFamiliarActual] = useState(FAMILIARES[0]);
  const [desvelado, setDesvelado] = useState(false);
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  const iniciarLienzo = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = 300;
    canvas.height = 300;

    ctx.fillStyle = '#ec4899';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 35, 0, Math.PI * 2);
    ctx.fill();

    playSound('pop');

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparentPixels = 0;
    for (let i = 3; i < imgData.data.length; i += 4) {
      if (imgData.data[i] === 0) transparentPixels++;
    }

    const porcentajeBorrado = transparentPixels / (canvas.width * canvas.height);

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