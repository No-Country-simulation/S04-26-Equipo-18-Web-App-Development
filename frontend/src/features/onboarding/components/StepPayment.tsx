import { useState } from 'react'
import type { PaymentMethod } from '@/shared/types'
import { Building2, CheckCircle2, CreditCard, Globe, Shield, Wallet, Zap } from 'lucide-react'

const paymentMethods = [
  {
    type: 'bank-transfer',
    label: 'Transferencia bancaria',
    icon: Building2,
    description: 'Depósito directo a tu cuenta bancaria.',
  },
  {
    type: 'wise',
    label: 'Wise',
    icon: Globe,
    description: 'Transferencias internacionales rápidas con bajas comisiones.',
  },
  {
    type: 'paypal',
    label: 'PayPal',
    icon: CreditCard,
    description: 'Cobros ágiles mediante tu cuenta PayPal.',
  },
] as const

const currencies = ['USD', 'EUR', 'GBP', 'MXN', 'BRL', 'ARS', 'COP', 'CLP']

interface StepPaymentProps {
  initialMethod?: PaymentMethod
  onSubmit: (method: PaymentMethod) => void
  onBack: () => void
}

export const StepPayment = ({ initialMethod, onSubmit, onBack }: StepPaymentProps) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod['type']>(initialMethod?.type ?? 'bank-transfer')
  const [formData, setFormData] = useState({
    bankName: initialMethod?.bankName ?? '',
    accountNumber: initialMethod?.accountNumber ?? '',
    routingNumber: initialMethod?.routingNumber ?? '',
    swiftCode: initialMethod?.swiftCode ?? '',
    email: initialMethod?.email ?? '',
    currency: initialMethod?.currency ?? 'USD',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (selectedMethod === 'bank-transfer') {
      if (!formData.bankName.trim()) newErrors.bankName = 'El nombre del banco es obligatorio'
      if (!formData.accountNumber.trim()) newErrors.accountNumber = 'El número de cuenta es obligatorio'
      if (!formData.routingNumber.trim()) newErrors.routingNumber = 'El número de ruta es obligatorio'
    }

    if ((selectedMethod === 'paypal' || selectedMethod === 'wise') && !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Ingresá un email válido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (!validate()) {
      return
    }

    const method: PaymentMethod = {
      type: selectedMethod,
      currency: formData.currency,
      ...(selectedMethod === 'bank-transfer' && {
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
        routingNumber: formData.routingNumber,
        swiftCode: formData.swiftCode,
      }),
      ...((selectedMethod === 'paypal' || selectedMethod === 'wise') && {
        email: formData.email,
      }),
    }

    onSubmit(method)
  }

  const inputClass = (field: string) =>
    `w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 ${
      errors[field]
        ? 'border-destructive bg-destructive/5 focus:ring-destructive/30'
        : 'border-border bg-background hover:border-primary/50 focus:ring-primary/30'
    }`

  return (
    <div className="space-y-6">
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Wallet className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground">Método de pago</h2>
        <p className="mt-2 text-muted-foreground">Elegí cómo querés recibir tus pagos una vez activada la cuenta.</p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {paymentMethods.map(({ type, label, icon: Icon, description }) => (
          <button
            key={type}
            type="button"
            onClick={() => setSelectedMethod(type)}
            className={`rounded-xl border-2 p-4 text-left transition-all duration-200 ${
              selectedMethod === type ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
            }`}
          >
            <div className="mb-2 flex items-center gap-3">
              <div className={`rounded-lg p-2 ${selectedMethod === type ? 'bg-primary/10' : 'bg-muted'}`}>
                <Icon className={`h-5 w-5 ${selectedMethod === type ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
              {selectedMethod === type && <CheckCircle2 className="ml-auto h-5 w-5 text-primary" />}
            </div>
            <p className="font-medium text-foreground">{label}</p>
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          </button>
        ))}
      </div>

      <div className="space-y-4 rounded-xl border border-border bg-card p-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Moneda preferida</label>
          <select
            value={formData.currency}
            onChange={(event) => setFormData({ ...formData, currency: event.target.value })}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        {selectedMethod === 'bank-transfer' && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Banco</label>
              <input
                type="text"
                value={formData.bankName}
                onChange={(event) => setFormData({ ...formData, bankName: event.target.value })}
                className={inputClass('bankName')}
                placeholder="Nombre del banco"
              />
              {errors.bankName && <p className="text-sm text-destructive">{errors.bankName}</p>}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Número de cuenta</label>
                <input
                  type="text"
                  value={formData.accountNumber}
                  onChange={(event) => setFormData({ ...formData, accountNumber: event.target.value })}
                  className={inputClass('accountNumber')}
                  placeholder="Número de cuenta"
                />
                {errors.accountNumber && <p className="text-sm text-destructive">{errors.accountNumber}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Routing / CBU / ABA</label>
                <input
                  type="text"
                  value={formData.routingNumber}
                  onChange={(event) => setFormData({ ...formData, routingNumber: event.target.value })}
                  className={inputClass('routingNumber')}
                  placeholder="Número de ruta"
                />
                {errors.routingNumber && <p className="text-sm text-destructive">{errors.routingNumber}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Código SWIFT/BIC <span className="text-muted-foreground">(opcional)</span>
              </label>
              <input
                type="text"
                value={formData.swiftCode}
                onChange={(event) => setFormData({ ...formData, swiftCode: event.target.value })}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Solo para transferencias internacionales"
              />
            </div>
          </>
        )}

        {(selectedMethod === 'paypal' || selectedMethod === 'wise') && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Correo de {selectedMethod === 'paypal' ? 'PayPal' : 'Wise'}
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(event) => setFormData({ ...formData, email: event.target.value })}
              className={inputClass('email')}
              placeholder={`Ingresá tu email de ${selectedMethod === 'paypal' ? 'PayPal' : 'Wise'}`}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
          <Shield className="h-5 w-5 text-success" />
          <div>
            <p className="text-sm font-medium text-foreground">Seguro</p>
            <p className="text-xs text-muted-foreground">Encriptación equivalente a nivel bancario</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
          <Zap className="h-5 w-5 text-success" />
          <div>
            <p className="text-sm font-medium text-foreground">Ágil</p>
            <p className="text-xs text-muted-foreground">Listo para pagos en menos de 48 horas</p>
          </div>
        </div>
      </div>

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
          onClick={handleSave}
          className="flex-1 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Continuar a verificación
        </button>
      </div>
    </div>
  )
}

export default StepPayment