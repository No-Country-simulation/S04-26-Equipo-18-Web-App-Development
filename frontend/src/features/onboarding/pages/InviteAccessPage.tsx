import { useParams } from 'react-router-dom'
import { ArrowRight, KeyRound, Mail, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

const InviteAccessPage = () => {
  const { token } = useParams()
  const normalizedToken = token?.toUpperCase() ?? ''
  const isDemoToken = normalizedToken.startsWith('NORTH-2024-')

  return (
    <section className="bg-brand-dark px-4 py-12 text-white md:px-8 md:py-20">
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="np-reveal max-w-xl space-y-5">
          <p className="inline-flex items-center rounded-sm border border-brand-dark-soft bg-brand-dark-soft px-3 py-2 text-[11px] uppercase tracking-[0.12em] text-white">
            Invitacion segura
          </p>
          <h1 className="text-3xl font-medium tracking-[-0.03em] md:text-5xl">Accede a tu onboarding NorthPay</h1>
          <p className="text-[16px] leading-7 text-white/75">
            Detectamos tu token y preparamos el acceso para que completes registro, validacion documental y setup de pagos.
          </p>

          <div className="np-reveal np-delay-1 grid gap-3">
            <div className="rounded-sm border border-brand-dark-soft bg-brand-dark-card px-4 py-3">
              <p className="text-[11px] uppercase tracking-widest text-white/60">Invitacion</p>
              <p className="pt-1 text-sm text-white">Acceso individual y trazable por contratista.</p>
            </div>
            <div className="rounded-sm border border-brand-dark-soft bg-brand-dark-card px-4 py-3">
              <p className="text-[11px] uppercase tracking-widest text-white/60">Compliance</p>
              <p className="pt-1 text-sm text-white">Cada paso queda registrado antes de activar pagos.</p>
            </div>
          </div>
        </div>

        <div className="np-reveal np-delay-1 np-hover-lift rounded-sm border border-brand-dark-soft bg-white p-6 text-black md:p-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-brand-muted">Token detectado</p>
          <h2 className="pt-3 text-2xl font-medium tracking-[-0.02em]">Validamos tu acceso</h2>
          <p className="pt-3 text-[15px] leading-6 text-brand-muted">
            Continuá con el registro o inicio de sesion para entrar al portal de contratista.
          </p>

          <div className="mt-5 rounded-sm border border-brand-border bg-brand-surface-soft-alt p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-sm bg-black/5 p-2 text-black">
                <KeyRound className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-widest text-brand-muted">Token</p>
                <p className="mt-1 truncate font-mono text-sm text-black">{normalizedToken || 'token-no-disponible'}</p>
                <p className="mt-2 text-xs text-brand-muted">
                  {isDemoToken
                    ? 'Formato demo reconocido. Flujo de acceso habilitado.'
                    : 'El formato se validara en backend durante la integracion.'}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-3 rounded-sm border border-brand-border bg-white p-4 md:grid-cols-2">
            <div className="flex items-start gap-2">
              <ShieldCheck className="mt-0.5 h-4 w-4 text-black" />
              <p className="text-sm text-black">Acceso seguro por enlace para contratistas invitados.</p>
            </div>
            <div className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 text-black" />
              <p className="text-sm text-black">Preparado para validacion de invitaciones por email.</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to={`/contractor/auth?token=${encodeURIComponent(normalizedToken)}`}
              className="inline-flex items-center gap-2 rounded-sm bg-black px-5 py-3 text-[12px] font-medium uppercase tracking-[0.08em] text-white transition-colors hover:bg-brand-dark-card"
            >
              Continuar al acceso
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InviteAccessPage
