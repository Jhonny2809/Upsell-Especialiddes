
import React from 'react';

// Use local constants for custom elements to avoid global namespace pollution.
// React treats PascalCase tags as components and renders string values as the literal tag name.
const CaktoUpsellButtons = 'cakto-upsell-buttons' as any;
const CaktoUpsellAccept = 'cakto-upsell-accept' as any;
const CaktoUpsellReject = 'cakto-upsell-reject' as any;

const PricingCTA: React.FC = () => {
  return (
    <section className="py-24 bg-white px-4">
      <div className="max-w-3xl mx-auto text-center border-4 border-red-600 rounded-[2rem] p-8 md:p-12 shadow-2xl relative">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-red-600 text-white px-8 py-2 rounded-full font-bold text-lg shadow-lg">
          OFERTA DE OPORTUNIDADE ÚNICA
        </div>

        <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 mt-4">
          Atalho para a Investidura Garantida
        </h3>
        
        <p className="text-gray-600 mb-8">
            Economize mais de 150 horas de trabalho manual e garanta que cada desbravador receba seu lenço e especialidade.
        </p>

        <div className="mb-8">
          <p className="text-gray-400 line-through text-xl">De R$ 189,90</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-gray-900 text-2xl font-bold">Por apenas</span>
            <span className="text-red-600 text-6xl md:text-7xl font-black">R$ 97,80</span>
          </div>
          <p className="text-gray-500 text-sm mt-2 font-semibold">Ou em até 12x no cartão</p>
        </div>

        {/* Integração Cakto Upsell */}
        <div className="mb-6">
          <CaktoUpsellButtons>
            <CaktoUpsellAccept
              bg-color="#16a34a"
              text-color="#ffffff"
              upsell-accept-url="members_area"
              offer-id="3d6xoeb"
              app-base-url="https://app.cakto.com.br"
              offer-type="upsell"
              upsell-reject-url="members_area"
            >
              SIM! QUERO O KIT INSTRUTOR ELITE AGORA 🚀
            </CaktoUpsellAccept>
            
            <div className="mt-4">
              <CaktoUpsellReject
                upsell-reject-url="members_area"
              >
                Não, eu não quero aproveitar a oferta e prefiro criar tudo do zero manualmente
              </CaktoUpsellReject>
            </div>
          </CaktoUpsellButtons>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-xs text-gray-500 font-semibold uppercase tracking-widest mt-8">
          <span className="flex items-center gap-1">🛡️ Compra 100% Segura</span>
          <span className="flex items-center gap-1">⚡ Acesso Imediato</span>
          <span className="flex items-center gap-1">🔄 7 Dias de Garantia</span>
        </div>

        <p className="mt-8 text-sm text-gray-400 max-w-md mx-auto italic">
            *Esta oferta é válida apenas para esta página. Ao sair, o preço voltará para R$ 189,90.
        </p>
      </div>
    </section>
  );
};

export default PricingCTA;
