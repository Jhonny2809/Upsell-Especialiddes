
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-12 px-4 border-t border-gray-200">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-gray-400 text-sm mb-4">
          © {new Date().getFullYear()} Kit Instrutor Elite - Todos os direitos reservados.
        </p>
        <p className="text-gray-400 text-xs leading-relaxed">
          Este site não é afiliado ao Facebook ou a qualquer entidade do Facebook. Depois que você sair do Facebook, a responsabilidade não é deles e sim do nosso site. Fazemos todos os esforços para indicar claramente e mostrar todos os resultados do produto.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
