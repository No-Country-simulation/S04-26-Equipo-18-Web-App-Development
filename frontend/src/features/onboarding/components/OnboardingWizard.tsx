import { useMemo, useState } from 'react'
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
  onContractorUpdate?: (updates: Partial<Contractor>) => Promise<void> | void
}

export const OnboardingWizard = ({ contractor, onContractorUpdate }: OnboardingWizardProps) => {
  const initialCompletedSteps = useMemo(() => normalizeCompletedSteps(contractor), [contractor])

  const [currentStep, setCurrentStep] = useState<OnboardingStep>(contractor.currentStep)
  const [completedSteps, setCompletedSteps] = useState<OnboardingStep[]>(initialCompletedSteps)
  const [personalData, setPersonalData] = useState<PersonalData>(contractor.personalData)
  const [documents, setDocuments] = useState<Document[]>(contractor.documents)
  const [contractSigned, setContractSigned] = useState(contractor.contractSigned)
  const [contractSignedAt, setContractSignedAt] = useState<Date | undefined>(contractor.contractSignedAt)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | undefined>(contractor.paymentMethod)
  

  const currentStepIndex = steps.findIndex((step) => step.key === currentStep)

  const persistContractor = (updates: Partial<Contractor>) => {
    if (!onContractorUpdate) {
      return
    }

    void onContractorUpdate({ ...updates, lastUpdatedAt: new Date() })
  }

  const withCompletedStep = (step: OnboardingStep, current = completedSteps) =>
    current.includes(step) ? current : [...current, step]

  const goToStep = (step: OnboardingStep) => {
    setCurrentStep(step)
    persistContractor({ currentStep: step })
  }

  const goToPreviousStep = () => {
    const previousStep = steps[currentStepIndex - 1]
    if (previousStep) {
      setCurrentStep(previousStep.key)
      persistContractor({ currentStep: previousStep.key })
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
      const nextDocuments = [...filtered, newDocument]
      persistContractor({ documents: nextDocuments, status: 'in-progress' })
      return nextDocuments
    })
  }

  const removeDocument = (documentId: string) => {
    setDocuments((prev) => {
      const nextDocuments = prev.filter((item) => item.id !== documentId)
      persistContractor({ documents: nextDocuments, status: 'in-progress' })
      return nextDocuments
    })
  }

  const handleContractSign = () => {
    const nextCompleted = withCompletedStep('contract')
    const nextStep: OnboardingStep = 'payment-method'

    setContractSigned(true)
    setContractSignedAt(new Date())
    setCompletedSteps(nextCompleted)
    setCurrentStep(nextStep)

    persistContractor({
      contractSigned: true,
      contractSignedAt: new Date(),
      completedSteps: nextCompleted,
      currentStep: nextStep,
      status: 'in-progress',
    })
  }

  const renderStep = () => {
    switch (currentStep) {
      case 'personal-data':
        return (
          <StepPersonalData
            initialData={personalData}
            onSubmit={(data) => {
              const nextCompleted = withCompletedStep('personal-data')
              const nextStep: OnboardingStep = 'documents'

              setPersonalData(data)
              setCompletedSteps(nextCompleted)
              setCurrentStep(nextStep)

              persistContractor({
                personalData: data,
                completedSteps: nextCompleted,
                currentStep: nextStep,
                status: 'in-progress',
              })
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
              const nextCompleted = withCompletedStep('documents')
              const nextStep: OnboardingStep = 'contract'

              setCompletedSteps(nextCompleted)
              setCurrentStep(nextStep)

              persistContractor({
                documents,
                completedSteps: nextCompleted,
                currentStep: nextStep,
                status: 'in-progress',
              })
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
              const nextCompleted = withCompletedStep('payment-method')
              const nextStep: OnboardingStep = 'verification'

              setPaymentMethod(method)
              setCompletedSteps(nextCompleted)
              setCurrentStep(nextStep)

              persistContractor({
                paymentMethod: method,
                completedSteps: nextCompleted,
                currentStep: nextStep,
                status: 'pending-verification',
              })
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
          <div className="flex items-center justify-between gap-3 text-center w-full">
            <div className="flex items-center gap-3 py-4 w-full text-center justify-center">
              <div>
                <h1 className="text-xl md:text-4xl font-bold text-primary">Onboarding</h1>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  Paso {currentStepIndex + 1} de {steps.length}
                </p>
              </div>
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