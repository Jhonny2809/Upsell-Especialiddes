
import React, { useState, useEffect, useRef } from 'react';

const Hero: React.FC = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const [showUnmuteButton, setShowUnmuteButton] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<any>(null);

  // Impede o scroll enquanto o overlay estiver ativo
  useEffect(() => {
    if (isOverlayVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOverlayVisible]);

  // Inicializa o player assim que o componente monta
  useEffect(() => {
    const checkVimeo = setInterval(() => {
      const Vimeo = (window as any).Vimeo;
      if (Vimeo && iframeRef.current) {
        playerRef.current = new Vimeo.Player(iframeRef.current);
        clearInterval(checkVimeo);
      }
    }, 100);
    return () => clearInterval(checkVimeo);
  }, []);

  // Função para desmutar manualmente via botão flutuante
  const handleUnmute = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (playerRef.current) {
      try {
        await playerRef.current.setMuted(false);
        await playerRef.current.setVolume(1);
        setShowUnmuteButton(false);
      } catch (err) {
        console.error('Falha ao desmutar:', err);
      }
    }
  };

  // Função para lidar com o clique no overlay inicial
  const handleStartVideo = async () => {
    setIsOverlayVisible(false);
    
    if (playerRef.current) {
      try {
        // Tenta iniciar com som
        await playerRef.current.setMuted(false);
        await playerRef.current.setVolume(1);
        await playerRef.current.play();
        
        // Verifica se realmente desmutou (alguns navegadores são teimosos)
        const muted = await playerRef.current.getMuted();
        if (muted) {
          setShowUnmuteButton(true);
        }
      } catch (error) {
        console.error('Erro ao iniciar vídeo:', error);
        playerRef.current.play();
        setShowUnmuteButton(true); // Se falhou o play com som, mostra o botão de unmute
      }
    }
  };

  return (
    <section className="bg-gray-50 pt-10 pb-16 px-4 relative">
      {/* Overlay de Destaque Inicial */}
      {isOverlayVisible && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4 cursor-pointer transition-opacity duration-500"
          onClick={handleStartVideo}
        >
          <div className="text-center max-w-2xl animate-bounce mb-8">
            <div className="bg-red-600 text-white p-6 rounded-full inline-block mb-4 shadow-[0_0_50px_rgba(220,38,38,0.5)]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-12 h-12">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter">
              Clique para reproduzir o vídeo
            </h2>
            <p className="text-gray-400 mt-2 font-semibold">
              ⚠️ Som obrigatório: Entenda como garantir sua investidura.
            </p>
          </div>
          
          <div className="absolute bottom-1/4 animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-red-600 font-bold uppercase tracking-widest text-sm mb-4">
          Parabéns pela sua compra! Mas temos um problema...
        </h2>
        
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
          ESPERE! A Investidura do seu clube ainda <span className="text-red-600 underline decoration-2">não está garantida</span> apenas com o Manual...
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Você já tem o conteúdo, mas você realmente tem <span className="font-bold text-gray-800">tempo para criar 71 aulas e 71 provas</span> do zero antes da próxima cerimônia?
        </p>

        {/* Container do Vídeo com Botão de Unmute */}
        <div className={`relative mb-10 shadow-2xl rounded-2xl overflow-hidden border-4 border-white bg-black transition-all duration-700 ${isOverlayVisible ? 'scale-95 blur-sm opacity-50' : 'scale-100 blur-0 opacity-100'}`}>
          
          {/* Botão de Ativar Som (Aparece se o vídeo estiver mudo após o play) */}
          {showUnmuteButton && !isOverlayVisible && (
            <button 
              onClick={handleUnmute}
              className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full shadow-[0_0_20px_rgba(220,38,38,0.6)] flex items-center gap-3 animate-pulse transition-transform hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
              CLIQUE PARA ATIVAR O SOM
            </button>
          )}

          <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
            <iframe 
              ref={iframeRef}
              src="https://player.vimeo.com/video/1149987439?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" 
              frameBorder="0" 
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} 
              title="Especialidade PLUS"
            ></iframe>
          </div>
        </div>

        <div className="bg-yellow-50 border-2 border-yellow-200 p-6 rounded-xl inline-block text-left shadow-sm">
          <p className="text-yellow-800 font-bold text-sm md:text-base">
            ✅ Garanta as 71 Especialidades Obrigatórias (Amigo a Guia) em um clique.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
