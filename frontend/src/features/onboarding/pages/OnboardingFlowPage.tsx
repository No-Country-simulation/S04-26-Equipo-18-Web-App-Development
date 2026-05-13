import OnboardingWizard from '../components/OnboardingWizard'
import { ArrowRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useContractorsData } from '@/shared/hooks/useContractorsData'

const OnboardingFlowPage = () => {
  const { contractorId } = useParams()
  const { findById, isLoading, updateContractor } = useContractorsData()

  if (isLoading) {
    return (
      <section className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <p className="text-sm font-medium text-muted-foreground">Cargando onboarding...</p>
      </section>
    )
  }

  const contractor = contractorId ? findById(contractorId) : null

  if (!contractor) {
    return (
      <section className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <p className="text-sm font-medium text-muted-foreground">Contratista no encontrado</p>
        <h1 className="mt-2 text-2xl font-semibold text-foreground">Flujo de onboarding no disponible</h1>
        <p className="mt-3 text-muted-foreground">
          Esta vista está preparada, pero no encontramos un contratista demo para la ruta solicitada.
        </p>
        <Link
          to="/contractor/auth"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90"
        >
          Ir al acceso de contratistas
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    )
  }

  return (
    <OnboardingWizard
      key={contractor.id}
      contractor={contractor}
      onContractorUpdate={async (updates) => {
        await updateContractor(contractor.id, updates)
      }}
    />
  )
}

export default OnboardingFlowPage
