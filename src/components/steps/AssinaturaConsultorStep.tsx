
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Upload, CheckCircle, PenTool, Smartphone, Shield } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface AssinaturaConsultorStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  currentStep: number;
  totalSteps: number;
}

const AssinaturaConsultorStep = ({ formData, updateFormData, onNext, onPrevious }: AssinaturaConsultorStepProps) => {
  const [selfie, setSelfie] = useState<string | null>(formData.consultorSelfie || null);
  const [deviceInfo, setDeviceInfo] = useState({
    ip: formData.consultorIP || '192.168.1.100',
    imei: formData.consultorIMEI || 'IMEI-123456789012345',
    timestamp: formData.consultorTimestamp || new Date().toISOString()
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
      consultorIP: info.ip,
      consultorIMEI: info.imei,
      consultorTimestamp: info.timestamp
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
        updateFormData({ consultorSelfie: imageData });
        
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
          description: "Assinatura digital do consultor registrada com sucesso.",
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
        updateFormData({ consultorSelfie: imageData });
        captureDeviceInfo();
        
        toast({
          title: "Selfie enviada!",
          description: "Assinatura digital do consultor registrada com sucesso.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (!selfie) {
      toast({
        title: "Selfie obrigatória",
        description: "É necessário capturar a selfie do consultor para continuar.",
        variant: "destructive",
      });
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-4">Assinatura Digital - Consultor</h2>
        <p className="text-lg text-gray-600">Capture sua selfie para validar digitalmente o receituário</p>
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

      {/* Captura de Selfie */}
      <Card className="border-green-200">
        <CardHeader className="bg-green-50">
          <CardTitle className="flex items-center space-x-2 text-green-700">
            <PenTool className="h-6 w-6" />
            <span>Captura de Selfie - {formData.nomeConsultor || 'Consultor'}</span>
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
                      Assinatura Digital do Consultor
                    </h3>
                    <p className="text-gray-500 mb-6 text-lg">
                      Capture uma selfie para validar digitalmente sua responsabilidade técnica
                    </p>
                    
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
                        id="selfie-upload"
                      />
                      
                      <label htmlFor="selfie-upload">
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
                  Assinatura Digital Capturada!
                </h3>
                
                <div className="max-w-sm mx-auto mb-6">
                  <img
                    src={selfie}
                    alt="Selfie do consultor"
                    className="w-full rounded-lg border-2 border-green-300"
                  />
                </div>
                
                <p className="text-green-600 text-lg mb-4">
                  {formData.nomeConsultor} - CREA: {formData.numeroRegistro}
                </p>
                
                <Button
                  onClick={() => {
                    setSelfie(null);
                    updateFormData({ consultorSelfie: null });
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
          Próxima Etapa: Assinatura Produtor
        </Button>
      </div>
    </div>
  );
};

export default AssinaturaConsultorStep;
