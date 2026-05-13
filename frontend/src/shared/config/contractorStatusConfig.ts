import { AlertTriangle, CheckCircle2, Clock, XCircle } from 'lucide-react'
import type { ContractorStatus } from '@/shared/types'

export const contractorStatusConfig: Record<
    ContractorStatus,
    { label: string; color: string; icon: React.ElementType }
> = {
    invited: { label: 'Invited', color: 'bg-muted/80 text-muted-foreground', icon: Clock },
    'in-progress': { label: 'In Progress', color: 'bg-primary/80 text-primary-foreground', icon: Clock },
    'pending-review': { label: 'Pending Review', color: 'bg-warning/80 text-warning-foreground', icon: AlertTriangle },
    'corrections-needed': {
        label: 'Corrections Needed',
        color: 'bg-destructive/80 text-destructive-foreground',
        icon: AlertTriangle,
    },
    'pending-verification': { label: 'Pending Verification', color: 'bg-warning/80 text-warning-foreground', icon: Clock },
    approved: { label: 'Approved', color: 'bg-success/80 text-success-foreground', icon: CheckCircle2 },
    rejected: { label: 'Rejected', color: 'bg-destructive/80 text-destructive-foreground', icon: XCircle },
}
