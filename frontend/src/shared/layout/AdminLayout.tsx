import { NavLink, Outlet } from 'react-router-dom'

const navItemClass = ({ isActive }: { isActive: boolean }) =>
  [
    'block rounded-lg px-3 py-2 text-sm font-medium transition-colors',
    isActive ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800/70 hover:text-white',
  ].join(' ')

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 md:grid md:grid-cols-[240px_1fr]">
      <aside className="bg-slate-900 px-4 py-6 text-white md:min-h-screen">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-widest text-slate-400">NorthPay</p>
          <h1 className="text-lg font-semibold">Admin Panel</h1>
        </div>

        <nav className="space-y-2">
          <NavLink to="/admin" end className={navItemClass}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/contractors" className={navItemClass}>
            Contractors
          </NavLink>
        </nav>
      </aside>

      <section className="flex min-h-screen flex-col">
        <header className="border-b border-slate-200 bg-white px-5 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">Operations Workspace</h2>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Connected
            </span>
          </div>
        </header>

        <main className="flex-1 px-5 py-6">
          <Outlet />
        </main>
      </section>
    </div>
  )
}

export default AdminLayout
