import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import { Alert, AlertDescription } from '@/shared/components/ui/alert'
import {
  Ticket,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
} from 'lucide-react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { getContractorSession, saveContractorSession } from '../session'
import { getContractorByEmail } from '@/shared/data/contractorsRepository'

const demoTokenToEmail: Record<string, string> = {
  'NORTH-2024-ABC123': 'ana.silva@email.com',
  'NORTH-2024-DEF456': 'maria.gonzalez@email.com',
}

const ContractorAuth = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const initialToken = useMemo(() => (searchParams.get('token') ?? '').toUpperCase(), [searchParams])
  const initialInvitationEmail = useMemo(() => demoTokenToEmail[initialToken] ?? '', [initialToken])

  const [activeTab, setActiveTab] = useState<'register' | 'login'>('register')

  const [token, setToken] = useState(initialToken)
  const [tokenValidated, setTokenValidated] = useState(Boolean(initialInvitationEmail))
  const [tokenEmail, setTokenEmail] = useState(initialInvitationEmail)
  const [registerEmail, setRegisterEmail] = useState(initialInvitationEmail)
  const [registerPassword, setRegisterPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const [showRegisterPassword, setShowRegisterPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showLoginPassword, setShowLoginPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(
    initialInvitationEmail ? 'Token de invitación prevalidado desde tu enlace de acceso.' : '',
  )

  useEffect(() => {
    const session = getContractorSession()
    if (!session) {
      return
    }

    if (session.contractorId || session.email) {
      navigate('/contractor/dashboard', { replace: true })
    }
  }, [navigate])

  const handleValidateToken = async () => {
    setError('')
    setSuccess('')
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 500))

    const normalizedToken = token.trim().toUpperCase()
    const invitationEmail = demoTokenToEmail[normalizedToken]
    const hasSupportedFormat = normalizedToken.startsWith('NORTH-2024-')

    if (!hasSupportedFormat) {
      setError('Formato de token inválido. Probá con un token NORTH-2024.')
      setIsLoading(false)
      return
    }

    setTokenValidated(true)
    setTokenEmail(invitationEmail ?? 'invited.contractor@northpay.com')
    setRegisterEmail(invitationEmail ?? '')
    setSuccess('Token validado correctamente.')
    setIsLoading(false)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!tokenValidated) {
      setError('Primero validá tu token de invitación.')
      return
    }

    if (registerPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    if (registerPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    if (tokenEmail && registerEmail.trim().toLowerCase() !== tokenEmail.trim().toLowerCase()) {
      setError('El email de registro debe coincidir con el email invitado asociado al token.')
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 700))

    const registrationEmail = (tokenEmail || registerEmail).trim().toLowerCase()

    const matchedContractor = await getContractorByEmail(registrationEmail)

    const contractorId = matchedContractor?.id ?? '3'

    saveContractorSession({
      contractorId,
      email: registrationEmail,
      invitationToken: token.trim().toUpperCase(),
    })

    setIsLoading(false)
    navigate('/contractor/dashboard', { replace: true })
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 700))

    const matchedContractor = await getContractorByEmail(loginEmail.trim().toLowerCase())

    if (!matchedContractor || loginPassword.length < 6) {
      setError('Credenciales inválidas para el acceso demo.')
      setIsLoading(false)
      return
    }

    saveContractorSession({
      contractorId: matchedContractor.id,
      email: matchedContractor.personalData.email,
    })

    setIsLoading(false)
    navigate('/contractor/dashboard', { replace: true })
  }

  const resetTokenValidation = () => {
    setTokenValidated(false)
    setTokenEmail('')
    setRegisterEmail('')
    setToken('')
    setError('')
    setSuccess('')
  }

  return (
    <Card className="border-border shadow-lg">
      <CardHeader className="pb-2 text-center">
        <CardTitle className="text-2xl font-bold text-foreground">Acceso de contratistas</CardTitle>
        <CardDescription className="text-muted-foreground">
          Registrate con tu token de invitación o iniciá sesión para continuar tu onboarding
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-4">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4 border-accent bg-accent/10">
            <CheckCircle2 className="h-4 w-4 text-accent-foreground" />
            <AlertDescription className="text-accent-foreground">{success}</AlertDescription>
          </Alert>
        )}

        <Tabs
          value={activeTab}
          onValueChange={(v) => {
            setActiveTab(v as 'register' | 'login')
            setError('')
            setSuccess('')
          }}
        >
          <TabsList className="mb-6 grid w-full grid-cols-2">
            <TabsTrigger value="register" className="gap-2">
              <Ticket className="h-4 w-4" />
              Registrarse
            </TabsTrigger>
            <TabsTrigger value="login" className="gap-2">
              <Lock className="h-4 w-4" />
              Iniciar sesión
            </TabsTrigger>
          </TabsList>

          <TabsContent value="register" className="mt-0">
            {!tokenValidated ? (
              <div className="space-y-4">
                <div className="mb-4 rounded-lg bg-muted p-4 text-center">
                  <Ticket className="mx-auto mb-2 h-8 w-8 text-primary" />
                  <p className="text-sm text-muted-foreground">
                    Ingresá el token de invitación que recibiste de NorthPay para crear tu cuenta
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="token" className="text-foreground">
                    Token de invitación
                  </Label>
                  <Input
                    id="token"
                    type="text"
                    placeholder="NORTH-2024-XXXXXX"
                    value={token}
                    onChange={(e) => setToken(e.target.value.toUpperCase())}
                    className="text-center font-mono tracking-wider"
                    disabled={isLoading}
                  />
                </div>

                <Button onClick={handleValidateToken} disabled={!token.trim() || isLoading} className="w-full gap-2">
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Validando...
                    </>
                  ) : (
                    <>
                      Validar token
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>

                <div className="pt-2 text-center">
                  <p className="text-xs text-muted-foreground">
                    Tokens demo: <span className="font-mono">NORTH-2024-ABC123</span> o{' '}
                    <span className="font-mono">NORTH-2024-DEF456</span>
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="mb-4 flex items-center gap-3 rounded-lg border border-accent/20 bg-accent/10 p-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-accent-foreground">Token validado</p>
                    <p className="truncate font-mono text-xs text-muted-foreground">{token}</p>
                  </div>
                  <Button type="button" variant="ghost" size="sm" onClick={resetTokenValidation} className="text-xs">
                    Cambiar
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-email" className="text-foreground">
                    Correo electrónico
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="tu@email.com"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      className="pl-10"
                      disabled={isLoading}
                      required
                    />
                  </div>
                  {tokenEmail && registerEmail !== tokenEmail && (
                    <p className="rounded bg-warning/10 p-2 text-xs text-warning-foreground">
                      Nota: la invitación se envió a {tokenEmail}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password" className="text-foreground">
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="register-password"
                      type={showRegisterPassword ? 'text' : 'password'}
                      placeholder="Creá una contraseña"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      className="pl-10 pr-10"
                      disabled={isLoading}
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showRegisterPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-foreground">
                    Confirmar contraseña
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirmá tu contraseña"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 pr-10"
                      disabled={isLoading}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {confirmPassword && registerPassword !== confirmPassword && (
                    <p className="text-xs text-destructive">Las contraseñas no coinciden</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !registerEmail || !registerPassword || registerPassword !== confirmPassword}
                  className="w-full gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creando cuenta...
                    </>
                  ) : (
                    <>
                      Crear cuenta
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </TabsContent>

          <TabsContent value="login" className="mt-0">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="mb-4 rounded-lg bg-muted p-4 text-center">
                <Lock className="mx-auto mb-2 h-8 w-8 text-primary" />
                <p className="text-sm text-muted-foreground">Iniciá sesión para continuar tu proceso de onboarding</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-foreground">
                  Correo electrónico
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="tu@email.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-foreground">
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="login-password"
                    type={showLoginPassword ? 'text' : 'password'}
                    placeholder="Ingresá tu contraseña"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="pl-10 pr-10"
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" disabled={isLoading || !loginEmail || !loginPassword} className="w-full gap-2">
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  <>
                    Iniciar sesión
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>

              <div className="pt-2 text-center">
                <p className="text-xs text-muted-foreground">
                  Demo: <span className="font-mono">ana.silva@email.com</span> /{' '}
                  <span className="font-mono">ana123</span>
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  ¿Necesitás una invitación?{' '}
                  <Link to="/invite/NORTH-2024-ABC123" className="text-primary hover:underline">
                    Usar invitación de ejemplo
                  </Link>
                </p>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default ContractorAuth
