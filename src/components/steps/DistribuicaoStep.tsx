
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Download, QrCode, Send, CheckCircle, Users, Building, Shield } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface DistribuicaoStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  currentStep: number;
  totalSteps: number;
}

const DistribuicaoStep = ({ formData, updateFormData, onPrevious }: DistribuicaoStepProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDistributing, setIsDistributing] = useState(false);
  const [documentGenerated, setDocumentGenerated] = useState(false);
  const [distributionComplete, setDistributionComplete] = useState(false);

  const generateDocument = async () => {
    setIsGenerating(true);
    
    // Simular geração do PDF
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setDocumentGenerated(true);
    setIsGenerating(false);
    
    toast({
      title: "Documento gerado!",
      description: "PDF do receituário criado com marca d'água CONFORME.",
    });
  };

  const distributeToAll = async () => {
    setIsDistributing(true);
    
    // Simular distribuição
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    setDistributionComplete(true);
    setIsDistributing(false);
    
    toast({
      title: "Distribuição concluída!",
      description: "Todas as partes receberam suas cópias do receituário.",
    });
  };

  const recipients = [
    {
      name: 'Consultor Técnico',
      contact: formData.telefoneConsultor || 'Não informado',
      icon: Users,
      status: distributionComplete ? 'Enviado' : 'Pendente'
    },
    {
      name: 'Produtor Rural',
      contact: formData.telefoneProdutor || 'Não informado',
      icon: Users,
      status: distributionComplete ? 'Enviado' : 'Pendente'
    },
    {
      name: 'Aplicador',
      contact: 'A ser definido',
      icon: Users,
      status: distributionComplete ? 'Enviado' : 'Pendente'
    },
    {
      name: 'Vendedor',
      contact: 'A ser definido',
      icon: Building,
      status: distributionComplete ? 'Enviado' : 'Pendente'
    },
    {
      name: 'IAGRO - Fiscalização',
      contact: 'protocolo.iagro@ms.gov.br',
      icon: Shield,
      status: distributionComplete ? 'Enviado' : 'Pendente'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-4">Finalização e Distribuição</h2>
        <p className="text-lg text-gray-600">Geração do documento final e envio para todas as partes</p>
      </div>

      {/* Resumo Final */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-green-700">
            <CheckCircle className="h-6 w-6" />
            <span>Receituário Validado</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-800 mb-2">Informações Básicas</h4>
              <div className="space-y-1 text-sm">
                <p><strong>Produtor:</strong> {formData.nomeProdutor}</p>
                <p><strong>Consultor:</strong> {formData.nomeConsultor}</p>
                <p><strong>Cultura:</strong> {formData.cultura}</p>
                <p><strong>Produto:</strong> {formData.produto}</p>
                <p><strong>Área:</strong> {formData.areaTratar} ha</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-green-800 mb-2">Validação</h4>
              <div className="space-y-1 text-sm">
                <p><strong>Hash:</strong> {formData.receiptHash?.substring(0, 20)}...</p>
                <p><strong>Código:</strong> {formData.validationResults?.validationCode}</p>
                <p><strong>Data:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
                <p><strong>Status:</strong> <span className="text-green-600 font-medium">Válido</span></p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Geração do Documento */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-700">
            <FileText className="h-6 w-6" />
            <span>Documento Final</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {!documentGenerated && !isGenerating && (
            <div className="text-center">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <FileText className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  Gerar PDF Final
                </h3>
                <p className="text-blue-700 mb-4">
                  O documento será gerado com marca d'água CONFORME e QR code para validação
                </p>
                <ul className="text-blue-600 text-sm text-left max-w-md mx-auto">
                  <li>• Marca d'água de segurança CONFORME</li>
                  <li>• QR code com link para vídeo educativo</li>
                  <li>• Hash SHA-256 para verificação</li>
                  <li>• Assinaturas digitais incorporadas</li>
                </ul>
              </div>
              
              <Button
                onClick={generateDocument}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
              >
                <FileText className="mr-2 h-5 w-5" />
                Gerar Documento PDF
              </Button>
            </div>
          )}

          {isGenerating && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Gerando documento...</h3>
              <p className="text-gray-600">Criando PDF com marca d'água e QR code</p>
            </div>
          )}

          {documentGenerated && (
            <div className="text-center">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-green-700 mb-4">
                  Documento Gerado com Sucesso!
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center justify-center space-x-2 bg-white border border-green-300 rounded-lg p-4">
                    <Download className="h-6 w-6 text-green-600" />
                    <span className="font-medium">PDF Pronto</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 bg-white border border-green-300 rounded-lg p-4">
                    <QrCode className="h-6 w-6 text-green-600" />
                    <span className="font-medium">QR Code Incluído</span>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  className="text-green-600 border-green-600 hover:bg-green-50"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Baixar PDF
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Distribuição */}
      {documentGenerated && (
        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-purple-700">
              <Send className="h-6 w-6" />
              <span>Distribuição Automática</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {!distributionComplete && !isDistributing && (
              <div className="text-center mb-6">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
                  <Send className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-purple-800 mb-2">
                    Enviar para Todas as Partes
                  </h3>
                  <p className="text-purple-700">
                    O receituário será enviado automaticamente para todos os envolvidos
                  </p>
                </div>
                
                <Button
                  onClick={distributeToAll}
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Distribuir Agora
                </Button>
              </div>
            )}

            {isDistributing && (
              <div className="text-center mb-6">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Enviando...</h3>
                <p className="text-gray-600">Distribuindo cópias para todas as partes</p>
              </div>
            )}

            <div className="space-y-3">
              {recipients.map((recipient, index) => {
                const Icon = recipient.icon;
                return (
                  <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <div className={`p-2 rounded-full ${distributionComplete ? 'bg-green-100' : 'bg-gray-100'}`}>
                      <Icon className={`h-6 w-6 ${distributionComplete ? 'text-green-600' : 'text-gray-400'}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{recipient.name}</h4>
                      <p className="text-sm text-gray-600">{recipient.contact}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      recipient.status === 'Enviado' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {recipient.status}
                    </div>
                  </div>
                );
              })}
            </div>

            {distributionComplete && (
              <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  Processo Concluído!
                </h3>
                <p className="text-green-600 mb-4">
                  Receituário validado e distribuído com segurança digital
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Hash Final:</strong> {formData.receiptHash}</p>
                    <p><strong>Validação:</strong> {formData.validationResults?.validationCode}</p>
                  </div>
                  <div>
                    <p><strong>Timestamp:</strong> {new Date().toLocaleString('pt-BR')}</p>
                    <p><strong>Status:</strong> <span className="text-green-600">Processado</span></p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between">
        <Button
          onClick={onPrevious}
          variant="outline"
          size="lg"
          className="px-8 py-4 text-lg"
        >
          Voltar
        </Button>
        
        {distributionComplete && (
          <Button
            onClick={() => window.location.reload()}
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg"
          >
            <CheckCircle className="mr-2 h-5 w-5" />
            Novo Receituário
          </Button>
        )}
      </div>
    </div>
  );
};

export default DistribuicaoStep;
