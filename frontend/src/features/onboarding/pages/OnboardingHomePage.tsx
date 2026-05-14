import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Landmark,
  Shield,
  Sparkles,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const onboardingFeatures = [
  {
    icon: Users,
    title: 'Datos y verificacion',
    description: 'Recolecta identidad, informacion fiscal y datos bancarios en un flujo guiado.',
  },
  {
    icon: FileCheck2,
    title: 'Documentos y contratos',
    description: 'Firma digital, trazabilidad y repositorio seguro por contratista.',
  },
  {
    icon: Landmark,
    title: 'Pagos globales',
    description: 'Configura metodos internacionales sin salir del onboarding.',
  },
  {
    icon: Shield,
    title: 'Compliance continuo',
    description: 'Estados en tiempo real para evitar bloqueos antes de activar.',
  },
]

const activationSteps = [
  {
    title: 'Invita en segundos',
    description: 'Envia un enlace unico al contratista y centraliza toda la entrada.',
  },
  {
    title: 'Valida y firma',
    description: 'Automatiza validaciones, documentos y contrato digital.',
  },
  {
    title: 'Activa y paga',
    description: 'Habilita al contratista para operar con pagos listos desde el dia uno.',
  },
]

const OnboardingHomePage = () => {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-dark px-4 pb-20 pt-14 text-white md:px-8 md:pb-24 md:pt-20">
        <div className="pointer-events-none absolute inset-0 opacity-80">
          <div className="np-float-soft absolute -right-24 top-12 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,_rgba(252,76,2,0.3)_0%,_rgba(239,44,193,0.24)_45%,_rgba(189,187,255,0.2)_75%,_rgba(1,1,32,0)_100%)] blur-3xl" />
          <div className="np-float-soft np-delay-2 absolute bottom-0 left-[-8%] h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,_rgba(200,246,249,0.24)_0%,_rgba(1,1,32,0)_70%)] blur-3xl" />
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="np-reveal max-w-2xl space-y-8">
            <div className="inline-flex items-center gap-2 rounded-sm border border-brand-dark-soft bg-brand-dark-soft px-3 py-2 text-[11px] uppercase tracking-[0.11em] text-white">
              <Sparkles className="h-3.5 w-3.5" />
              Suite operativa NorthPay
            </div>

            <div className="space-y-5">
              <h1 className="text-4xl font-medium leading-[1.03] tracking-[-0.035em] md:text-6xl">
                Onboarding global con
                <span className="np-brand-gradient-text block">
                  precision de infraestructura
                </span>
              </h1>
              <p className="max-w-xl text-[17px] leading-7 text-white/75">
                NorthPay une onboarding, compliance y pagos internacionales en una sola experiencia para activar
                contratistas en menos de 72 horas.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/invite/NORTH-2024-ABC123"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-white px-6 py-3 text-[12px] font-medium uppercase tracking-[0.08em] text-black transition-colors hover:bg-brand-mint"
              >
                Iniciar onboarding
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/auth/admin/login"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-brand-dark-soft bg-brand-dark-soft px-6 py-3 text-[12px] font-medium uppercase tracking-[0.08em] text-white transition-colors hover:bg-brand-dark-soft-hover"
              >
                Portal admin
              </Link>
            </div>

            <div className="grid max-w-xl grid-cols-3 gap-3 pt-2">
              <div className="rounded-sm border border-brand-dark-soft bg-brand-dark-card p-4">
                <p className="text-2xl font-medium tracking-[-0.03em]">72h</p>
                <p className="pt-2 text-[11px] uppercase tracking-[0.08em] text-white/60">Activacion promedio</p>
              </div>
              <div className="rounded-sm border border-brand-dark-soft bg-brand-dark-card p-4">
                <p className="text-2xl font-medium tracking-[-0.03em]">160+</p>
                <p className="pt-2 text-[11px] uppercase tracking-[0.08em] text-white/60">Paises cubiertos</p>
              </div>
              <div className="rounded-sm border border-brand-dark-soft bg-brand-dark-card p-4">
                <p className="text-2xl font-medium tracking-[-0.03em]">99.4%</p>
                <p className="pt-2 text-[11px] uppercase tracking-[0.08em] text-white/60">Onboarding sin friccion</p>
              </div>
            </div>
          </div>

          <div className="np-reveal np-delay-1 rounded-sm border border-brand-dark-soft bg-brand-dark-card p-6 md:p-8">
            <p className="pb-4 text-[11px] uppercase tracking-[0.12em] text-white/55">Estado del flujo</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-sm border border-brand-dark-soft bg-brand-dark-panel px-4 py-3">
                <p className="text-sm text-white/90">Invitaciones enviadas</p>
                <p className="text-sm font-medium">142</p>
              </div>
              <div className="flex items-center justify-between rounded-sm border border-brand-dark-soft bg-brand-dark-panel px-4 py-3">
                <p className="text-sm text-white/90">Verificacion completada</p>
                <p className="text-sm font-medium">117</p>
              </div>
              <div className="flex items-center justify-between rounded-sm border border-brand-dark-soft bg-brand-dark-panel px-4 py-3">
                <p className="text-sm text-white/90">Listos para pago</p>
                <p className="text-sm font-medium">108</p>
              </div>
            </div>
            <div className="np-brand-gradient mt-6 rounded-sm p-4 text-black">
              <p className="text-[11px] uppercase tracking-[0.12em]">Senal NorthPay</p>
              <p className="mt-2 text-lg font-medium tracking-[-0.02em]">Sin cuellos de botella en compliance esta semana</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 md:px-8 md:py-24">
        <div className="mx-auto w-full max-w-7xl">
          <div className="np-reveal mb-10 space-y-4 md:mb-14">
            <p className="text-[11px] uppercase tracking-[0.12em] text-brand-muted">Plataforma integral</p>
            <h2 className="max-w-3xl text-3xl font-medium leading-tight tracking-[-0.03em] text-black md:text-5xl">
              Todo lo que un equipo necesita para contratar sin fronteras
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {onboardingFeatures.map((feature, index) => {
              const Icon = feature.icon

              return (
                <article
                  key={feature.title}
                  className="np-reveal np-hover-lift rounded-sm border border-brand-border bg-white p-6"
                  style={{ animationDelay: `${120 + index * 80}ms` }}
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-sm bg-brand-surface-soft">
                    <Icon className="h-5 w-5 text-black" />
                  </div>
                  <h3 className="text-xl font-medium tracking-[-0.02em] text-black">{feature.title}</h3>
                  <p className="pt-3 text-[15px] leading-6 text-brand-muted">{feature.description}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-brand-dark px-4 py-20 text-white md:px-8 md:py-24">
        <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1fr_1fr]">
          <div className="np-reveal">
            <p className="text-[11px] uppercase tracking-[0.12em] text-white/65">Ruta de activacion</p>
            <h2 className="pt-4 text-3xl font-medium leading-tight tracking-[-0.03em] md:text-5xl">
              Tres pasos para tener al contractor operando
            </h2>
            <p className="max-w-xl pt-5 text-[16px] leading-7 text-white/75">
              Disenado para equipos de finanzas y operaciones que necesitan velocidad sin perder control.
            </p>
          </div>

          <div className="space-y-4">
            {activationSteps.map((step, index) => (
              <article
                key={step.title}
                className="np-reveal np-hover-lift rounded-sm border border-brand-dark-soft bg-brand-dark-card p-5 md:p-6"
                style={{ animationDelay: `${100 + index * 90}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-mint text-[11px] font-medium uppercase tracking-[0.08em] text-black">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-medium tracking-[-0.02em]">{step.title}</h3>
                    <p className="pt-2 text-[15px] leading-6 text-white/70">{step.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 md:px-8 md:py-24">
        <div className="mx-auto w-full max-w-7xl">
          <div className="np-reveal mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.12em] text-brand-muted">Indicadores en vivo</p>
              <h2 className="pt-3 text-3xl font-medium tracking-[-0.03em] md:text-5xl">Operacion NorthPay</h2>
            </div>
            <p className="max-w-xl text-[15px] leading-6 text-brand-muted">
              Monitorea activaciones, pendientes de validacion y tiempos de firma desde un mismo panel.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <article className="np-reveal np-hover-lift rounded-sm bg-brand-mint p-8 text-black" style={{ animationDelay: '120ms' }}>
              <p className="text-4xl font-medium tracking-[-0.03em]">2.7 dias</p>
              <p className="pt-2 text-[11px] uppercase tracking-widest">Tiempo de activacion</p>
            </article>
            <article className="np-reveal np-hover-lift rounded-sm bg-brand-peach p-8 text-black" style={{ animationDelay: '200ms' }}>
              <p className="text-4xl font-medium tracking-[-0.03em]">91%</p>
              <p className="pt-2 text-[11px] uppercase tracking-widest">Firma en primer envio</p>
            </article>
            <article className="np-reveal np-hover-lift rounded-sm bg-brand-periwinkle p-8 text-black" style={{ animationDelay: '280ms' }}>
              <p className="text-4xl font-medium tracking-[-0.03em]">0 deuda</p>
              <p className="pt-2 text-[11px] uppercase tracking-widest">Documental critica</p>
            </article>
          </div>

          <div className="np-reveal np-delay-1 mt-8 overflow-hidden rounded-sm border border-brand-border">
            <div className="grid grid-cols-[1.3fr_1fr_1fr] bg-brand-border px-4 py-3 text-[11px] uppercase tracking-widest text-brand-muted md:px-6">
              <p>Flujo</p>
              <p>Estado</p>
              <p>Tiempo promedio</p>
            </div>
            <div className="grid grid-cols-[1.3fr_1fr_1fr] border-t border-brand-border px-4 py-4 text-sm md:px-6">
              <p className="text-black">Validacion KYC</p>
              <p className="text-brand-muted">En rango</p>
              <p className="text-black">11h</p>
            </div>
            <div className="grid grid-cols-[1.3fr_1fr_1fr] border-t border-brand-border px-4 py-4 text-sm md:px-6">
              <p className="text-black">Firma de contrato</p>
              <p className="text-brand-muted">Estable</p>
              <p className="text-black">9h</p>
            </div>
            <div className="grid grid-cols-[1.3fr_1fr_1fr] border-t border-brand-border px-4 py-4 text-sm md:px-6">
              <p className="text-black">Setup de pago</p>
              <p className="text-brand-muted">Mejorando</p>
              <p className="text-black">6h</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pb-20 pt-4 md:px-8 md:pb-24">
        <div className="np-reveal mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-8 rounded-sm border border-brand-border p-8 md:flex-row md:items-center md:p-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.12em] text-brand-muted">Listo para empezar</p>
            <h2 className="pt-3 text-3xl font-medium tracking-[-0.03em] md:text-4xl">Lanza tu onboarding NorthPay esta semana</h2>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              to="/invite/NORTH-2024-ABC123"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-black px-6 py-3 text-[12px] font-medium uppercase tracking-[0.08em] text-white transition-colors hover:bg-brand-dark-card"
            >
              Probar invitacion
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/auth/admin/login"
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-brand-border bg-white px-6 py-3 text-[12px] font-medium uppercase tracking-[0.08em] text-black transition-colors hover:bg-brand-surface-soft-alt"
            >
              Ir al admin
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pb-20 md:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="np-reveal inline-flex items-center gap-2 rounded-sm border border-brand-border bg-white px-3 py-2 text-[11px] uppercase tracking-[0.08em] text-brand-muted">
            <CheckCircle2 className="h-3.5 w-3.5 text-black" />
            Demo operativa disponible
          </div>
          <div className="np-reveal np-delay-1 mt-4 inline-flex items-center gap-2 rounded-sm border border-brand-border bg-white px-3 py-2 text-[11px] uppercase tracking-[0.08em] text-brand-muted">
            <Clock3 className="h-3.5 w-3.5 text-black" />
            Tiempo de setup estimado: 15 minutos
          </div>
        </div>
      </section>
    </>
  )
}

export default OnboardingHomePage
