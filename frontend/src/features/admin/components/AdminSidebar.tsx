import { Bell, LayoutDashboard, LogOut, Settings } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

const AdminSidebar = () => {


    const navItems = [
        { href: "/admin", label: "Panel", icon: LayoutDashboard },
        { href: "/admin/notifications", label: "Notificaciones", icon: Bell },
        { href: "/admin/settings", label: "Configuración", icon: Settings },
    ];

    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border">
            {/* Logo */}
            <div className="bg-white p-5 border-b border-sidebar-border">
                <Link to="/admin" className="flex items-center gap-3">
                    <img className='h-14 fill-white bg-white rounded p-1' src="/northpay_nobackground_2x1.png" alt="NorthPay Logo" />
                    <div>
                        <p className="text-xs text-sidebar-foreground/80">Portal de administración</p>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.href}
                            to={item.href}
                            end={item.href === '/admin'}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold shadow-sm'
                                    : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/40 hover:text-sidebar-foreground'
                                }`
                            }
                        >
                            <Icon className="w-4 h-4" />
                            <span className="flex-1 font-medium">{item.label}</span>
                        </NavLink>
                    );
                })}
            </nav>

            {/* User */}
            <div className="p-4 border-t border-sidebar-border">
                <div className="flex items-center gap-3 px-3 py-2">
                    <div className="w-9 h-9 rounded-full bg-sidebar-accent flex items-center justify-center">
                        <span className="text-sm font-medium text-sidebar-accent-foreground">OP</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-sidebar-foreground truncate">Operaciones</p>
                        <p className="text-xs text-sidebar-foreground/60 truncate">ops@northpay.com</p>
                    </div>
                    <NavLink to={'/'}>
                        <div className="p-2 rounded-lg  transition-colors">
                            <LogOut className="w-4 h-4 text-destructive hover:scale-105 transition-transform duration-150" />
                        </div>
                    </NavLink>
                </div>
            </div>
        </aside>
    )
}

export default AdminSidebar