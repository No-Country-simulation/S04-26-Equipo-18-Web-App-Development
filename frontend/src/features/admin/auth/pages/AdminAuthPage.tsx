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
            setError("Invalid credentials. Use the demo admin account.");
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
            setError("Passwords do not match");
            return;
        }

        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));

        window.localStorage.setItem(ADMIN_SESSION_KEY, "authenticated");
        setSuccess(`Account created for ${registerName || registerEmail}. Redirecting...`);

        window.setTimeout(() => {
            navigate("/admin", { replace: true });
        }, 1200);

        setIsLoading(false);
    };

    return (
        <div className="flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo and Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-foreground">NorthPay Admin</h1>
                    <p className="text-muted-foreground mt-2">
                        Contractor Onboarding Management Portal
                    </p>
                </div>

                {/* Auth Card */}
                <Card className="border-border/50 shadow-lg">
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
                                <TabsTrigger value="login">Sign In</TabsTrigger>
                                <TabsTrigger value="register">Create Account</TabsTrigger>
                            </TabsList>

                            <TabsContent value="login" className="mt-6">
                                <CardTitle className="text-xl">Welcome back</CardTitle>
                                <CardDescription className="mt-1">
                                    Enter your credentials to access the admin portal
                                </CardDescription>
                            </TabsContent>

                            <TabsContent value="register" className="mt-6">
                                <CardTitle className="text-xl">Create an account</CardTitle>
                                <CardDescription className="mt-1">
                                    Register to start managing contractor onboarding
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
                            <Alert className="mb-4 border-accent bg-accent/10">
                                <CheckCircle2 className="h-4 w-4 text-accent" />
                                <AlertDescription className="text-accent">
                                    {success}
                                </AlertDescription>
                            </Alert>
                        )}

                        {activeTab === "login" ? (
                            <form onSubmit={handleLogin} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="login-email">Email</Label>
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
                                    <Label htmlFor="login-password">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="login-password"
                                            type="password"
                                            placeholder="Enter your password"
                                            value={loginPassword}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLoginPassword(e.target.value)}
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className="flex items-center gap-2">
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                            Signing in...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            Sign In
                                            <ArrowRight className="h-4 w-4" />
                                        </span>
                                    )}
                                </Button>

                                <div className="mt-4 p-3 rounded-lg bg-muted/50 text-sm">
                                    <p className="font-medium text-foreground mb-1">Demo credentials:</p>
                                    <p className="text-muted-foreground">
                                        Email: <span className="text-foreground">admin@northpay.com</span>
                                    </p>
                                    <p className="text-muted-foreground">
                                        Password: <span className="text-foreground">admin123</span>
                                    </p>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handleRegister} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="register-name">Full Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="register-name"
                                            type="text"
                                            placeholder="John Doe"
                                            value={registerName}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRegisterName(e.target.value)}
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="register-email">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="register-email"
                                            type="email"
                                            placeholder="you@company.com"
                                            value={registerEmail}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRegisterEmail(e.target.value)}
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="register-password">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="register-password"
                                            type="password"
                                            placeholder="At least 6 characters"
                                            value={registerPassword}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRegisterPassword(e.target.value)}
                                            className="pl-10"
                                            minLength={6}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="register-confirm">Confirm Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="register-confirm"
                                            type="password"
                                            placeholder="Repeat your password"
                                            value={registerConfirmPassword}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRegisterConfirmPassword(e.target.value)}
                                            className="pl-10"
                                            minLength={6}
                                            required
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className="flex items-center gap-2">
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                            Creating account...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            Create Account
                                            <ArrowRight className="h-4 w-4" />
                                        </span>
                                    )}
                                </Button>
                            </form>
                        )}
                    </CardContent>
                </Card>

                {/* Footer */}
                <p className="text-center text-sm text-muted-foreground mt-6">
                    By continuing, you agree to NorthPay&apos;s Terms of Service and Privacy Policy
                </p>
            </div>
        </div>
    );
}
export default AdminAuthPage;