
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Upload, CheckCircle, Users, Smartphone, Shield } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface AssinaturaProdutorStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  currentStep: number;
  totalSteps: number;
}

const AssinaturaProdutorStep = ({ formData, updateFormData, onNext, onPrevious }: AssinaturaProdutorStepProps) => {
  const [selfie, setSelfie] = useState<string | null>(formData.produtorSelfie || null);
  const [deviceInfo, setDeviceInfo] = useState({
    ip: formData.produtorIP || '192.168.1.101',
    imei: formData.produtorIMEI || 'IMEI-987654321098765',
    timestamp: formData.produtorTimestamp || new Date().toISOString()
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const captureDeviceInfo = () => {
    // Simular captura de informações do dispositivo
    const info = {
      ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
      imei: `IMEI-${Math.random().toString().substr(2, 15)}`,
      timestamp: new Date().toISOString()
    };
    setDeviceInfo(info);
    updateFormData({
      produtorIP: info.ip,
      produtorIMEI: info.imei,
      produtorTimestamp: info.timestamp
    });
  };

  const startCamera = async () => {
    try {
      setIsCapturing(true);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' },
        audio: false 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      toast({
        title: "Erro ao acessar câmera",
        description: "Não foi possível acessar a câmera. Verifique as permissões.",
        variant: "destructive",
      });
      setIsCapturing(false);
    }
  };

  const captureSelfie = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        
        setSelfie(imageData);
        updateFormData({ produtorSelfie: imageData });
        
        // Parar o stream da câmera
        const stream = videoRef.current.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        setIsCapturing(false);
        
        // Capturar informações do dispositivo automaticamente
        captureDeviceInfo();
        
        toast({
          title: "Selfie capturada!",
          description: "Assinatura digital do produtor registrada com sucesso.",
        });
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setSelfie(imageData);
        updateFormData({ produtorSelfie: imageData });
        captureDeviceInfo();
        
        toast({
          title: "Selfie enviada!",
          description: "Assinatura digital do produtor registrada com sucesso.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (!selfie) {
      toast({
        title: "Selfie obrigatória",
        description: "É necessário capturar a selfie do produtor para continuar.",
        variant: "destructive",
      });
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-4">Assinatura Digital - Produtor</h2>
        <p className="text-lg text-gray-600">Capture sua selfie para confirmar o recebimento do receituário</p>
      </div>

      {/* Informações de Segurança */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-700">
            <Shield className="h-6 w-6" />
            <span>Segurança Digital</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <Smartphone className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-medium">IMEI do Dispositivo</p>
              <p className="text-blue-600">{deviceInfo.imei}</p>
            </div>
            <div className="text-center">
              <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-medium">IP de Acesso</p>
              <p className="text-blue-600">{deviceInfo.ip}</p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-medium">Timestamp</p>
              <p className="text-blue-600">{new Date(deviceInfo.timestamp).toLocaleString('pt-BR')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resumo do Receituário */}
      <Card className="border-gray-200 bg-gray-50">
        <CardHeader>
          <CardTitle className="text-gray-700">Resumo do Receituário</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Cultura:</strong> {formData.cultura || 'Não informado'}</p>
              <p><strong>Produto:</strong> {formData.produto || 'Não informado'}</p>
              <p><strong>Área:</strong> {formData.areaTratar || 'Não informado'} ha</p>
            </div>
            <div>
              <p><strong>Consultor:</strong> {formData.nomeConsultor || 'Não informado'}</p>
              <p><strong>CREA:</strong> {formData.numeroRegistro || 'Não informado'}</p>
              <p><strong>Dose:</strong> {formData.dose || 'Não informado'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Captura de Selfie */}
      <Card className="border-green-200">
        <CardHeader className="bg-green-50">
          <CardTitle className="flex items-center space-x-2 text-green-700">
            <Users className="h-6 w-6" />
            <span>Confirmação do Produtor - {formData.nomeProdutor || 'Produtor'}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {!selfie ? (
            <div className="space-y-6">
              {isCapturing ? (
                <div className="text-center">
                  <video
                    ref={videoRef}
                    className="w-full max-w-md mx-auto rounded-lg border-4 border-green-300"
                    autoPlay
                    playsInline
                    muted
                  />
                  <div className="mt-4 space-x-4">
                    <Button
                      onClick={captureSelfie}
                      size="lg"
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg"
                    >
                      <Camera className="mr-2 h-5 w-5" />
                      Capturar Selfie
                    </Button>
                    <Button
                      onClick={() => {
                        setIsCapturing(false);
                        if (videoRef.current?.srcObject) {
                          const stream = videoRef.current.srcObject as MediaStream;
                          stream.getTracks().forEach(track => track.stop());
                        }
                      }}
                      variant="outline"
                      size="lg"
                      className="px-8 py-4 text-lg"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <div className="border-2 border-dashed border-green-300 rounded-lg p-12">
                    <Camera className="h-16 w-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                      Confirmação do Produtor
                    </h3>
                    <p className="text-gray-500 mb-6 text-lg">
                      Capture uma selfie para confirmar o recebimento e concordância com o receituário
                    </p>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                      <p className="text-yellow-800 font-medium">
                        ⚠️ Ao capturar sua selfie, você confirma que:
                      </p>
                      <ul className="text-yellow-700 text-sm mt-2 text-left max-w-md mx-auto">
                        <li>• Recebeu e leu o receituário agronômico</li>
                        <li>• Concorda com as recomendações técnicas</li>
                        <li>• Seguirá todas as orientações de aplicação</li>
                        <li>• Utilizará os EPIs recomendados</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <Button
                        onClick={startCamera}
                        size="lg"
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg"
                      >
                        <Camera className="mr-2 h-5 w-5" />
                        Abrir Câmera
                      </Button>
                      
                      <div className="text-gray-400">ou</div>
                      
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="produtor-selfie-upload"
                      />
                      
                      <label htmlFor="produtor-selfie-upload">
                        <Button
                          type="button"
                          variant="outline"
                          size="lg"
                          className="px-8 py-4 text-lg cursor-pointer"
                          asChild
                        >
                          <span>
                            <Upload className="mr-2 h-5 w-5" />
                            Enviar da Galeria
                          </span>
                        </Button>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-green-700 mb-4">
                  Confirmação Registrada!
                </h3>
                
                <div className="max-w-sm mx-auto mb-6">
                  <img
                    src={selfie}
                    alt="Selfie do produtor"
                    className="w-full rounded-lg border-2 border-green-300"
                  />
                </div>
                
                <p className="text-green-600 text-lg mb-4">
                  {formData.nomeProdutor} - CPF: {formData.cpfProdutor}
                </p>
                
                <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-4">
                  <p className="text-green-800 font-medium">
                    ✅ Receituário confirmado e aceito pelo produtor
                  </p>
                </div>
                
                <Button
                  onClick={() => {
                    setSelfie(null);
                    updateFormData({ produtorSelfie: null });
                  }}
                  variant="outline"
                  className="text-green-600 border-green-600 hover:bg-green-50"
                >
                  Capturar Nova Selfie
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
          disabled={!selfie}
        >
          Próxima Etapa: Validação
        </Button>
      </div>
    </div>
  );
};

export default AssinaturaProdutorStep;
