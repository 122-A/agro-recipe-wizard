
import React from 'react';
import { Heart, Code, Users } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Projeto AgroRA</h3>
            <p className="text-gray-300 text-sm">
              Plataforma digital para emissão de receituário agronômico, 
              desenvolvida durante o Hackathon Agro 4.0.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Equipe</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div>Arthur - Líder e Comunicação</div>
              <div>Luara - Aplicação Prática e UX</div>
              <div>Ana Paula - Validação e Testes</div>
              <div>João - Desenvolvimento Técnico</div>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Metodologia</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>SCRUM - 20h de desenvolvimento</span>
              </div>
              <div className="flex items-center space-x-2">
                <Code className="h-4 w-4" />
                <span>React + Tailwind + n8n</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm flex items-center justify-center space-x-1">
            <span>Desenvolvido com</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>para o agronegócio brasileiro</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
