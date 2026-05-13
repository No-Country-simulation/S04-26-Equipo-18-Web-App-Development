import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                <img src='/northpay_nobackground_2x1.png' className="h-12" />
                <div className="flex items-center gap-3">
                    <Link
                        to="/auth/admin/login"
                        className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Portal de administración
                    </Link>
                    <Link
                        to="/invite/NORTH-2024-ABC123"
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                        Iniciar onboarding
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header

