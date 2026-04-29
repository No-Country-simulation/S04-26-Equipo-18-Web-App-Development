import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import { Zap } from 'lucide-react'

const PublicLayout = () => {
    return (
        <div className="bg-slate-50 text-slate-900">
            <Header />

            <main className="min-h-screen mx-auto w-full max-w-6xl px-4 py-8">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="border-t border-border py-8 px-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                            <Zap className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <span className="font-medium text-foreground">NorthPay</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Contractor Onboarding Platform Demo
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default PublicLayout
