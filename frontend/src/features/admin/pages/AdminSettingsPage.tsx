import AdminHeader from '../components/AdminHeader'
import { Bell, Globe2, ShieldCheck, SlidersHorizontal, UsersRound } from 'lucide-react'

const settingsGroups = [
  {
    title: 'Security & Access',
    icon: ShieldCheck,
    description: 'Control access policy, session timeout and role permissions for operations staff.',
    items: ['Require 2FA for admins', 'Session timeout: 30 min', 'Allowed domains: northpay.com'],
  },
  {
    title: 'Onboarding Rules',
    icon: SlidersHorizontal,
    description: 'Define required fields and validations used in each onboarding step.',
    items: ['Mandatory document types', 'Tax ID validation rules', 'Auto-expire invitations in 7 days'],
  },
  {
    title: 'Notifications',
    icon: Bell,
    description: 'Manage channels and templates for contractor and operator alerts.',
    items: ['Email status updates', 'Correction request templates', 'Webhook delivery retries'],
  },
  {
    title: 'Localization',
    icon: Globe2,
    description: 'Prepare multi-country language, currency and date formatting preferences.',
    items: ['Default locale: en-US', 'Support timezone overrides', 'Currency fallback mapping'],
  },
]

const AdminSettingsPage = () => {
  return (
    <section className="space-y-4">
      <AdminHeader title="Settings" subtitle="Configuration surface ready for future integration" unreadCount={0} />

      <div className="space-y-4 p-6">
        <article className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <UsersRound className="h-4 w-4" />
            </div>
            <p className="text-sm text-muted-foreground">
              This screen provides the final IA and visual components. Backend teams can connect each module independently.
            </p>
          </div>
        </article>

        <div className="grid gap-4 md:grid-cols-2">
          {settingsGroups.map((group) => {
            const Icon = group.icon

            return (
              <article key={group.title} className="rounded-xl border border-border bg-card p-5">
                <div className="mb-3 inline-flex rounded-lg bg-muted p-2">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <h2 className="text-base font-semibold text-foreground">{group.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{group.description}</p>

                <ul className="mt-4 space-y-2 text-sm text-foreground">
                  {group.items.map((item) => (
                    <li key={item} className="rounded-lg bg-muted/40 px-3 py-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default AdminSettingsPage
