
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Droplets, MapPin, Calendar, Volume2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ReceituarioStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  currentStep: number;
  totalSteps: number;
}

const ReceituarioStep = ({ formData, updateFormData, onNext, onPrevious }: ReceituarioStepProps) => {
  const [localData, setLocalData] = useState({
    cultura: formData.cultura || '',
    diagnostico: formData.diagnostico || '',
    produto: formData.produto || '',
    nomeComum: formData.nomeComum || '',
    areaTratar: formData.areaTratar || '',
    dose: formData.dose || '',
    qtdeTotal: formData.qtdeTotal || '',
    volumeCalda: formData.volumeCalda || '',
    intervaloSeguranca: formData.intervaloSeguranca || '',
    classeAgronomica: formData.classeAgronomica || '',
    classeToxicologica: formData.classeToxicologica || '',
    modalidadeAplicacao: formData.modalidadeAplicacao || '',
    epocaAplicacao: formData.epocaAplicacao || '',
    numeroAplicacao: formData.numeroAplicacao || '',
    observacoes: formData.observacoes || '',
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
    const requiredFields = ['cultura', 'diagnostico', 'produto', 'areaTratar', 'dose'];
    const missingFields = requiredFields.filter(field => !localData[field]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios do receituário.",
        variant: "destructive",
      });
      return;
    }
    
    onNext();
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-4">Receituário Agronômico</h2>
        <p className="text-lg text-gray-600">Preencha as recomendações técnicas detalhadas</p>
      </div>

      {/* Cultura e Diagnóstico */}
      <Card className="border-green-200">
        <CardHeader className="bg-green-50">
          <CardTitle className="flex items-center space-x-2 text-green-700">
            <MapPin className="h-6 w-6" />
            <span>Cultura e Diagnóstico</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => speakText('Cultura e Diagnóstico')}
              className="ml-auto"
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <Label htmlFor="cultura" className="text-lg font-medium">Cultura *</Label>
            <Select value={localData.cultura} onValueChange={(value) => handleInputChange('cultura', value)}>
              <SelectTrigger className="text-lg h-14">
                <SelectValue placeholder="Selecione a cultura" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="soja">Soja</SelectItem>
                <SelectItem value="milho">Milho</SelectItem>
                <SelectItem value="algodao">Algodão</SelectItem>
                <SelectItem value="cana">Cana-de-açúcar</SelectItem>
                <SelectItem value="cafe">Café</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="citros">Citros</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="diagnostico" className="text-lg font-medium">Diagnóstico *</Label>
            <Textarea
              id="diagnostico"
              placeholder="Descreva o problema identificado (pragas, doenças, plantas daninhas)"
              value={localData.diagnostico}
              onChange={(e) => handleInputChange('diagnostico', e.target.value)}
              className="text-lg p-4 min-h-[100px]"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Produto e Dosagem */}
      <Card className="border-green-200">
        <CardHeader className="bg-green-50">
          <CardTitle className="flex items-center space-x-2 text-green-700">
            <Droplets className="h-6 w-6" />
            <span>Produto e Dosagem</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="produto" className="text-lg font-medium">Produto *</Label>
              <Input
                id="produto"
                placeholder="Nome comercial do produto"
                value={localData.produto}
                onChange={(e) => handleInputChange('produto', e.target.value)}
                className="text-lg p-4 h-14"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nomeComum" className="text-lg font-medium">Nome Comum</Label>
              <Input
                id="nomeComum"
                placeholder="Ingrediente ativo"
                value={localData.nomeComum}
                onChange={(e) => handleInputChange('nomeComum', e.target.value)}
                className="text-lg p-4 h-14"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="areaTratar" className="text-lg font-medium">Área a Tratar (ha) *</Label>
              <Input
                id="areaTratar"
                placeholder="Ex: 2.5"
                value={localData.areaTratar}
                onChange={(e) => handleInputChange('areaTratar', e.target.value)}
                className="text-lg p-4 h-14"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dose" className="text-lg font-medium">Dose *</Label>
              <Input
                id="dose"
                placeholder="Ex: 1 L/ha"
                value={localData.dose}
                onChange={(e) => handleInputChange('dose', e.target.value)}
                className="text-lg p-4 h-14"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qtdeTotal" className="text-lg font-medium">Qtde Total</Label>
              <Input
                id="qtdeTotal"
                placeholder="Ex: 2.5 L"
                value={localData.qtdeTotal}
                onChange={(e) => handleInputChange('qtdeTotal', e.target.value)}
                className="text-lg p-4 h-14"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="volumeCalda" className="text-lg font-medium">Volume de Calda</Label>
            <Input
              id="volumeCalda"
              placeholder="Ex: 200 L/ha"
              value={localData.volumeCalda}
              onChange={(e) => handleInputChange('volumeCalda', e.target.value)}
              className="text-lg p-4 h-14"
            />
          </div>
        </CardContent>
      </Card>

      {/* Informações Técnicas */}
      <Card className="border-green-200">
        <CardHeader className="bg-green-50">
          <CardTitle className="flex items-center space-x-2 text-green-700">
            <Calendar className="h-6 w-6" />
            <span>Informações Técnicas</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="intervaloSeguranca" className="text-lg font-medium">Intervalo de Segurança</Label>
              <Input
                id="intervaloSeguranca"
                placeholder="Ex: 14 dias"
                value={localData.intervaloSeguranca}
                onChange={(e) => handleInputChange('intervaloSeguranca', e.target.value)}
                className="text-lg p-4 h-14"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="numeroAplicacao" className="text-lg font-medium">Nº de Aplicação</Label>
              <Input
                id="numeroAplicacao"
                placeholder="Ex: 2"
                value={localData.numeroAplicacao}
                onChange={(e) => handleInputChange('numeroAplicacao', e.target.value)}
                className="text-lg p-4 h-14"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="classeAgronomica" className="text-lg font-medium">Classe Agronômica</Label>
              <Select value={localData.classeAgronomica} onValueChange={(value) => handleInputChange('classeAgronomica', value)}>
                <SelectTrigger className="text-lg h-14">
                  <SelectValue placeholder="Selecione a classe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="herbicida">Herbicida</SelectItem>
                  <SelectItem value="inseticida">Inseticida</SelectItem>
                  <SelectItem value="fungicida">Fungicida</SelectItem>
                  <SelectItem value="acaricida">Acaricida</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="classeToxicologica" className="text-lg font-medium">Classe Toxicológica</Label>
              <Select value={localData.classeToxicologica} onValueChange={(value) => handleInputChange('classeToxicologica', value)}>
                <SelectTrigger className="text-lg h-14">
                  <SelectValue placeholder="Selecione a classe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="I">I - Extremamente Tóxico</SelectItem>
                  <SelectItem value="II">II - Altamente Tóxico</SelectItem>
                  <SelectItem value="III">III - Medianamente Tóxico</SelectItem>
                  <SelectItem value="IV">IV - Pouco Tóxico</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="modalidadeAplicacao" className="text-lg font-medium">Modalidade de Aplicação</Label>
              <Select value={localData.modalidadeAplicacao} onValueChange={(value) => handleInputChange('modalidadeAplicacao', value)}>
                <SelectTrigger className="text-lg h-14">
                  <SelectValue placeholder="Selecione o método" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="terrestre">Terrestre</SelectItem>
                  <SelectItem value="aerea">Aérea</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="epocaAplicacao" className="text-lg font-medium">Época de Aplicação</Label>
              <Input
                id="epocaAplicacao"
                placeholder="Ex: Pré-emergência"
                value={localData.epocaAplicacao}
                onChange={(e) => handleInputChange('epocaAplicacao', e.target.value)}
                className="text-lg p-4 h-14"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes" className="text-lg font-medium">Observações</Label>
            <Textarea
              id="observacoes"
              placeholder="Orientações adicionais, condições climáticas, equipamentos de proteção..."
              value={localData.observacoes}
              onChange={(e) => handleInputChange('observacoes', e.target.value)}
              className="text-lg p-4 min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          onClick={onPrevious}
          variant="outline"
          size="lg"
          className="px-8 py-4 text-lg"
        >
          Voltar
        </Button>
        
        <Button
          onClick={handleNext}
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg"
        >
          Próxima Etapa: Assinatura Consultor
        </Button>
      </div>
    </div>
  );
};

export default ReceituarioStep;
