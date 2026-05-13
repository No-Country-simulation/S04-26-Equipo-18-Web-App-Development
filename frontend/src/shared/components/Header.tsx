import { Link } from 'react-router-dom';
import { Zap } from "lucide-react";

const Header = () => {
    return (
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                        <Zap className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="font-semibold text-foreground text-lg">NorthPay</span>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        to="/auth/admin/login"
                        className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Admin Portal
                    </Link>
                    <Link
                        to="/invite/NORTH-2024-ABC123"
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                        Start Onboarding
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header

