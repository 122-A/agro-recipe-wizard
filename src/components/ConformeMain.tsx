
import React, { useState } from 'react';
import ProgressSteps from '@/components/ProgressSteps';
import FormularioStep from '@/components/steps/FormularioStep';
import ARTStep from '@/components/steps/ARTStep';
import ReceituarioStep from '@/components/steps/ReceituarioStep';
import AssinaturaConsultorStep from '@/components/steps/AssinaturaConsultorStep';
import AssinaturaProdutorStep from '@/components/steps/AssinaturaProdutorStep';
import ValidacaoStep from '@/components/steps/ValidacaoStep';
import DistribuicaoStep from '@/components/steps/DistribuicaoStep';

const ConformeMain = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const steps = [
    { id: 1, name: 'Formulário', component: FormularioStep },
    { id: 2, name: 'ART', component: ARTStep },
    { id: 3, name: 'Receituário', component: ReceituarioStep },
    { id: 4, name: 'Assinatura Consultor', component: AssinaturaConsultorStep },
    { id: 5, name: 'Assinatura Produtor', component: AssinaturaProdutorStep },
    { id: 6, name: 'Validação', component: ValidacaoStep },
    { id: 7, name: 'Distribuição', component: DistribuicaoStep }
  ];

  const CurrentStepComponent = steps.find(step => step.id === currentStep)?.component;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (newData: any) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  return (
    <main className="py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <ProgressSteps currentStep={currentStep} totalSteps={steps.length} steps={steps} />
        
        <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          {CurrentStepComponent && (
            <CurrentStepComponent
              formData={formData}
              updateFormData={updateFormData}
              onNext={handleNext}
              onPrevious={handlePrevious}
              currentStep={currentStep}
              totalSteps={steps.length}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default ConformeMain;
