import { useMemo } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { BadgeCheck, Clock3, FileText, LoaderCircle, ShieldX, UserRound, CircleAlert, ArrowRight } from 'lucide-react'
import { clearContractorSession, getContractorSession } from '../session'
import type { ContractorStatus } from '@/shared/types'
import { useContractorsData } from '@/shared/hooks/useContractorsData'

const statusConfig: Record<ContractorStatus, { label: string; className: string; icon: React.ElementType }> = {
  invited: { label: 'Invited', className: 'bg-muted text-muted-foreground', icon: Clock3 },
  'in-progress': { label: 'In Progress', className: 'bg-primary/10 text-primary', icon: LoaderCircle },
  'pending-review': { label: 'Pending Review', className: 'bg-warning/10 text-warning-foreground', icon: CircleAlert },
  'corrections-needed': { label: 'Corrections Needed', className: 'bg-destructive/10 text-destructive', icon: ShieldX },
  'pending-verification': { label: 'Pending Verification', className: 'bg-warning/10 text-warning-foreground', icon: Clock3 },
  approved: { label: 'Approved', className: 'bg-success/10 text-success', icon: BadgeCheck },
  rejected: { label: 'Rejected', className: 'bg-destructive/10 text-destructive', icon: ShieldX },
}

const ContractorDashboardPage = () => {
  const navigate = useNavigate()
  const session = getContractorSession()
  const { contractors, isLoading } = useContractorsData()

  const contractor = useMemo(() => {
    if (!session) {
      return null
    }

    return (
      contractors.find((item) => item.id === session.contractorId) ??
      contractors.find((item) => item.personalData.email.toLowerCase() === session.email?.toLowerCase()) ??
      null
    )
  }, [session])

  if (!session) {
    return <Navigate to="/contractor/auth" replace />
  }

  if (isLoading) {
    return (
      <section className="mx-auto my-16 max-w-2xl rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <p className="text-sm text-muted-foreground">Loading contractor dashboard...</p>
      </section>
    )
  }

  if (!contractor) {
    return (
      <section className="mx-auto my-16 max-w-2xl rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-foreground">Contractor profile not found</h1>
        <p className="mt-2 text-muted-foreground">
          We found your session but could not map it to a contractor profile yet.
        </p>
        <Link
          to="/contractor/auth"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90"
        >
          Back to access
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    )
  }

  const completedCount = contractor.completedSteps.length
  const totalSteps = 5
  const progress = Math.round((completedCount / totalSteps) * 100)
  const status = statusConfig[contractor.status]
  const StatusIcon = status.icon

  const documentsPending = contractor.documents.filter((doc) => doc.status === 'pending').length
  const documentsApproved = contractor.documents.filter((doc) => doc.status === 'approved').length
  const documentsRejected = contractor.documents.filter((doc) => doc.status === 'rejected').length

  return (
    <section className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <header className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Contractor dashboard</p>
            <h1 className="mt-1 text-2xl font-semibold text-foreground">
              {contractor.personalData.firstName} {contractor.personalData.lastName}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">{contractor.personalData.email}</p>
          </div>

          <div className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${status.className}`}>
            <StatusIcon className="h-4 w-4" />
            {status.label}
          </div>
        </div>

        <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(progress, 100)}%` }} />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Onboarding progress: {completedCount}/{totalSteps} steps ({progress}%)
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => navigate(`/onboarding/${contractor.id}`)}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90"
          >
            Continue onboarding
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              clearContractorSession()
              navigate('/contractor/auth', { replace: true })
            }}
            className="rounded-lg border border-border px-4 py-2 font-medium text-foreground hover:bg-muted"
          >
            Sign out
          </button>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Documents approved</p>
          <p className="mt-2 text-2xl font-semibold text-foreground">{documentsApproved}</p>
        </article>
        <article className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Documents pending</p>
          <p className="mt-2 text-2xl font-semibold text-foreground">{documentsPending}</p>
        </article>
        <article className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Documents requiring fixes</p>
          <p className="mt-2 text-2xl font-semibold text-foreground">{documentsRejected}</p>
        </article>
      </div>

      <article className="rounded-xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Document status</h2>
        </div>

        {contractor.documents.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
            No documents uploaded yet.
          </div>
        ) : (
          <div className="space-y-3">
            {contractor.documents.map((doc) => (
              <div key={doc.id} className="rounded-lg border border-border p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-foreground">{doc.name}</p>
                    <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">{doc.type}</p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      doc.status === 'approved'
                        ? 'bg-success/10 text-success'
                        : doc.status === 'rejected'
                          ? 'bg-destructive/10 text-destructive'
                          : 'bg-warning/10 text-warning-foreground'
                    }`}
                  >
                    {doc.status}
                  </span>
                </div>

                {doc.rejectionReason && (
                  <p className="mt-3 rounded bg-destructive/10 p-2 text-sm text-destructive">Reason: {doc.rejectionReason}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </article>

      <article className="rounded-xl border border-border bg-card p-5">
        <div className="mb-3 flex items-center gap-2">
          <UserRound className="h-4 w-4 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Personal profile</h2>
        </div>
        <div className="grid gap-3 text-sm md:grid-cols-2">
          <p className="text-muted-foreground">Country: <span className="text-foreground">{contractor.personalData.country}</span></p>
          <p className="text-muted-foreground">Phone: <span className="text-foreground">{contractor.personalData.phone}</span></p>
          <p className="text-muted-foreground">Tax ID: <span className="text-foreground">{contractor.personalData.taxId}</span></p>
          <p className="text-muted-foreground">Current step: <span className="text-foreground">{contractor.currentStep}</span></p>
        </div>
      </article>
    </section>
  )
}

export default ContractorDashboardPage
