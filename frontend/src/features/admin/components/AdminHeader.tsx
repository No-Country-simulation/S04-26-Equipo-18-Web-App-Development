import { Bell, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

type AdminHeaderProps = {
    title: string
    subtitle?: string
    unreadCount?: number
}

const AdminHeader = ({ title, subtitle, unreadCount = 5 }: AdminHeaderProps) => {
    return (
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border pb-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
                    {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search contractors..."
                            className="w-64 pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                    </div>

                    <Link
                        to="/admin/notifications"
                        className="relative p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                        <Bell className="w-5 h-5 text-muted-foreground" />
                        {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
                                {unreadCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default AdminHeader