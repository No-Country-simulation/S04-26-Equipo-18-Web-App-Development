import { Link, NavLink, Outlet } from 'react-router-dom'

const PublicLayout = () => {
    return (
        <div className="bg-slate-50 text-slate-900">
            <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
                <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
                    <Link to="/" className="text-xl font-semibold tracking-tight text-slate-900">
                        NorthPay
                    </Link>

                    <div className="flex items-center gap-4 text-sm font-medium">
                        <NavLink
                            to="/onboarding"
                            className={({ isActive }) =>
                                isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'
                            }
                        >
                            Onboarding
                        </NavLink>
                        <NavLink
                            to="/admin"
                            className={({ isActive }) =>
                                isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'
                            }
                        >
                            Admin
                        </NavLink>
                    </div>
                </nav>
            </header>

            <main className="min-h-screen mx-auto w-full max-w-6xl px-4 py-8">
                <Outlet />
            </main>

            <footer className="border-t border-slate-200 bg-white">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
                    <p>NorthPay Onboarding Portal</p>
                    <p>Fast activation for contractors and operations teams</p>
                </div>
            </footer>
        </div>
    )
}

export default PublicLayout
