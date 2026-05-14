import AdminHeader from '../components/AdminHeader'
import { Bell, Globe2, ShieldCheck, SlidersHorizontal, UsersRound } from 'lucide-react'

const settingsGroups = [
  {
    title: 'Seguridad y acceso',
    icon: ShieldCheck,
    description: 'Definí políticas de acceso, expiración de sesión y permisos por rol para el equipo operativo.',
    items: ['Exigir 2FA para administradores', 'Tiempo de sesión: 30 min', 'Dominios permitidos: northpay.com'],
  },
  {
    title: 'Reglas de onboarding',
    icon: SlidersHorizontal,
    description: 'Configurá campos obligatorios y validaciones en cada etapa del onboarding.',
    items: ['Tipos de documentos obligatorios', 'Reglas de validación fiscal', 'Vencimiento automático de invitaciones en 7 días'],
  },
  {
    title: 'Notificaciones',
    icon: Bell,
    description: 'Administrá canales y plantillas para alertas de contratistas y operadores.',
    items: ['Actualizaciones de estado por email', 'Plantillas para solicitud de correcciones', 'Reintentos de entrega de webhooks'],
  },
  {
    title: 'Localización',
    icon: Globe2,
    description: 'Prepará preferencias por país para idioma, moneda y formato de fecha.',
    items: ['Configuración regional predeterminada: es-AR', 'Soporte para zonas horarias personalizadas', 'Mapeo de moneda de respaldo'],
  },
]

const AdminSettingsPage = () => {
  return (
    <section className="space-y-4">
      <AdminHeader title="Configuración" subtitle="Superficie de configuración lista para integraciones futuras" unreadCount={0} />

      <div className="space-y-4 p-6">
        <article className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <UsersRound className="h-4 w-4" />
            </div>
            <p className="text-sm text-muted-foreground">
              Esta pantalla presenta la arquitectura de información y los componentes visuales finales. El equipo backend puede conectar cada módulo de forma independiente.
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
