
import React, { useState, useEffect, useCallback } from 'react';
import { BONUSES } from '../constants';

const BonusSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(1);

  // Atualiza quantos itens mostrar baseado na largura da tela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsToShow(3);
      } else if (window.innerWidth >= 640) {
        setItemsToShow(2);
      } else {
        setItemsToShow(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % (BONUSES.length - (itemsToShow - 1)));
  }, [itemsToShow]);

  // Loop automático do carrossel
  useEffect(() => {
    const timer = setInterval(() => {
      // Se chegarmos no fim, volta pro começo
      if (currentIndex >= BONUSES.length - itemsToShow) {
        setCurrentIndex(0);
      } else {
        nextSlide();
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [currentIndex, nextSlide, itemsToShow]);

  return (
    <section className="py-20 bg-gray-950 text-white px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="bg-yellow-500 text-black px-4 py-1 rounded-full text-xs font-bold uppercase mb-4 inline-block shadow-[0_0_15px_rgba(234,179,8,0.3)]">
            Presente Exclusivo
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
            BÔNUS: 5 Mestrados Completos
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Eleve o nível do seu clube e a sua autoridade como líder com materiais de nível avançado.
          </p>
        </div>

        {/* Container do Carrossel */}
        <div className="relative group">
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`
              }}
            >
              {BONUSES.map((bonus, idx) => (
                <div 
                  key={idx} 
                  className="flex-shrink-0 px-2"
                  style={{ width: `${100 / itemsToShow}%` }}
                >
                  <div className="relative rounded-2xl overflow-hidden bg-gray-900 border-2 border-gray-800 group-hover:border-yellow-500/50 transition-all duration-300 shadow-2xl">
                    <img 
                      src={bonus.image} 
                      alt={bonus.title} 
                      className="w-full aspect-[4/3] object-cover"
                    />
                    <div className="p-6 bg-gradient-to-t from-black via-gray-900 to-transparent">
                      <h3 className="font-bold text-xl text-yellow-500 mb-2">{bonus.title}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">{bonus.description}</p>
                      <div className="inline-block bg-yellow-500 text-black text-[10px] font-black px-3 py-1 rounded-full shadow-lg uppercase">
                        Grátis Hoje
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicadores (Dots) */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: BONUSES.length - itemsToShow + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 transition-all duration-300 rounded-full ${
                  currentIndex === idx ? 'w-8 bg-yellow-500' : 'w-2 bg-gray-700'
                }`}
                aria-label={`Ir para slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 text-center bg-gray-900/50 p-8 rounded-3xl border border-gray-800 inline-block left-1/2 -translate-x-1/2 relative">
            <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">
                Valor total se vendido separadamente
            </p>
            <div className="flex items-center justify-center gap-4 mt-2">
                <span className="text-gray-600 line-through text-2xl font-bold">R$ 250,00</span>
                <span className="text-yellow-500 font-black text-4xl animate-pulse">R$ 0,00</span>
            </div>
        </div>
      </div>
    </section>
  );
};

export default BonusSection;
