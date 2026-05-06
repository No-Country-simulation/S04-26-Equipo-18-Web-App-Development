import type { Contractor, OnboardingStep, PersonalData } from '@/shared/types'
import { ArrowRight, CheckCircle2, Clock, FileSignature, FileText, Shield, User, Wallet } from 'lucide-react'

const steps: { key: Exclude<OnboardingStep, 'verification'>; label: string; icon: React.ElementType }[] = [
  { key: 'personal-data', label: 'Datos personales', icon: User },
  { key: 'documents', label: 'Documentos', icon: FileText },
  { key: 'contract', label: 'Contrato', icon: FileSignature },
  { key: 'payment-method', label: 'Método de pago', icon: Wallet },
]

interface StepVerificationProps {
  contractor: Contractor
  personalData: PersonalData
  completedSteps: OnboardingStep[]
  onBack: () => void
}

export const StepVerification = ({ contractor, personalData, completedSteps, onBack }: StepVerificationProps) => {
  const allStepsCompleted = steps.every((step) => completedSteps.includes(step.key))

  return (
    <div className="space-y-6">
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
          {allStepsCompleted ? <Clock className="h-8 w-8 text-success" /> : <Shield className="h-8 w-8 text-primary" />}
        </div>
        <h2 className="text-2xl font-semibold text-foreground">
          {allStepsCompleted ? 'Pendiente de verificación' : 'Faltan pasos por completar'}
        </h2>
        <p className="mt-2 text-muted-foreground">
          {allStepsCompleted
            ? 'Tu solicitud quedó lista para revisión operativa.'
            : 'Completá todos los pasos para dejar el onboarding listo para revisión.'}
        </p>
      </div>

      {allStepsCompleted ? (
        <>
          <div className="rounded-xl border border-success bg-success/10 p-6">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/20">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Solicitud enviada</h3>
                <p className="text-sm text-muted-foreground">
                  Última actualización: {new Date(contractor.lastUpdatedAt).toLocaleDateString('es-AR')}
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              El equipo de operaciones va a revisar la información de {personalData.firstName || 'la persona contratista'}.
              Esta pantalla queda lista para conectar estados reales y notificaciones posteriores.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Pasos completados</h4>
            {steps.map(({ key, label, icon: Icon }) => (
              <div key={key} className="flex items-center gap-4 rounded-lg border border-border bg-card p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
                  <Icon className="h-5 w-5 text-success" />
                </div>
                <span className="flex-1 font-medium text-foreground">{label}</span>
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
            ))}
          </div>

          <div className="rounded-lg bg-muted/50 p-4">
            <h4 className="mb-2 font-medium text-foreground">¿Qué sigue?</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-0.5 h-4 w-4 text-primary" />
                Se validarán tus documentos e identidad.
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-0.5 h-4 w-4 text-primary" />
                Se verificará el método de pago configurado.
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-0.5 h-4 w-4 text-primary" />
                Cuando la revisión termine, esta vista podrá mostrar el estado definitivo.
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-0.5 h-4 w-4 text-primary" />
                Más adelante se conectará con emails, notificaciones y activación real.
              </li>
            </ul>
          </div>
        </>
      ) : (
        <>
          <div className="space-y-3">
            {steps.map(({ key, label, icon: Icon }) => {
              const isCompleted = completedSteps.includes(key)

              return (
                <div
                  key={key}
                  className={`flex items-center gap-4 rounded-lg border p-4 ${
                    isCompleted ? 'border-success bg-success/5' : 'border-border bg-card'
                  }`}
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${isCompleted ? 'bg-success/10' : 'bg-muted'}`}>
                    <Icon className={`h-5 w-5 ${isCompleted ? 'text-success' : 'text-muted-foreground'}`} />
                  </div>
                  <span className="flex-1 font-medium text-foreground">{label}</span>
                  {isCompleted ? <CheckCircle2 className="h-5 w-5 text-success" /> : <span className="text-sm text-muted-foreground">Pendiente</span>}
                </div>
              )
            })}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 rounded-lg border border-border px-6 py-3 font-medium text-foreground transition-colors hover:bg-muted"
            >
              Volver al paso anterior
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default StepVerification