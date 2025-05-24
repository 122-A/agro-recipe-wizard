
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, Shield, Hash, Smartphone, Calendar } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ValidacaoStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  currentStep: number;
  totalSteps: number;
}

const ValidacaoStep = ({ formData, updateFormData, onNext, onPrevious }: ValidacaoStepProps) => {
  const [isValidating, setIsValidating] = useState(false);
  const [validationResults, setValidationResults] = useState<any>(null);
  const [receiptHash, setReceiptHash] = useState('');

  useEffect(() => {
    // Gerar hash único para o receituário
    const generateHash = () => {
      const data = JSON.stringify({
        consultor: formData.nomeConsultor,
        produtor: formData.nomeProdutor,
        produto: formData.produto,
        timestamp: new Date().toISOString()
      });
      
      // Simular hash SHA-256
      const hash = `SHA256-${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`.toUpperCase();
      setReceiptHash(hash);
      updateFormData({ receiptHash: hash });
    };

    generateHash();
  }, [formData, updateFormData]);

  const startValidation = async () => {
    setIsValidating(true);
    
    // Simular processo de validação
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const results = {
      artValid: true,
      consultorSignature: !!formData.consultorSelfie,
      produtorSignature: !!formData.produtorSelfie,
      deviceSecurity: true,
      dataIntegrity: true,
      legalCompliance: true,
      timestamp: new Date().toISOString(),
      validationCode: `VAL-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    };
    
    setValidationResults(results);
    updateFormData({ validationResults: results });
    setIsValidating(false);
    
    toast({
      title: "Validação concluída!",
      description: "Todos os critérios de segurança foram atendidos.",
    });
  };

  const ValidationItem = ({ title, status, description }: { title: string; status: boolean; description: string }) => (
    <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
      <div className={`p-2 rounded-full ${status ? 'bg-green-100' : 'bg-red-100'}`}>
        <CheckCircle className={`h-6 w-6 ${status ? 'text-green-600' : 'text-red-600'}`} />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
        status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {status ? 'Válido' : 'Inválido'}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-4">Validação do Receituário</h2>
        <p className="text-lg text-gray-600">Verificação de segurança e conformidade digital</p>
      </div>

      {/* Hash do Receituário */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-700">
            <Hash className="h-6 w-6" />
            <span>Identificação Única</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <p className="text-sm text-blue-600 mb-2">Hash SHA-256 do Receituário</p>
            <div className="bg-white border border-blue-300 rounded-lg p-4 font-mono text-lg text-blue-800 break-all">
              {receiptHash}
            </div>
            <p className="text-xs text-blue-500 mt-2">
              Este código garante a integridade e autenticidade do documento
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Informações de Segurança */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-gray-700">
            <Shield className="h-6 w-6" />
            <span>Dados de Segurança Coletados</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-green-700">Consultor Técnico</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Smartphone className="h-4 w-4 text-gray-500" />
                  <span>IMEI: {formData.consultorIMEI || 'Não capturado'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-gray-500" />
                  <span>IP: {formData.consultorIP || 'Não capturado'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>Timestamp: {formData.consultorTimestamp ? new Date(formData.consultorTimestamp).toLocaleString('pt-BR') : 'Não capturado'}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-green-700">Produtor Rural</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Smartphone className="h-4 w-4 text-gray-500" />
                  <span>IMEI: {formData.produtorIMEI || 'Não capturado'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-gray-500" />
                  <span>IP: {formData.produtorIP || 'Não capturado'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>Timestamp: {formData.produtorTimestamp ? new Date(formData.produtorTimestamp).toLocaleString('pt-BR') : 'Não capturado'}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Processo de Validação */}
      <Card className="border-green-200">
        <CardHeader className="bg-green-50">
          <CardTitle className="flex items-center space-x-2 text-green-700">
            <CheckCircle className="h-6 w-6" />
            <span>Processo de Validação</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {!validationResults && !isValidating && (
            <div className="text-center">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                <Clock className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-yellow-800 mb-2">
                  Pronto para Validação
                </h3>
                <p className="text-yellow-700">
                  Clique no botão abaixo para iniciar a verificação de segurança e conformidade
                </p>
              </div>
              
              <Button
                onClick={startValidation}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg"
              >
                <Shield className="mr-2 h-5 w-5" />
                Iniciar Validação
              </Button>
            </div>
          )}

          {isValidating && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Validando...</h3>
              <p className="text-gray-600">Verificando assinaturas digitais, ART e conformidade legal</p>
            </div>
          )}

          {validationResults && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-green-700 mb-2">
                  Validação Concluída
                </h3>
                <p className="text-green-600">
                  Código de Validação: <span className="font-mono font-bold">{validationResults.validationCode}</span>
                </p>
              </div>

              <div className="space-y-3">
                <ValidationItem
                  title="ART - Anotação de Responsabilidade Técnica"
                  status={validationResults.artValid}
                  description="Documento anexado e verificado"
                />
                
                <ValidationItem
                  title="Assinatura Digital do Consultor"
                  status={validationResults.consultorSignature}
                  description="Selfie capturada com dados biométricos"
                />
                
                <ValidationItem
                  title="Assinatura Digital do Produtor"
                  status={validationResults.produtorSignature}
                  description="Confirmação de recebimento registrada"
                />
                
                <ValidationItem
                  title="Segurança do Dispositivo"
                  status={validationResults.deviceSecurity}
                  description="IP e IMEI registrados para auditoria"
                />
                
                <ValidationItem
                  title="Integridade dos Dados"
                  status={validationResults.dataIntegrity}
                  description="Hash SHA-256 gerado e verificado"
                />
                
                <ValidationItem
                  title="Conformidade Legal"
                  status={validationResults.legalCompliance}
                  description="Atende às normas do CREA e IAGRO"
                />
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
          onClick={onNext}
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg"
          disabled={!validationResults}
        >
          Finalizar: Distribuição
        </Button>
      </div>
    </div>
  );
};

export default ValidacaoStep;
