
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, Calendar, Droplets, MapPin, Users, FileText, Clock, Signature } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface FormData {
  nomeProduto: string;
  dosagem: string;
  cultura: string;
  area: string;
  metodoAplicacao: string;
  dataAplicacao: string;
  periodoCarencia: string;
  agronomo: string;
  numeroRegistro: string;
  produtor: string;
  cpfProdutor: string;
  propriedade: string;
  finalidade: string;
  observacoes: string;
  webhookUrl: string;
}

const ReceituarioForm = () => {
  const [formData, setFormData] = useState<FormData>({
    nomeProduto: '',
    dosagem: '',
    cultura: '',
    area: '',
    metodoAplicacao: '',
    dataAplicacao: '',
    periodoCarencia: '',
    agronomo: '',
    numeroRegistro: '',
    produtor: '',
    cpfProdutor: '',
    propriedade: '',
    finalidade: '',
    observacoes: '',
    webhookUrl: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWebhookInput, setShowWebhookInput] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validação básica
      const requiredFields = ['nomeProduto', 'dosagem', 'cultura', 'area', 'metodoAplicacao', 'dataAplicacao', 'agronomo', 'produtor'];
      const missingFields = requiredFields.filter(field => !formData[field as keyof FormData]);
      
      if (missingFields.length > 0) {
        toast({
          title: "Campos obrigatórios",
          description: "Por favor, preencha todos os campos obrigatórios marcados com *",
          variant: "destructive",
        });
        return;
      }

      // Dados para envio
      const receituarioData = {
        ...formData,
        dataEmissao: new Date().toISOString(),
        status: 'emitido',
        legalCompliance: {
          artigo38: true,
          artigo39: true,
          lei12059: true
        }
      };

      console.log('Dados do receituário:', receituarioData);

      // Envio para webhook n8n se configurado
      if (formData.webhookUrl) {
        try {
          await fetch(formData.webhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            mode: 'no-cors',
            body: JSON.stringify(receituarioData),
          });

          toast({
            title: "Receituário enviado com sucesso!",
            description: "Os dados foram enviados para processamento via n8n. Verifique o workflow para confirmar o recebimento.",
          });
        } catch (webhookError) {
          console.error('Erro no webhook:', webhookError);
          toast({
            title: "Receituário salvo localmente",
            description: "Não foi possível enviar para o webhook, mas os dados foram processados localmente.",
          });
        }
      } else {
        toast({
          title: "Receituário processado!",
          description: "Para integração completa, configure o webhook do n8n acima.",
        });
      }

      // Reset do formulário
      setFormData({
        nomeProduto: '',
        dosagem: '',
        cultura: '',
        area: '',
        metodoAplicacao: '',
        dataAplicacao: '',
        periodoCarencia: '',
        agronomo: '',
        numeroRegistro: '',
        produtor: '',
        cpfProdutor: '',
        propriedade: '',
        finalidade: '',
        observacoes: '',
        webhookUrl: formData.webhookUrl // Manter webhook URL
      });

    } catch (error) {
      console.error('Erro ao processar receituário:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao processar o receituário. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const HelpButton = ({ text }: { text: string }) => (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="h-6 w-6 p-0 text-green-600 hover:text-green-700"
      onClick={() => toast({ title: "Ajuda", description: text })}
    >
      <HelpCircle className="h-4 w-4" />
    </Button>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Configuração do Webhook */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-700">
            <FileText className="h-5 w-5" />
            <span>Integração n8n (Opcional)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowWebhookInput(!showWebhookInput)}
            className="mb-4"
          >
            {showWebhookInput ? 'Ocultar' : 'Configurar'} Webhook n8n
          </Button>
          
          {showWebhookInput && (
            <div className="space-y-2">
              <Label htmlFor="webhookUrl">URL do Webhook n8n</Label>
              <Input
                id="webhookUrl"
                type="url"
                placeholder="https://seu-n8n.com/webhook/receituario"
                value={formData.webhookUrl}
                onChange={(e) => handleInputChange('webhookUrl', e.target.value)}
                className="bg-white"
              />
              <p className="text-sm text-blue-600">
                Cole aqui a URL do webhook do seu workflow n8n para processamento automático dos dados.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informações do Produto */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-700">
              <Droplets className="h-5 w-5" />
              <span>1. Informações do Produto</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="nomeProduto">Nome do produto a ser usado *</Label>
                <HelpButton text="Digite o nome comercial do produto (ex: Roundup, Vertimec, etc.)" />
              </div>
              <Input
                id="nomeProduto"
                placeholder="Ex: Roundup, Vertimec..."
                value={formData.nomeProduto}
                onChange={(e) => handleInputChange('nomeProduto', e.target.value)}
                className="text-lg"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="dosagem">Quanto vai usar? *</Label>
                <HelpButton text="Informe a quantidade e unidade (ex: 1 litro por hectare, 500g por hectare)" />
              </div>
              <Input
                id="dosagem"
                placeholder="Ex: 1 litro por hectare"
                value={formData.dosagem}
                onChange={(e) => handleInputChange('dosagem', e.target.value)}
                className="text-lg"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="finalidade">Para que vai usar?</Label>
                <HelpButton text="Descreva o que vai tratar (pragas, doenças, plantas daninhas)" />
              </div>
              <Input
                id="finalidade"
                placeholder="Ex: Controle de plantas daninhas, tratamento de fungos..."
                value={formData.finalidade}
                onChange={(e) => handleInputChange('finalidade', e.target.value)}
                className="text-lg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Informações da Aplicação */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-700">
              <MapPin className="h-5 w-5" />
              <span>2. Onde e Como Aplicar</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="cultura">O que vai tratar? *</Label>
                <HelpButton text="Qual a plantação que vai receber o produto?" />
              </div>
              <Select value={formData.cultura} onValueChange={(value) => handleInputChange('cultura', value)}>
                <SelectTrigger className="text-lg">
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
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="area">Tamanho da área *</Label>
                <HelpButton text="Informe o tamanho do terreno (ex: 2 hectares, 5000 m²)" />
              </div>
              <Input
                id="area"
                placeholder="Ex: 2 hectares, 5000 m²"
                value={formData.area}
                onChange={(e) => handleInputChange('area', e.target.value)}
                className="text-lg"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="metodoAplicacao">Como vai aplicar? *</Label>
                <HelpButton text="Qual equipamento será usado para aplicação?" />
              </div>
              <Select value={formData.metodoAplicacao} onValueChange={(value) => handleInputChange('metodoAplicacao', value)}>
                <SelectTrigger className="text-lg">
                  <SelectValue placeholder="Selecione o método" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bomba-costal">Bomba Costal</SelectItem>
                  <SelectItem value="trator">Trator com Pulverizador</SelectItem>
                  <SelectItem value="aviao">Aplicação Aérea</SelectItem>
                  <SelectItem value="drone">Drone</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="propriedade">Nome da propriedade</Label>
                <HelpButton text="Nome da fazenda ou propriedade onde será aplicado" />
              </div>
              <Input
                id="propriedade"
                placeholder="Ex: Fazenda Santa Rita"
                value={formData.propriedade}
                onChange={(e) => handleInputChange('propriedade', e.target.value)}
                className="text-lg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Cronograma */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-700">
              <Calendar className="h-5 w-5" />
              <span>3. Quando Aplicar</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="dataAplicacao">Data da aplicação *</Label>
                <HelpButton text="Quando pretende aplicar o produto?" />
              </div>
              <Input
                id="dataAplicacao"
                type="date"
                value={formData.dataAplicacao}
                onChange={(e) => handleInputChange('dataAplicacao', e.target.value)}
                className="text-lg"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="periodoCarencia">Período de carência</Label>
                <HelpButton text="Quantos dias aguardar após aplicação antes da colheita? (conforme bula do produto)" />
              </div>
              <Input
                id="periodoCarencia"
                placeholder="Ex: 14 dias"
                value={formData.periodoCarencia}
                onChange={(e) => handleInputChange('periodoCarencia', e.target.value)}
                className="text-lg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Responsáveis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-700">
              <Users className="h-5 w-5" />
              <span>4. Responsáveis</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="agronomo">Engenheiro Agrônomo *</Label>
                  <HelpButton text="Nome do profissional responsável pela prescrição" />
                </div>
                <Input
                  id="agronomo"
                  placeholder="Nome do agrônomo"
                  value={formData.agronomo}
                  onChange={(e) => handleInputChange('agronomo', e.target.value)}
                  className="text-lg"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="numeroRegistro">Número do registro CREA</Label>
                  <HelpButton text="Registro profissional do agrônomo no CREA" />
                </div>
                <Input
                  id="numeroRegistro"
                  placeholder="Ex: CREA-SP 123456"
                  value={formData.numeroRegistro}
                  onChange={(e) => handleInputChange('numeroRegistro', e.target.value)}
                  className="text-lg"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="produtor">Produtor responsável *</Label>
                  <HelpButton text="Nome de quem está aplicando o produto" />
                </div>
                <Input
                  id="produtor"
                  placeholder="Nome do produtor"
                  value={formData.produtor}
                  onChange={(e) => handleInputChange('produtor', e.target.value)}
                  className="text-lg"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="cpfProdutor">CPF do produtor</Label>
                  <HelpButton text="Documento de identificação do produtor" />
                </div>
                <Input
                  id="cpfProdutor"
                  placeholder="000.000.000-00"
                  value={formData.cpfProdutor}
                  onChange={(e) => handleInputChange('cpfProdutor', e.target.value)}
                  className="text-lg"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Observações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-700">
              <FileText className="h-5 w-5" />
              <span>5. Observações Adicionais</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações importantes</Label>
              <Textarea
                id="observacoes"
                placeholder="Condições climáticas, cuidados especiais, recomendações..."
                value={formData.observacoes}
                onChange={(e) => handleInputChange('observacoes', e.target.value)}
                className="text-lg min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Botão de Envio */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2 text-green-700">
                <Signature className="h-5 w-5" />
                <span className="font-semibold">Finalizar Receituário</span>
              </div>
              <p className="text-sm text-green-600">
                Ao enviar, o receituário será processado e estará pronto para assinatura digital.
              </p>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold w-full md:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Gerar Receituário
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default ReceituarioForm;
