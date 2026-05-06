import { useEffect, useMemo, useState } from 'react'
import type { Contractor, Document, OnboardingStep, PaymentMethod, PersonalData } from '@/shared/types'
import { StepContract } from './StepContract'
import { StepDocuments } from './StepDocuments'
import { StepPayment } from './StepPayment'
import { StepPersonalData } from './StepPersonalData'
import { StepVerification } from './StepVerification'
import { CheckCircle2, FileSignature, FileText, Shield, User, Wallet } from 'lucide-react'

const steps: { key: OnboardingStep; label: string; icon: React.ElementType }[] = [
  { key: 'personal-data', label: 'Datos personales', icon: User },
  { key: 'documents', label: 'Documentos', icon: FileText },
  { key: 'contract', label: 'Contrato', icon: FileSignature },
  { key: 'payment-method', label: 'Método de pago', icon: Wallet },
  { key: 'verification', label: 'Verificación', icon: Shield },
]

const normalizeCompletedSteps = (contractor: Contractor) => {
  const base = new Set<OnboardingStep>(contractor.completedSteps)

  if (contractor.personalData.firstName && contractor.personalData.lastName) {
    base.add('personal-data')
  }

  if (contractor.documents.length > 0) {
    base.add('documents')
  }

  if (contractor.contractSigned) {
    base.add('contract')
  }

  if (contractor.paymentMethod) {
    base.add('payment-method')
  }

  return Array.from(base)
}

interface OnboardingWizardProps {
  contractor: Contractor
}

export const OnboardingWizard = ({ contractor }: OnboardingWizardProps) => {
  const initialCompletedSteps = useMemo(() => normalizeCompletedSteps(contractor), [contractor])

  const [currentStep, setCurrentStep] = useState<OnboardingStep>(contractor.currentStep)
  const [completedSteps, setCompletedSteps] = useState<OnboardingStep[]>(initialCompletedSteps)
  const [personalData, setPersonalData] = useState<PersonalData>(contractor.personalData)
  const [documents, setDocuments] = useState<Document[]>(contractor.documents)
  const [contractSigned, setContractSigned] = useState(contractor.contractSigned)
  const [contractSignedAt, setContractSignedAt] = useState<Date | undefined>(contractor.contractSignedAt)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | undefined>(contractor.paymentMethod)

  useEffect(() => {
    setCurrentStep(contractor.currentStep)
    setCompletedSteps(normalizeCompletedSteps(contractor))
    setPersonalData(contractor.personalData)
    setDocuments(contractor.documents)
    setContractSigned(contractor.contractSigned)
    setContractSignedAt(contractor.contractSignedAt)
    setPaymentMethod(contractor.paymentMethod)
  }, [contractor])

  const currentStepIndex = steps.findIndex((step) => step.key === currentStep)

  const markStepCompleted = (step: OnboardingStep) => {
    setCompletedSteps((prev) => (prev.includes(step) ? prev : [...prev, step]))
  }

  const goToStep = (step: OnboardingStep) => {
    setCurrentStep(step)
  }

  const goToNextStep = () => {
    const nextStep = steps[currentStepIndex + 1]
    if (nextStep) {
      setCurrentStep(nextStep.key)
    }
  }

  const goToPreviousStep = () => {
    const previousStep = steps[currentStepIndex - 1]
    if (previousStep) {
      setCurrentStep(previousStep.key)
    }
  }

  const canNavigateToStep = (stepIndex: number) => {
    if (stepIndex === 0) {
      return true
    }

    const previousStep = steps[stepIndex - 1]
    return completedSteps.includes(previousStep.key)
  }

  const updateDocument = (newDocument: Document) => {
    setDocuments((prev) => {
      const filtered = prev.filter((item) => item.type !== newDocument.type)
      return [...filtered, newDocument]
    })
  }

  const removeDocument = (documentId: string) => {
    setDocuments((prev) => prev.filter((item) => item.id !== documentId))
  }

  const handleContractSign = () => {
    setContractSigned(true)
    setContractSignedAt(new Date())
    markStepCompleted('contract')
    goToNextStep()
  }

  const renderStep = () => {
    switch (currentStep) {
      case 'personal-data':
        return (
          <StepPersonalData
            initialData={personalData}
            onSubmit={(data) => {
              setPersonalData(data)
              markStepCompleted('personal-data')
              goToNextStep()
            }}
          />
        )
      case 'documents':
        return (
          <StepDocuments
            documents={documents}
            onAddDocument={updateDocument}
            onRemoveDocument={removeDocument}
            onNext={() => {
              markStepCompleted('documents')
              goToNextStep()
            }}
            onBack={goToPreviousStep}
          />
        )
      case 'contract':
        return (
          <StepContract
            contractorName={`${personalData.firstName} ${personalData.lastName}`.trim()}
            isAlreadySigned={contractSigned}
            signedAt={contractSignedAt}
            onNext={handleContractSign}
            onBack={goToPreviousStep}
          />
        )
      case 'payment-method':
        return (
          <StepPayment
            initialMethod={paymentMethod}
            onSubmit={(method) => {
              setPaymentMethod(method)
              markStepCompleted('payment-method')
              goToNextStep()
            }}
            onBack={goToPreviousStep}
          />
        )
      case 'verification':
        return (
          <StepVerification
            contractor={contractor}
            personalData={personalData}
            completedSteps={completedSteps}
            onBack={goToPreviousStep}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background rounded shadow">
      <header className="sticky top-0 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-xl font-bold text-primary">Onboarding de contratistas</h1>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-muted-foreground">
                Paso {currentStepIndex + 1} de {steps.length}
              </p>
              <p className="text-xs text-muted-foreground">Flujo visual listo para integración</p>
            </div>
          </div>
        </div>
      </header >

      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
            {steps.map((step, index) => {
              const isCompleted = completedSteps.includes(step.key)
              const isCurrent = currentStep === step.key
              const canNavigate = canNavigateToStep(index)
              const Icon = step.icon

              return (
                <button
                  key={step.key}
                  type="button"
                  onClick={() => canNavigate && goToStep(step.key)}
                  disabled={!canNavigate}
                  className={`group flex min-w-24 flex-col items-center gap-2 ${canNavigate ? 'cursor-pointer' : 'cursor-not-allowed'
                    }`}
                >
                  <div className="relative">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 ${isCompleted
                        ? 'bg-success text-success-foreground'
                        : isCurrent
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                        } ${canNavigate && !isCurrent ? 'group-hover:scale-110' : ''}`}
                    >
                      {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`absolute left-full top-1/2 h-0.5 w-8 -translate-y-1/2 md:w-14 ${completedSteps.includes(step.key) ? 'bg-success' : 'bg-border'
                          }`}
                      />
                    )}
                  </div>
                  <span
                    className={`text-center text-xs font-medium ${isCurrent ? 'text-primary' : 'text-muted-foreground'
                      }`}
                  >
                    {step.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-2xl px-4 py-8">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">{renderStep()}</div>
      </main>
    </div >
  )
}

export default OnboardingWizard