import { useState } from 'react'
import type { PersonalData } from '@/shared/types'
import { Calendar, FileText, Mail, MapPin, Phone, User } from 'lucide-react'

const countries = [
  'Argentina',
  'Brasil',
  'Chile',
  'Colombia',
  'México',
  'Perú',
  'España',
  'Estados Unidos',
  'Reino Unido',
  'Alemania',
  'Francia',
  'Portugal',
]

interface StepPersonalDataProps {
  initialData: PersonalData
  onSubmit: (data: PersonalData) => void
}

export const StepPersonalData = ({ initialData, onSubmit }: StepPersonalDataProps) => {
  const [formData, setFormData] = useState<PersonalData>(initialData)
  const [errors, setErrors] = useState<Partial<Record<keyof PersonalData, string>>>({})

  const validate = () => {
    const newErrors: Partial<Record<keyof PersonalData, string>> = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'El nombre es obligatorio'
    if (!formData.lastName.trim()) newErrors.lastName = 'El apellido es obligatorio'
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Ingresá un email válido'
    if (!formData.phone.trim()) newErrors.phone = 'El teléfono es obligatorio'
    if (!formData.country) newErrors.country = 'Seleccioná un país'
    if (!formData.address.trim()) newErrors.address = 'La dirección es obligatoria'
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'La fecha de nacimiento es obligatoria'
    if (!formData.taxId.trim()) newErrors.taxId = 'El identificador fiscal es obligatorio'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (validate()) {
      onSubmit(formData)
    }
  }

  const inputClass = (field: keyof PersonalData) =>
    `w-full rounded-lg border bg-background px-4 py-3 pl-11 transition-all duration-200 focus:outline-none focus:ring-2 ${
      errors[field]
        ? 'border-destructive bg-destructive/5 focus:ring-destructive/30'
        : 'border-border hover:border-primary/50 focus:ring-primary/30'
    }`

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <User className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground">Datos personales</h2>
        <p className="mt-2 text-muted-foreground">Completá tu información básica para comenzar el proceso.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Nombre</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={formData.firstName}
              onChange={(event) => setFormData({ ...formData, firstName: event.target.value })}
              className={inputClass('firstName')}
              placeholder="María"
            />
          </div>
          {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Apellido</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={formData.lastName}
              onChange={(event) => setFormData({ ...formData, lastName: event.target.value })}
              className={inputClass('lastName')}
              placeholder="González"
            />
          </div>
          {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Correo electrónico</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="email"
              value={formData.email}
              onChange={(event) => setFormData({ ...formData, email: event.target.value })}
              className={inputClass('email')}
              placeholder="maria@email.com"
            />
          </div>
          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Teléfono</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
              className={inputClass('phone')}
              placeholder="+54 11 5555 5555"
            />
          </div>
          {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">País</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <select
              value={formData.country}
              onChange={(event) => setFormData({ ...formData, country: event.target.value })}
              className={inputClass('country')}
            >
              <option value="">Seleccionar país</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          {errors.country && <p className="text-sm text-destructive">{errors.country}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Fecha de nacimiento</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(event) => setFormData({ ...formData, dateOfBirth: event.target.value })}
              className={inputClass('dateOfBirth')}
            />
          </div>
          {errors.dateOfBirth && <p className="text-sm text-destructive">{errors.dateOfBirth}</p>}
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-foreground">Dirección</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={formData.address}
              onChange={(event) => setFormData({ ...formData, address: event.target.value })}
              className={inputClass('address')}
              placeholder="Av. Corrientes 1234, Buenos Aires"
            />
          </div>
          {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-foreground">CUIT / Identificación fiscal</label>
          <div className="relative">
            <FileText className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={formData.taxId}
              onChange={(event) => setFormData({ ...formData, taxId: event.target.value })}
              className={inputClass('taxId')}
              placeholder="Tu identificador fiscal"
            />
          </div>
          {errors.taxId && <p className="text-sm text-destructive">{errors.taxId}</p>}
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
        >
          Continuar a documentos
        </button>
      </div>
    </form>
  )
}

export default StepPersonalData