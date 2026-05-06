import { useState } from 'react'
import { CheckCircle2, Clock, FileSignature, ScrollText, Shield } from 'lucide-react'

interface StepContractProps {
  contractorName: string
  isAlreadySigned?: boolean
  signedAt?: Date
  onNext: () => void
  onBack: () => void
}

export const StepContract = ({ contractorName, isAlreadySigned = false, signedAt, onNext, onBack }: StepContractProps) => {
  const [agreed, setAgreed] = useState(isAlreadySigned)
  const [signature, setSignature] = useState(contractorName)

  const canSign = isAlreadySigned || (agreed && signature.trim().length >= 3)

  return (
    <div className="space-y-6">
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <FileSignature className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground">Firma del contrato</h2>
        <p className="mt-2 text-muted-foreground">Revisá los términos y firmá digitalmente para continuar.</p>
      </div>

      {isAlreadySigned ? (
        <div className="rounded-xl border border-success bg-success/10 p-6 text-center">
          <CheckCircle2 className="mx-auto mb-3 h-12 w-12 text-success" />
          <h3 className="mb-2 text-lg font-semibold text-foreground">Contrato firmado</h3>
          <p className="text-muted-foreground">
            Firmado el {signedAt ? new Date(signedAt).toLocaleDateString('es-AR') : 'día de hoy'}.
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="border-b border-border bg-muted/50 px-5 py-3">
              <div className="flex items-center gap-2">
                <ScrollText className="h-5 w-5 text-primary" />
                <h3 className="font-medium text-foreground">Acuerdo de contratista independiente</h3>
              </div>
            </div>

            <div className="max-h-64 space-y-4 overflow-y-auto p-5 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">ACUERDO DE PRESTACIÓN DE SERVICIOS</p>
              <p>
                Este acuerdo se celebra entre NorthPay y la persona contratista que completa este onboarding. Su objetivo es
                formalizar la relación independiente para la prestación de servicios profesionales.
              </p>
              <p className="font-medium text-foreground">1. Servicios</p>
              <p>
                La persona contratista prestará servicios según el alcance definido en cada proyecto o asignación específica.
              </p>
              <p className="font-medium text-foreground">2. Compensación</p>
              <p>
                Los pagos se procesarán a través de NorthPay conforme a los términos acordados y al método de pago informado.
              </p>
              <p className="font-medium text-foreground">3. Naturaleza independiente</p>
              <p>
                La persona contratista reconoce que actúa de manera independiente y es responsable de sus impuestos, seguros y
                cumplimiento regulatorio local.
              </p>
              <p className="font-medium text-foreground">4. Confidencialidad</p>
              <p>
                Toda la información sensible de NorthPay y de sus clientes debe ser tratada de forma confidencial.
              </p>
              <p className="font-medium text-foreground">5. Vigencia</p>
              <p>
                Este acuerdo permanecerá vigente hasta que cualquiera de las partes lo rescinda con notificación previa.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-4">
              <Shield className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Seguro</p>
                <p className="text-xs text-muted-foreground">Firma digital con trazabilidad</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-4">
              <Clock className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Registrado</p>
                <p className="text-xs text-muted-foreground">Fecha y hora quedan asociadas</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-4">
              <FileSignature className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Verificable</p>
                <p className="text-xs text-muted-foreground">Vinculado a tu identidad declarada</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(event) => setAgreed(event.target.checked)}
                className="mt-1 h-5 w-5 rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm text-muted-foreground">
                Leí y acepto los términos del acuerdo. Entiendo que se trata de un documento con validez para el proceso de
                onboarding.
              </span>
            </label>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Escribí tu nombre completo para firmar</label>
              <input
                type="text"
                value={signature}
                onChange={(event) => setSignature(event.target.value)}
                placeholder="Tu nombre legal completo"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              {signature && <p className="pt-2 font-serif text-2xl italic text-foreground">{signature}</p>}
            </div>
          </div>
        </>
      )}

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 rounded-lg border border-border px-6 py-3 font-medium text-foreground transition-colors hover:bg-muted"
        >
          Volver
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canSign}
          className={`flex-1 rounded-lg px-6 py-3 font-medium transition-colors ${
            canSign ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-muted text-muted-foreground cursor-not-allowed'
          }`}
        >
          {isAlreadySigned ? 'Continuar' : 'Firmar y continuar'}
        </button>
      </div>
    </div>
  )
}

export default StepContract