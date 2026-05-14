import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Alert, AlertDescription } from "@/shared/components/ui/alert";
import {
    Mail,
    Lock,
    User,
    AlertCircle,
    ArrowRight,
    CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const DEMO_ADMIN_EMAIL = "admin@northpay.com";
const DEMO_ADMIN_PASSWORD = "admin123";
const ADMIN_SESSION_KEY = "northpay-admin-auth";

export function AdminAuthPage() {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<"login" | "register">("login");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Login form state
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    // Register form state
    const [registerName, setRegisterName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        const hasSession = window.localStorage.getItem(ADMIN_SESSION_KEY) === "authenticated";

        if (hasSession) {
            navigate("/admin", { replace: true });
        }
    }, [navigate]);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setIsLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 800));

        const isValidDemoUser =
            loginEmail.trim().toLowerCase() === DEMO_ADMIN_EMAIL &&
            loginPassword === DEMO_ADMIN_PASSWORD;

        if (!isValidDemoUser) {
            setError("Credenciales inválidas. Usá la cuenta demo de administración.");
            setIsLoading(false);
            return;
        }

        window.localStorage.setItem(ADMIN_SESSION_KEY, "authenticated");
        navigate("/admin", { replace: true });
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (registerPassword !== registerConfirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));

        window.localStorage.setItem(ADMIN_SESSION_KEY, "authenticated");
        setSuccess(`Cuenta creada para ${registerName || registerEmail}. Redirigiendo...`);

        window.setTimeout(() => {
            navigate("/admin", { replace: true });
        }, 1200);

        setIsLoading(false);
    };

    return (
        <section className="bg-brand-dark px-4 py-12 text-white md:px-8 md:py-20">
            <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div className="np-reveal space-y-5">
                    <p className="inline-flex rounded-sm border border-brand-dark-soft bg-brand-dark-soft px-3 py-2 text-[11px] uppercase tracking-[0.12em]">
                        Acceso de administracion
                    </p>
                    <h1 className="max-w-xl text-3xl font-medium tracking-[-0.03em] md:text-5xl">
                        Gestiona el onboarding de punta a punta
                    </h1>
                    <p className="max-w-xl text-[16px] leading-7 text-white/75">
                        Inicia sesion como admin para supervisar estados, validaciones y activaciones de contratistas.
                    </p>
                </div>

                <div className="np-reveal np-delay-1 w-full max-w-md lg:justify-self-end">

                {/* Auth Card */}
                <Card className="border-brand-border bg-white text-black shadow-none">
                    <CardHeader className="pb-4">
                        <Tabs
                            value={activeTab}
                            onValueChange={(value: string) => {
                                setActiveTab(value as "login" | "register");
                                setError(null);
                                setSuccess(null);
                            }}
                            className="w-full"
                        >
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="login">Iniciar sesión</TabsTrigger>
                                <TabsTrigger value="register">Crear cuenta</TabsTrigger>
                            </TabsList>

                            <TabsContent value="login" className="mt-6">
                                <CardTitle className="text-xl text-black">Bienvenido nuevamente</CardTitle>
                                <CardDescription className="mt-1 text-brand-muted">
                                    Ingresá tus credenciales para acceder al portal de administración
                                </CardDescription>
                            </TabsContent>

                            <TabsContent value="register" className="mt-6">
                                <CardTitle className="text-xl text-black">Crear una cuenta</CardTitle>
                                <CardDescription className="mt-1 text-brand-muted">
                                    Registrate para comenzar a gestionar el onboarding de contratistas
                                </CardDescription>
                            </TabsContent>
                        </Tabs>
                    </CardHeader>

                    <CardContent>
                        {error && (
                            <Alert variant="destructive" className="mb-4">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {success && (
                            <Alert className="mb-4 border-brand-border bg-brand-surface-soft">
                                <CheckCircle2 className="h-4 w-4 text-black" />
                                <AlertDescription className="text-black">
                                    {success}
                                </AlertDescription>
                            </Alert>
                        )}

                        {activeTab === "login" ? (
                            <form onSubmit={handleLogin} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="login-email">Correo electrónico</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="login-email"
                                            type="email"
                                            placeholder="admin@northpay.com"
                                            value={loginEmail}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLoginEmail(e.target.value)}
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="login-password">Contraseña</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="login-password"
                                            type="password"
                                            placeholder="Ingresá tu contraseña"
                                            value={loginPassword}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLoginPassword(e.target.value)}
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? (
                                        <span className="flex items-center gap-2">
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                            Iniciando sesión...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            Iniciar sesión
                                            <ArrowRight className="h-4 w-4" />
                                        </span>
                                    )}
                                </Button>

                                <div className="mt-4 rounded-sm border border-brand-border bg-brand-surface-soft p-3 text-sm">
                                    <p className="font-medium text-foreground mb-1">Credenciales demo:</p>
                                    <p className="text-muted-foreground">
                                        Correo electrónico: <span className="text-foreground">admin@northpay.com</span>
                                    </p>
                                    <p className="text-muted-foreground">
                                        Contraseña: <span className="text-foreground">admin123</span>
                                    </p>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handleRegister} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="register-name">Nombre completo</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="register-name"
                                            type="text"
                                            placeholder="Juan Pérez"
                                            value={registerName}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRegisterName(e.target.value)}
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="register-email">Correo electrónico</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="register-email"
                                            type="email"
                                            placeholder="tu@empresa.com"
                                            value={registerEmail}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRegisterEmail(e.target.value)}
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="register-password">Contraseña</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="register-password"
                                            type="password"
                                            placeholder="Al menos 6 caracteres"
                                            value={registerPassword}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRegisterPassword(e.target.value)}
                                            className="pl-10"
                                            minLength={6}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="register-confirm">Confirmar contraseña</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="register-confirm"
                                            type="password"
                                            placeholder="Repetí tu contraseña"
                                            value={registerConfirmPassword}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRegisterConfirmPassword(e.target.value)}
                                            className="pl-10"
                                            minLength={6}
                                            required
                                        />
                                    </div>
                                </div>

                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? (
                                        <span className="flex items-center gap-2">
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                            Creando cuenta...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            Crear cuenta
                                            <ArrowRight className="h-4 w-4" />
                                        </span>
                                    )}
                                </Button>
                            </form>
                        )}
                    </CardContent>
                </Card>

                <p className="mt-6 text-center text-sm text-white/70">
                    Al continuar, aceptas los terminos del servicio y la politica de privacidad de NorthPay.
                </p>
                </div>
            </div>
        </section>
    );
}
export default AdminAuthPage;