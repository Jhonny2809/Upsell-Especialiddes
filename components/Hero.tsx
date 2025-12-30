
import React, { useState, useEffect, useRef } from 'react';

const Hero: React.FC = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<any>(null);

  // Inicializa o player assim que o componente monta
  useEffect(() => {
    let muteCheckInterval: number;

    const checkVimeo = setInterval(() => {
      const Vimeo = (window as any).Vimeo;
      if (Vimeo && iframeRef.current) {
        playerRef.current = new Vimeo.Player(iframeRef.current);
        
        // Tenta iniciar mudo para atrair atenção com o movimento (curiosidade)
        playerRef.current.setMuted(true);
        playerRef.current.play().catch(() => {
          // Bloqueio comum de autoplay, ignoramos o erro
        });

        // Monitora o estado de mudo periodicamente para atualizar o botão flutuante
        muteCheckInterval = window.setInterval(async () => {
          if (playerRef.current) {
            try {
              const muted = await playerRef.current.getMuted();
              setIsMuted(muted);
            } catch (e) {
              // Silencioso
            }
          }
        }, 1000);

        clearInterval(checkVimeo);
      }
    }, 200);

    return () => {
      clearInterval(checkVimeo);
      if (muteCheckInterval) clearInterval(muteCheckInterval);
    };
  }, []);

  // Função ÚNICA para Iniciar Vídeo E Ativar Som
  const handleAction = () => {
    // Remove o overlay IMEDIATAMENTE para evitar percepção de travamento
    setIsOverlayVisible(false);

    if (playerRef.current) {
      // Executa as ações do player de forma assíncrona
      (async () => {
        try {
          await playerRef.current.setMuted(false);
          await playerRef.current.setVolume(1);
          await playerRef.current.setCurrentTime(0); // Volta pro início para o usuário não perder nada
          await playerRef.current.play();
          setIsMuted(false);
        } catch (error) {
          console.warn('Falha ao desmutar automaticamente:', error);
          // Fallback simples: tenta apenas dar play se o unmute falhar
          if (playerRef.current) {
            playerRef.current.play().catch(() => {});
          }
        }
      })();
    }
  };

  // Função específica para desmutar (usada pelo botão flutuante secundário)
  const unmuteVideo = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (playerRef.current) {
      try {
        await playerRef.current.setMuted(false);
        await playerRef.current.setVolume(1);
        setIsMuted(false);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <section className="bg-gray-50 pt-10 pb-16 px-4 relative">
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

        {/* Container do Vídeo */}
        <div className="relative mb-10 shadow-2xl rounded-2xl overflow-hidden border-4 border-white bg-black group aspect-video">
          
          {/* Botão de Ativar Som (Aparece apenas se estiver mudo e sem overlay inicial) */}
          {!isOverlayVisible && isMuted && (
            <button 
              onClick={unmuteVideo}
              className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-red-600 hover:bg-red-700 text-white font-black py-3 px-6 rounded-full shadow-[0_0_20px_rgba(220,38,38,0.7)] flex items-center gap-3 animate-pulse transition-transform hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
              CLIQUE PARA ATIVAR O SOM
            </button>
          )}

          {/* Overlay Inicial (Play + Unmute) */}
          {isOverlayVisible && (
            <div 
              className="absolute inset-0 z-40 bg-black/70 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-black/50 backdrop-blur-[2px]"
              onClick={handleAction}
            >
              <div className="relative">
                {/* Efeito de Ondas de Pulso */}
                <div className="absolute inset-0 bg-red-600 rounded-full animate-ping opacity-25"></div>
                <div className="relative bg-red-600 text-white p-6 md:p-8 rounded-full mb-6 shadow-[0_0_50px_rgba(220,38,38,0.8)] group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-12 h-12 md:w-16 md:h-16 ml-1">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              
              <div className="bg-black/80 px-8 py-4 rounded-2xl border border-white/20 text-center mx-4">
                <h3 className="text-white font-black text-xl md:text-3xl uppercase tracking-tighter mb-1">
                  Clique para assistir com som
                </h3>
                <p className="text-red-400 text-sm md:text-base font-bold flex items-center justify-center gap-2">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.983 5.983 0 01-1.414 4.243 1 1 0 01-1.415-1.415A3.983 3.983 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                  </svg>
                  PRECISAMOS QUE VOCÊ OUÇA ISTO!
                </p>
              </div>
            </div>
          )}

          <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
            <iframe 
              ref={iframeRef}
              src="https://player.vimeo.com/video/1149987439?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1" 
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
