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
    initialInvitationEmail ? 'Invitation token pre-validated from your access link.' : '',
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
      setError('Invalid token format. Try a NORTH-2024 token.')
      setIsLoading(false)
      return
    }

    setTokenValidated(true)
    setTokenEmail(invitationEmail ?? 'invited.contractor@northpay.com')
    setRegisterEmail(invitationEmail ?? '')
    setSuccess('Token validated successfully!')
    setIsLoading(false)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!tokenValidated) {
      setError('Validate your invitation token first.')
      return
    }

    if (registerPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (registerPassword.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (tokenEmail && registerEmail.trim().toLowerCase() !== tokenEmail.trim().toLowerCase()) {
      setError('The registration email must match the invited email linked to the token.')
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
      setError('Invalid credentials for demo access.')
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
        <CardTitle className="text-2xl font-bold text-foreground">Contractor Access</CardTitle>
        <CardDescription className="text-muted-foreground">
          Register with your invitation token or sign in to continue your onboarding
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
              Register
            </TabsTrigger>
            <TabsTrigger value="login" className="gap-2">
              <Lock className="h-4 w-4" />
              Sign In
            </TabsTrigger>
          </TabsList>

          <TabsContent value="register" className="mt-0">
            {!tokenValidated ? (
              <div className="space-y-4">
                <div className="mb-4 rounded-lg bg-muted p-4 text-center">
                  <Ticket className="mx-auto mb-2 h-8 w-8 text-primary" />
                  <p className="text-sm text-muted-foreground">
                    Enter the invitation token you received from NorthPay to create your account
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="token" className="text-foreground">
                    Invitation Token
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
                      Validating...
                    </>
                  ) : (
                    <>
                      Validate Token
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>

                <div className="pt-2 text-center">
                  <p className="text-xs text-muted-foreground">
                    Demo tokens: <span className="font-mono">NORTH-2024-ABC123</span> or{' '}
                    <span className="font-mono">NORTH-2024-DEF456</span>
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="mb-4 flex items-center gap-3 rounded-lg border border-accent/20 bg-accent/10 p-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-accent-foreground">Token validated</p>
                    <p className="truncate font-mono text-xs text-muted-foreground">{token}</p>
                  </div>
                  <Button type="button" variant="ghost" size="sm" onClick={resetTokenValidation} className="text-xs">
                    Change
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-email" className="text-foreground">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="your@email.com"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      className="pl-10"
                      disabled={isLoading}
                      required
                    />
                  </div>
                  {tokenEmail && registerEmail !== tokenEmail && (
                    <p className="rounded bg-warning/10 p-2 text-xs text-warning-foreground">
                      Note: the invitation was sent to {tokenEmail}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password" className="text-foreground">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="register-password"
                      type={showRegisterPassword ? 'text' : 'password'}
                      placeholder="Create a password"
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
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
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
                    <p className="text-xs text-destructive">Passwords do not match</p>
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
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
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
                <p className="text-sm text-muted-foreground">Sign in to continue your onboarding process</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-foreground">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="your@email.com"
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
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="login-password"
                    type={showLoginPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
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
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
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
                  Need an invitation?{' '}
                  <Link to="/invite/NORTH-2024-ABC123" className="text-primary hover:underline">
                    Use sample invite
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
