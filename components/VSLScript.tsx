
import React from 'react';

const VSLScript: React.FC = () => {
  return (
    <div className="mt-8 p-8 bg-gray-100 rounded-xl border border-gray-200 text-left max-w-3xl mx-auto shadow-inner">
      <h3 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">Roteiro Sugerido para o seu Vídeo (VSL)</h3>
      
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <div>
          <span className="font-bold text-red-600">00:00 - GANCHO:</span>
          <p>"Parabéns pela compra do Manual! Você acaba de dar um passo gigante para organizar seu clube. Mas sendo bem sincero... ter o manual é apenas 50% do caminho. O trabalho duro começa agora."</p>
        </div>
        
        <div>
          <span className="font-bold text-red-600">00:45 - O PROBLEMA:</span>
          <p>"Você já parou para pensar quanto tempo vai levar para criar 71 apresentações de slides? E as 71 provas com gabaritos? Você vai passar suas noites de sono e fins de semana na frente do computador em vez de estar com seus desbravadores. Sem esse material pronto, a sua investidura corre o risco de ficar incompleta."</p>
        </div>

        <div>
          <span className="font-bold text-red-600">01:30 - A SOLUÇÃO:</span>
          <p>"É por isso que criei o Kit Instrutor Elite. Eu fiz todo o trabalho pesado por você. Aqui estão os slides e provas das 71 especialidades exatas que o seu clube precisa para investir de Amigo a Guia. É só abrir, dar a aula e imprimir a prova."</p>
        </div>

        <div>
          <span className="font-bold text-red-600">02:30 - OS BÔNUS:</span>
          <p>"E para você se tornar um líder referência, estou incluindo hoje 5 Mestrados completos como presente. Zoologia, Botânica, ADRA e muito mais. Conteúdo avançado para quem não se contenta com o básico."</p>
        </div>

        <div>
          <span className="font-bold text-red-600">03:30 - CTA FINAL:</span>
          <p>"Essa é uma oportunidade única. Você não verá esse preço de R$ 97,80 em nenhum outro lugar. Clique no botão abaixo agora e garanta a investidura do seu clube com 100% de sucesso e 0% de estresse."</p>
        </div>
      </div>
    </div>
  );
};

export default VSLScript;
