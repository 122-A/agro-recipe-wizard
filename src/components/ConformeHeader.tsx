
import React from 'react';
import { Shield, CheckCircle } from 'lucide-react';

const ConformeHeader = () => {
  return (
    <header className="bg-white border-b-4 border-green-600 shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-4">
            <div className="bg-green-600 p-3 rounded-full">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold text-green-700">CONFORME</h1>
              <p className="text-lg text-gray-600 mt-1">Receituário Agronômico Digital Seguro</p>
              <div className="flex items-center justify-center space-x-2 mt-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm text-green-600 font-medium">Validação Digital Certificada</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ConformeHeader;
