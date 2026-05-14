import AdminHeader from '../components/AdminHeader'
import { Bell, CheckCheck, Clock3, MessageSquareWarning, ShieldAlert } from 'lucide-react'

type NotificationType = 'warning' | 'info' | 'success' | 'alert'

const notifications = [
  {
    id: '1',
    title: 'Documento rechazado de James Wilson',
    message: 'El comprobante de domicilio fue rechazado por baja calidad de imagen.',
    type: 'warning',
    time: 'Hace 5 min',
  },
  {
    id: '2',
    title: 'Nuevo contratista invitado',
    message: 'Ana Silva inició el onboarding desde el token de invitación.',
    type: 'info',
    time: 'Hace 18 min',
  },
  {
    id: '3',
    title: 'Contrato aprobado',
    message: 'Carlos Méndez completó correctamente todas las etapas del onboarding.',
    type: 'success',
    time: 'Hace 1 hora',
  },
  {
    id: '4',
    title: 'Cola de verificación actualizada',
    message: 'Hay 2 contratistas en espera de revisión manual.',
    type: 'alert',
    time: 'Hace 2 horas',
  },
] as const satisfies ReadonlyArray<{
  id: string
  title: string
  message: string
  type: NotificationType
  time: string
}>

const typeStyles = {
  warning: {
    icon: MessageSquareWarning,
    iconClass: 'text-warning-foreground',
    badgeClass: 'bg-warning/10 text-warning-foreground',
  },
  info: {
    icon: Bell,
    iconClass: 'text-primary',
    badgeClass: 'bg-primary/10 text-primary',
  },
  success: {
    icon: CheckCheck,
    iconClass: 'text-success',
    badgeClass: 'bg-success/10 text-success',
  },
  alert: {
    icon: ShieldAlert,
    iconClass: 'text-destructive',
    badgeClass: 'bg-destructive/10 text-destructive',
  },
} as const

const AdminNotificationsPage = () => {
  return (
    <section className="space-y-4">
      <AdminHeader title="Notificaciones" subtitle="Seguimiento de eventos clave y cambios de estado del onboarding" unreadCount={4} />

      <div className="space-y-4 p-6">
        <article className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">
            Este centro de notificaciones está listo para integrarse con WebSocket/API. Ítems, etiquetas y marcas de tiempo están preparados para eventos reales.
          </p>
        </article>

        <div className="space-y-3">
          {notifications.map((notification) => {
            const style = typeStyles[notification.type]
            const Icon = style.icon

            return (
              <article
                key={notification.id}
                className="rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted/20"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-muted p-2">
                      <Icon className={`h-4 w-4 ${style.iconClass}`} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{notification.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{notification.message}</p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${style.badgeClass}`}>
                      {notification.type === 'warning'
                        ? 'Advertencia'
                        : notification.type === 'info'
                          ? 'Información'
                          : notification.type === 'success'
                            ? 'Éxito'
                            : 'Alerta'}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock3 className="h-3 w-3" />
                      {notification.time}
                    </span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default AdminNotificationsPage
