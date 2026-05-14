import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const PublicLayout = () => {
    return (
        <div className="bg-white text-black">
            <Header />

            <main className="min-h-screen w-full">
                <Outlet />
            </main>

            <footer className="border-t border-brand-border bg-white px-4 pt-14 md:px-8 md:pt-20">
                <div className="mx-auto grid w-full max-w-7xl gap-8 pb-12 md:grid-cols-2 md:items-start md:pb-16">
                    <div className="space-y-4">
                        <p className="text-[11px] uppercase tracking-[0.12em] text-brand-muted">
                            Plataforma NorthPay
                        </p>
                        <p className="max-w-md text-[15px] leading-6 text-black">
                            Onboarding, compliance y pagos internacionales para contratistas en una sola operacion.
                        </p>
                    </div>

                    <div className="grid gap-3 text-[13px] uppercase tracking-[0.08em] text-brand-muted md:justify-items-end">
                        <p>Onboarding en menos de 72h</p>
                        <p>Firma y documentacion digital</p>
                        <p>Pagos globales sin friccion</p>
                    </div>
                </div>

                <div className="mx-auto w-full max-w-7xl overflow-hidden border-t border-brand-border py-6 md:py-8">
                    <p className="text-[58px] font-medium leading-[0.95] tracking-[-0.04em] text-brand-muted-soft md:text-[112px]">
                        northpay
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default PublicLayout
