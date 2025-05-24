
import React from 'react';
import { Check, FileText, Shield, PenTool, Users, CheckCircle, Send } from 'lucide-react';

const ProgressSteps = ({ currentStep, totalSteps, steps }: { 
  currentStep: number; 
  totalSteps: number; 
  steps: Array<{ id: number; name: string; component: any }>;
}) => {
  const getStepIcon = (stepId: number) => {
    const icons = {
      1: FileText,
      2: Shield,
      3: FileText,
      4: PenTool,
      5: Users,
      6: CheckCircle,
      7: Send
    };
    return icons[stepId as keyof typeof icons] || FileText;
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => {
          const Icon = getStepIcon(step.id);
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
                    isCompleted
                      ? 'bg-green-600 border-green-600 text-white'
                      : isActive
                      ? 'bg-green-100 border-green-600 text-green-600'
                      : 'bg-gray-100 border-gray-300 text-gray-400'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-8 h-8" />
                  ) : (
                    <Icon className="w-8 h-8" />
                  )}
                </div>
                <span
                  className={`mt-2 text-sm font-medium text-center px-2 ${
                    isActive ? 'text-green-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                  }`}
                >
                  {step.name}
                </span>
              </div>
              {!isLast && (
                <div
                  className={`flex-1 h-2 mx-4 rounded-full transition-all duration-300 ${
                    isCompleted ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressSteps;
