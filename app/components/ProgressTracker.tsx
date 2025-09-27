'use client';
import { useState, useEffect } from 'react';
import { CheckCircle, Circle, Loader2 } from 'lucide-react';

interface ProgressStep {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

interface ProgressTrackerProps {
  variant?: 'videoGeneration';
  steps?: ProgressStep[];
}

const defaultSteps: ProgressStep[] = [
  { id: 'template', name: 'Template Processing', status: 'pending' },
  { id: 'assets', name: 'Media Asset Loading', status: 'pending' },
  { id: 'generation', name: 'Video Generation', status: 'pending' },
  { id: 'rendering', name: 'Final Rendering', status: 'pending' },
  { id: 'upload', name: 'IPFS Upload', status: 'pending' },
  { id: 'blockchain', name: 'Blockchain Registration', status: 'pending' }
];

export function ProgressTracker({ variant = 'videoGeneration', steps = defaultSteps }: ProgressTrackerProps) {
  const [currentSteps, setCurrentSteps] = useState<ProgressStep[]>(steps);
  const [isProcessing, setIsProcessing] = useState(false);

  const startProcessing = () => {
    setIsProcessing(true);
    let stepIndex = 0;

    const processStep = () => {
      if (stepIndex < currentSteps.length) {
        setCurrentSteps(prev => prev.map((step, index) => {
          if (index === stepIndex) {
            return { ...step, status: 'processing' };
          }
          return step;
        }));

        // Simulate processing time
        setTimeout(() => {
          setCurrentSteps(prev => prev.map((step, index) => {
            if (index === stepIndex) {
              return { ...step, status: 'completed' };
            }
            return step;
          }));

          stepIndex++;
          if (stepIndex < currentSteps.length) {
            setTimeout(processStep, 500);
          } else {
            setIsProcessing(false);
          }
        }, Math.random() * 2000 + 1000);
      }
    };

    processStep();
  };

  const getStepIcon = (status: ProgressStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-accent" />;
      case 'processing':
        return <Loader2 className="w-5 h-5 text-accent animate-spin" />;
      case 'failed':
        return <Circle className="w-5 h-5 text-red-500" />;
      default:
        return <Circle className="w-5 h-5 text-text-secondary" />;
    }
  };

  const completedSteps = currentSteps.filter(step => step.status === 'completed').length;
  const progressPercentage = (completedSteps / currentSteps.length) * 100;

  return (
    <div className="cyber-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold neon-text">Video Generation Progress</h3>
        <div className="text-sm text-text-secondary">
          {completedSteps}/{currentSteps.length} Complete
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar h-2 mb-6">
        <div 
          className="progress-fill h-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {currentSteps.map((step, index) => (
          <div key={step.id} className="flex items-center space-x-3">
            {getStepIcon(step.status)}
            <span className={`flex-1 ${
              step.status === 'completed' ? 'text-fg' : 
              step.status === 'processing' ? 'text-accent' : 
              'text-text-secondary'
            }`}>
              {step.name}
            </span>
            {step.status === 'processing' && (
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-accent rounded-full animate-pulse"></div>
                <div className="w-1 h-1 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1 h-1 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {!isProcessing && completedSteps === 0 && (
        <button 
          onClick={startProcessing}
          className="btn-primary w-full mt-6"
        >
          Start Generation
        </button>
      )}

      {completedSteps === currentSteps.length && (
        <div className="mt-6 p-4 bg-accent bg-opacity-20 cyber-border">
          <p className="text-accent font-medium text-center">
            🎉 Video generation completed successfully!
          </p>
        </div>
      )}
    </div>
  );
}
