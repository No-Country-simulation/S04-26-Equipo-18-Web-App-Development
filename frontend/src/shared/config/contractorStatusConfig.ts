import { AlertTriangle, CheckCircle2, Clock, XCircle } from 'lucide-react'
import type { ContractorStatus } from '@/shared/types'

export const contractorStatusConfig: Record<
    ContractorStatus,
    { label: string; color: string; icon: React.ElementType }
> = {
    invited: { label: 'Invitado', color: 'bg-muted/80 text-muted-foreground', icon: Clock },
    'in-progress': { label: 'En progreso', color: 'bg-primary/80 text-primary-foreground', icon: Clock },
    'pending-review': { label: 'Pendiente de revisión', color: 'bg-warning/80 text-warning-foreground', icon: AlertTriangle },
    'corrections-needed': {
        label: 'Correcciones requeridas',
        color: 'bg-destructive/80 text-destructive-foreground',
        icon: AlertTriangle,
    },
    'pending-verification': { label: 'Pendiente de verificación', color: 'bg-warning/80 text-warning-foreground', icon: Clock },
    approved: { label: 'Aprobado', color: 'bg-success/80 text-success-foreground', icon: CheckCircle2 },
    rejected: { label: 'Rechazado', color: 'bg-destructive/80 text-destructive-foreground', icon: XCircle },
}
