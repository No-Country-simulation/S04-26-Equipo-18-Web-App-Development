import { useParams } from 'react-router-dom'
import { ArrowRight, KeyRound, Mail, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

const InviteAccessPage = () => {
  const { token } = useParams()
  const normalizedToken = token?.toUpperCase() ?? ''
  const isDemoToken = normalizedToken.startsWith('NORTH-2024-')

  return (
    <section className="mx-auto max-w-2xl rounded-2xl border border-border bg-card shadow-sm md:p-8 my-12 md:my-24">
      <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Invitation</p>
      <h1 className="mt-3 text-2xl font-bold tracking-tight text-foreground">Access your onboarding workspace</h1>
      <p className="mt-3 text-muted-foreground">
        We detected your invitation token and prepared your access path. Continue to register or sign in and complete your onboarding flow.
      </p>

      <div className="mt-5 rounded-xl border border-border bg-muted/40 p-4">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-primary/10 p-2 text-primary">
            <KeyRound className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Token detected</p>
            <p className="mt-1 truncate font-mono text-sm text-foreground">{normalizedToken || 'missing-token'}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {isDemoToken
                ? 'Demo token format recognized. UI flow is unlocked.'
                : 'Token format will be validated by backend integration later.'}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 rounded-xl border border-accent/30 bg-accent/10 p-4 md:grid-cols-2">
        <div className="flex items-start gap-2">
          <ShieldCheck className="mt-0.5 h-4 w-4 text-accent" />
          <p className="text-sm text-foreground">Secure link-based access for invited contractors.</p>
        </div>
        <div className="flex items-start gap-2">
          <Mail className="mt-0.5 h-4 w-4 text-accent" />
          <p className="text-sm text-foreground">Connected later to email invitation verification.</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to={`/contractor/auth?token=${encodeURIComponent(normalizedToken)}`}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90"
        >
          Continue to contractor access
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          to="/onboarding/demo"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 font-medium text-foreground hover:bg-muted"
        >
          Preview onboarding flow
        </Link>
      </div>
    </section>
  )
}

export default InviteAccessPage
