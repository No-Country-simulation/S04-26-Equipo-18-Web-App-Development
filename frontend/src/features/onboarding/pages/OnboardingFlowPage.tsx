import { contractors } from '@/app/store'
import OnboardingWizard from '../components/OnboardingWizard'
import { ArrowRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

const OnboardingFlowPage = () => {
  const { contractorId } = useParams()

  const contractor = contractorId
    ? contractors.find((item) => item.id === contractorId)
    : contractors.find((item) => item.id === '3')

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

  return <OnboardingWizard contractor={contractor} />
}

export default OnboardingFlowPage
