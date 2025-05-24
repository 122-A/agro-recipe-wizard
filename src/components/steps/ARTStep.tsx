
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, CheckCircle, AlertCircle, Volume2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ARTStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  currentStep: number;
  totalSteps: number;
}

const ARTStep = ({ formData, updateFormData, onNext, onPrevious }: ARTStepProps) => {
  const [artFile, setArtFile] = useState<File | null>(formData.artFile || null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "Arquivo muito grande",
          description: "O arquivo da ART deve ter no máximo 10MB.",
          variant: "destructive",
        });
        return;
      }

      if (!file.type.includes('pdf') && !file.type.includes('image')) {
        toast({
          title: "Formato inválido",
          description: "Envie apenas arquivos PDF ou imagens (JPG, PNG).",
          variant: "destructive",
        });
        return;
      }

      setIsUploading(true);
      
      // Simular upload
      setTimeout(() => {
        setArtFile(file);
        updateFormData({ artFile: file });
        setIsUploading(false);
        
        toast({
          title: "ART enviada com sucesso!",
          description: "O arquivo foi carregado e está pronto para validação.",
        });
      }, 2000);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      speechSynthesis.speak(utterance);
    }
  };

  const handleNext = () => {
    if (!artFile) {
      toast({
        title: "ART obrigatória",
        description: "É necessário fazer o upload da ART para continuar.",
        variant: "destructive",
      });
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-4">Upload da ART</h2>
        <p className="text-lg text-gray-600">Anexe a Anotação de Responsabilidade Técnica para habilitar a emissão do receituário</p>
      </div>

      {/* Informações sobre ART */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-700">
            <AlertCircle className="h-6 w-6" />
            <span>O que é ART?</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => speakText('A ART é a Anotação de Responsabilidade Técnica, um documento obrigatório que comprova que um profissional habilitado está responsável pelo trabalho técnico')}
              className="ml-auto"
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-700 text-lg">
            A ART é a Anotação de Responsabilidade Técnica, um documento obrigatório que comprova 
            que um profissional habilitado está responsável pelo trabalho técnico.
          </p>
          <ul className="mt-4 space-y-2 text-blue-600">
            <li>• Deve ser emitida pelo CREA do estado</li>
            <li>• Precisa estar quitada e válida</li>
            <li>• Formato aceito: PDF ou imagem (JPG, PNG)</li>
            <li>• Tamanho máximo: 10MB</li>
          </ul>
        </CardContent>
      </Card>

      {/* Upload da ART */}
      <Card className="border-green-200">
        <CardHeader className="bg-green-50">
          <CardTitle className="flex items-center space-x-2 text-green-700">
            <FileText className="h-6 w-6" />
            <span>Upload da ART</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {!artFile ? (
            <div className="border-2 border-dashed border-green-300 rounded-lg p-12 text-center">
              <Upload className="h-16 w-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                Faça o upload da sua ART
              </h3>
              <p className="text-gray-500 mb-6 text-lg">
                Arraste o arquivo aqui ou clique para selecionar
              </p>
              
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
                id="art-upload"
                disabled={isUploading}
              />
              
              <label htmlFor="art-upload">
                <Button
                  type="button"
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg cursor-pointer"
                  disabled={isUploading}
                  asChild
                >
                  <span>
                    {isUploading ? 'Enviando...' : 'Selecionar Arquivo'}
                  </span>
                </Button>
              </label>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center space-x-4">
                <CheckCircle className="h-12 w-12 text-green-600" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-green-700">ART enviada com sucesso!</h3>
                  <p className="text-green-600 text-lg">{artFile.name}</p>
                  <p className="text-sm text-green-500">
                    Tamanho: {(artFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setArtFile(null);
                    updateFormData({ artFile: null });
                  }}
                  className="text-green-600 border-green-600 hover:bg-green-50"
                >
                  Trocar Arquivo
                </Button>
              </div>
            </div>
          )}
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
          disabled={!artFile}
        >
          Próxima Etapa: Receituário
        </Button>
      </div>
    </div>
  );
};

export default ARTStep;
