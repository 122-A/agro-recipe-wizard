
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Info, Shield, BookOpen, CheckCircle } from 'lucide-react';

const EducationalBanner = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Receituário Agronômico Digital
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Sistema educativo e legal para emissão de receitas agronômicas, 
            conforme Lei 12.059 - Art. 38 e 39
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="border-blue-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Legalmente Válido</h3>
              <p className="text-sm text-gray-600">
                Segue todas as exigências da legislação brasileira para receituário agronômico
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Educativo</h3>
              <p className="text-sm text-gray-600">
                Linguagem simples e explicações claras para facilitar o entendimento
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Assinatura Digital</h3>
              <p className="text-sm text-gray-600">
                Sistema seguro de assinatura digital para agrônomo e produtor
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg max-w-3xl mx-auto">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-semibold text-amber-800 mb-1">
                Responsabilidade Solidária (Art. 39)
              </p>
              <p className="text-amber-700">
                O profissional que emite o receituário e o usuário que o utiliza são 
                igualmente responsáveis pela aplicação correta dos produtos prescritos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationalBanner;
