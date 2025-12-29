
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(540); // 9 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <header className="sticky top-0 z-50 bg-black text-white py-3 px-4 shadow-lg border-b border-red-600">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="font-bold text-sm md:text-base animate-pulse-red text-center md:text-left">
          🚨 ATENÇÃO: ESSA OFERTA EXPIRA EM BREVE! NÃO FECHE OU ATUALIZE ESTA PÁGINA.
        </p>
        <div className="flex items-center gap-2 bg-red-600 px-4 py-1 rounded-full font-mono font-bold text-xl">
          <span className="text-xs uppercase tracking-tighter opacity-80">Tempo restante:</span>
          {formatTime(timeLeft)}
        </div>
      </div>
    </header>
  );
};

export default Header;
