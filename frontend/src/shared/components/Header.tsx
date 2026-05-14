import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="sticky top-0 z-30 border-b border-white/12 bg-brand-white/80 backdrop-blur-md">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-8">
                <Link to="/" className="flex items-center">
                    <img src='/northpay_nobackground_2x1.png' className="h-10 md:h-11" alt="NorthPay" />
                </Link>

                <div className="flex items-center gap-2 md:gap-3">
                    <Link
                        to="/auth/admin/login"
                        className="rounded-sm border border-brand-dark-soft bg-brand-dark-soft px-3 py-2 text-[11px] font-medium uppercase tracking-[0.08em] text-white transition-colors hover:bg-brand-dark-soft-hover md:px-4"
                    >
                        Admin
                    </Link>
                    <Link
                        to="/invite/NORTH-2024-ABC123"
                        className="rounded-sm bg-white px-3 py-2 text-[11px] font-medium uppercase tracking-[0.08em] text-black transition-colors hover:bg-brand-mint md:px-4"
                    >
                        Iniciar Onboarding
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header

