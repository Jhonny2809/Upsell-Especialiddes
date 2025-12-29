
import React from 'react';
import { DELIVERABLES } from '../constants';

const Deliverables: React.FC = () => {
  return (
    <section className="py-20 bg-white px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            O que você recebe no <span className="text-red-600">Kit Instrutor Elite</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tudo o que um líder precisa para gerenciar as 71 especialidades obrigatórias de todas as classes regulares.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {DELIVERABLES.map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-red-50 p-8 rounded-3xl border-2 border-dashed border-red-200 text-center">
          <p className="text-red-800 font-bold text-lg italic">
            "Este material cobre exatamente as especialidades obrigatórias de Amigo, Companheiro, Pesquisador, Pioneiro, Excursionista e Guia."
          </p>
        </div>
      </div>
    </section>
  );
};

export default Deliverables;
