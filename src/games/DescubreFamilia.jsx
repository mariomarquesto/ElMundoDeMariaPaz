import React, { useState, useRef, useEffect } from 'react';
import { FAMILIARES } from '../data/constants';

export default function JuegoDescubreFamilia({ playSound, onSuccess }) {
  const [indiceFamiliar, setIndiceFamiliar] = useState(0);
  const [revelado, setRevelado] = useState(false);
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  const familiarActual = FAMILIARES[indiceFamiliar];

  // Función para que el navegador hable
  const hablarTexto = (texto) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(texto);
      utterance.lang = 'es-AR'; // Español argentino / latino
      utterance.rate = 0.9; // Pausado y claro para una nena de 2 años
      window.speechSynthesis.speak(utterance);
    }
  };

  // Inicializar o reiniciar el lienzo gris para borrar
  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Rellenar canvas con pintura rosa/gris borrabe
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#ec4899'; // Rosa fucsia brillante
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Texto instructivo sobre la pintura
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('¡Raspa aquí con tu dedo! 🎨', canvas.width / 2, canvas.height / 2);

    setRevelado(false);
  };

  useEffect(() => {
    initCanvas();
  }, [indiceFamiliar]);

  // Dibujar/Borrar la capa superior
  const scratch = (x, y) => {
    const canvas = canvasRef.current;
    if (!canvas || revelado) return;
    const ctx = canvas.getContext('2d');

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 35, 0, Math.PI * 2);
    ctx.fill();

    playSound('pop');
    verificarPorcentajeBorrado();
  };

  // Verificar si ya borró suficiente pintura para revelar la foto
  const verificarPorcentajeBorrado = () => {
    const canvas = canvasRef.current;
    if (!canvas || revelado) return;
    const ctx = canvas.getContext('2d');
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentes = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentes++;
    }

    const porcentaje = (transparentes / (pixels.length / 4)) * 100;

    if (porcentaje > 45 && !revelado) {
      setRevelado(true);
      
      // Limpiar el resto de la pintura
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 🔊 Hablar en voz alta indicando quién es
      hablarTexto(`¡Es ${familiarActual.nombre}!`);

      // Lanzar confeti y sonido de victoria
      onSuccess();
    }
  };

  // Manejadores de eventos Mouse y Touch
  const handleMouseDown = (e) => {
    isDrawing.current = true;
    handleMouseMove(e);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current || revelado) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
    scratch(x, y);
  };

  const siguienteFamiliar = () => {
    playSound('pop');
    setIndiceFamiliar((prev) => (prev + 1) % FAMILIARES.length);
  };

  return (
    <div className="p-6 text-center max-w-lg mx-auto flex flex-col items-center">
      {/* Encabezado del juego */}
      <div className="bg-linear-to-r from-pink-500 to-rose-500 p-5 rounded-3xl shadow-2xl mb-6 border-4 border-white text-white w-full">
        <h2 className="text-2xl sm:text-3xl font-black drop-shadow-md">
          {revelado ? `¡Es ${familiarActual.nombre}! 🎉` : '¿Quién se esconde aquí? 🎨'}
        </h2>
      </div>

      {/* Tarjeta de Raspadita */}
      <div className="relative w-80 h-80 rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-pink-100 flex items-center justify-center mb-6">
        {/* Imagen del familiar oculta abajo */}
        <img
          src={familiarActual.foto}
          alt={familiarActual.nombre}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        
        {/* Fallback emoji si no carga la foto */}
        <span className="text-9xl">{familiarActual.emoji}</span>

        {/* Capa borrable (Canvas) */}
        <canvas
          ref={canvasRef}
          width={320}
          height={320}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          onTouchMove={handleMouseMove}
          className="absolute inset-0 cursor-pointer touch-none z-10"
        />
      </div>

      {/* Botón Siguiente */}
      <button
        onClick={siguienteFamiliar}
        className="bg-linear-to-r from-purple-600 to-pink-500 text-white font-black text-xl px-8 py-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition border-4 border-white cursor-pointer"
      >
        ¡Ver a otro familiar! ➡️
      </button>
    </div>
  );
}