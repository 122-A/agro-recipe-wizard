
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Phone, MapPin, Volume2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface FormularioStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  currentStep: number;
  totalSteps: number;
}

const FormularioStep = ({ formData, updateFormData, onNext }: FormularioStepProps) => {
  const [localData, setLocalData] = useState({
    nomeProdutor: formData.nomeProdutor || '',
    cpfProdutor: formData.cpfProdutor || '',
    telefoneProdutor: formData.telefoneProdutor || '',
    propriedade: formData.propriedade || '',
    localizacao: formData.localizacao || '',
    municipio: formData.municipio || '',
    nomeConsultor: formData.nomeConsultor || '',
    cpfConsultor: formData.cpfConsultor || '',
    telefoneConsultor: formData.telefoneConsultor || '',
    tituloConsultor: formData.tituloConsultor || '',
    numeroRegistro: formData.numeroRegistro || '',
    ...formData
  });

  const handleInputChange = (field: string, value: string) => {
    const newData = { ...localData, [field]: value };
    setLocalData(newData);
    updateFormData(newData);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      speechSynthesis.speak(utterance);
    }
  };

  const handleNext = () => {
    const requiredFields = ['nomeProdutor', 'cpfProdutor', 'telefoneProdutor', 'nomeConsultor', 'cpfConsultor', 'telefoneConsultor'];
    const missingFields = requiredFields.filter(field => !localData[field]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    onNext();
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-4">Informações Básicas</h2>
        <p className="text-lg text-gray-600">Preencha os dados do produtor e consultor técnico</p>
      </div>

      {/* Informações do Produtor */}
      <Card className="border-green-200">
        <CardHeader className="bg-green-50">
          <CardTitle className="flex items-center space-x-2 text-green-700">
            <User className="h-6 w-6" />
            <span>Informações do Produtor</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => speakText('Informações do Produtor')}
              className="ml-auto"
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nomeProdutor" className="text-lg font-medium">Nome do Produtor *</Label>
              <Input
                id="nomeProdutor"
                placeholder="Digite o nome completo"
                value={localData.nomeProdutor}
                onChange={(e) => handleInputChange('nomeProdutor', e.target.value)}
                className="text-lg p-4 h-14"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpfProdutor" className="text-lg font-medium">CPF do Produtor *</Label>
              <Input
                id="cpfProdutor"
                placeholder="000.000.000-00"
                value={localData.cpfProdutor}
                onChange={(e) => handleInputChange('cpfProdutor', e.target.value)}
                className="text-lg p-4 h-14"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="telefoneProdutor" className="text-lg font-medium">Telefone com DDD *</Label>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-green-600" />
                <Input
                  id="telefoneProdutor"
                  placeholder="(67) 99999-9999"
                  value={localData.telefoneProdutor}
                  onChange={(e) => handleInputChange('telefoneProdutor', e.target.value)}
                  className="text-lg p-4 h-14"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="propriedade" className="text-lg font-medium">Nome da Propriedade</Label>
              <Input
                id="propriedade"
                placeholder="Ex: Fazenda Santa Rita"
                value={localData.propriedade}
                onChange={(e) => handleInputChange('propriedade', e.target.value)}
                className="text-lg p-4 h-14"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="localizacao" className="text-lg font-medium">Localização</Label>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-green-600" />
                <Input
                  id="localizacao"
                  placeholder="Endereço da propriedade"
                  value={localData.localizacao}
                  onChange={(e) => handleInputChange('localizacao', e.target.value)}
                  className="text-lg p-4 h-14"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="municipio" className="text-lg font-medium">Município</Label>
              <Input
                id="municipio"
                placeholder="Nome do município"
                value={localData.municipio}
                onChange={(e) => handleInputChange('municipio', e.target.value)}
                className="text-lg p-4 h-14"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informações do Consultor */}
      <Card className="border-green-200">
        <CardHeader className="bg-green-50">
          <CardTitle className="flex items-center space-x-2 text-green-700">
            <User className="h-6 w-6" />
            <span>Informações do Consultor Técnico</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => speakText('Informações do Consultor Técnico')}
              className="ml-auto"
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nomeConsultor" className="text-lg font-medium">Nome do Consultor *</Label>
              <Input
                id="nomeConsultor"
                placeholder="Nome completo do engenheiro agrônomo"
                value={localData.nomeConsultor}
                onChange={(e) => handleInputChange('nomeConsultor', e.target.value)}
                className="text-lg p-4 h-14"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpfConsultor" className="text-lg font-medium">CPF do Consultor *</Label>
              <Input
                id="cpfConsultor"
                placeholder="000.000.000-00"
                value={localData.cpfConsultor}
                onChange={(e) => handleInputChange('cpfConsultor', e.target.value)}
                className="text-lg p-4 h-14"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="telefoneConsultor" className="text-lg font-medium">Telefone com DDD *</Label>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-green-600" />
                <Input
                  id="telefoneConsultor"
                  placeholder="(67) 99999-9999"
                  value={localData.telefoneConsultor}
                  onChange={(e) => handleInputChange('telefoneConsultor', e.target.value)}
                  className="text-lg p-4 h-14"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tituloConsultor" className="text-lg font-medium">Título Profissional</Label>
              <Input
                id="tituloConsultor"
                placeholder="Ex: Engenheiro Agrônomo"
                value={localData.tituloConsultor}
                onChange={(e) => handleInputChange('tituloConsultor', e.target.value)}
                className="text-lg p-4 h-14"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="numeroRegistro" className="text-lg font-medium">Número do Registro CREA</Label>
            <Input
              id="numeroRegistro"
              placeholder="Ex: CREA-MS 123456"
              value={localData.numeroRegistro}
              onChange={(e) => handleInputChange('numeroRegistro', e.target.value)}
              className="text-lg p-4 h-14"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg"
        >
          Próxima Etapa: Upload da ART
        </Button>
      </div>
    </div>
  );
};

export default FormularioStep;
