import AdminHeader from '../components/AdminHeader'
import { Bell, CheckCheck, Clock3, MessageSquareWarning, ShieldAlert } from 'lucide-react'

type NotificationType = 'warning' | 'info' | 'success' | 'alert'

const notifications = [
  {
    id: '1',
    title: 'Document rejected for James Wilson',
    message: 'Proof of address was rejected due to low image quality.',
    type: 'warning',
    time: '5 min ago',
  },
  {
    id: '2',
    title: 'New contractor invited',
    message: 'Ana Silva started onboarding from invitation token.',
    type: 'info',
    time: '18 min ago',
  },
  {
    id: '3',
    title: 'Contract approved',
    message: 'Carlos Mendez completed all onboarding steps successfully.',
    type: 'success',
    time: '1 hour ago',
  },
  {
    id: '4',
    title: 'Pending verification queue updated',
    message: 'There are 2 contractors waiting for manual review.',
    type: 'alert',
    time: '2 hours ago',
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
      <AdminHeader title="Notifications" subtitle="Track key onboarding events and status changes" unreadCount={4} />

      <div className="space-y-4 p-6">
        <article className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">
            This notification center is visually ready for websocket/API wiring. Items, badges and timestamps are mapped for real events.
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
                      {notification.type}
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
