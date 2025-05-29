import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Header } from '../components/layout/Header'
import { Link, useNavigate } from 'react-router-dom'
import { Scale, Eye, EyeOff, MailCheck } from 'lucide-react'
import { useSupabaseAuth } from '../context/SupabaseAuthContext'

export function AuthPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [tab, setTab] = useState<'login' | 'signup' | 'forgot'>('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Login fields
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // Signup fields
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')

  // Forgot password
  const [forgotEmail, setForgotEmail] = useState('')

  const { signUp, signIn, forgotPassword, user } = useSupabaseAuth()
  const navigate = useNavigate()

  // Redirect if already logged in
  if (user) {
    navigate('/dashboard')
  }

  // Handlers
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)
    const { error } = await signIn(loginEmail, loginPassword)
    if (error) {
      setError(error.message)
    } else {
      setSuccess('Logged in! Redirecting...')
      setTimeout(() => navigate('/dashboard'), 1000)
    }
    setLoading(false)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)
    const { error } = await signUp(signupEmail, signupPassword, firstName, lastName)
    if (error) {
      setError(error.message)
    } else {
      setSuccess('Account created! Redirecting...')
      setTimeout(() => navigate('/dashboard'), 1000)
    }
    setLoading(false)
  }

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)
    const { error } = await forgotPassword(forgotEmail)
    if (error) {
      setError(error.message)
    } else {
      setSuccess('Password reset email sent! Check your inbox.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2 mb-6">
              <Scale className="h-8 w-8 text-slate-800" />
              <span className="font-serif font-bold text-xl text-slate-800">
                LegalAI
              </span>
            </Link>
            <h1 className="text-2xl font-serif font-bold text-slate-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-slate-600">
              Sign in to your account or create a new one
            </p>
          </div>

          <Tabs value={tab} onValueChange={v => setTab(v as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Log In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Login */}
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Sign In</CardTitle>
                  <CardDescription>
                    Enter your email and password to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {error && <div className="bg-red-100 text-red-700 rounded px-3 py-2 text-sm">{error}</div>}
                  {success && <div className="bg-green-100 text-green-700 rounded px-3 py-2 text-sm">{success}</div>}
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Enter your email"
                        className="w-full"
                        value={loginEmail}
                        onChange={e => setLoginEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          autoComplete="current-password"
                          placeholder="Enter your password"
                          className="w-full pr-10"
                          value={loginPassword}
                          onChange={e => setLoginPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          tabIndex={-1}
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-slate-800 hover:bg-slate-700" disabled={loading}>
                      {loading ? 'Signing In...' : 'Sign In'}
                    </Button>
                  </form>
                  <div className="text-center mt-2">
                    <button
                      type="button"
                      className="text-sm text-slate-600 hover:text-slate-800 underline"
                      onClick={() => setTab('forgot')}
                    >
                      Forgot your password?
                    </button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Signup */}
            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>Create Account</CardTitle>
                  <CardDescription>
                    Start your free trial and begin generating legal policies
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {error && <div className="bg-red-100 text-red-700 rounded px-3 py-2 text-sm">{error}</div>}
                  {success && <div className="bg-green-100 text-green-700 rounded px-3 py-2 text-sm">{success}</div>}
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          className="w-full"
                          value={firstName}
                          onChange={e => setFirstName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          className="w-full"
                          value={lastName}
                          onChange={e => setLastName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signupEmail">Email</Label>
                      <Input
                        id="signupEmail"
                        type="email"
                        autoComplete="email"
                        placeholder="Enter your email"
                        className="w-full"
                        value={signupEmail}
                        onChange={e => setSignupEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signupPassword">Password</Label>
                      <div className="relative">
                        <Input
                          id="signupPassword"
                          type={showPassword ? 'text' : 'password'}
                          autoComplete="new-password"
                          placeholder="Create a strong password"
                          className="w-full pr-10"
                          value={signupPassword}
                          onChange={e => setSignupPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          tabIndex={-1}
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-slate-800 hover:bg-slate-700" disabled={loading}>
                      {loading ? 'Creating Account...' : 'Start Free Trial'}
                    </Button>
                  </form>
                  <p className="text-xs text-slate-600 text-center mt-2">
                    By signing up, you agree to our{' '}
                    <a href="#" className="underline hover:text-slate-800">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="underline hover:text-slate-800">Privacy Policy</a>
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Forgot Password */}
            <TabsContent value="forgot">
              <Card>
                <CardHeader>
                  <CardTitle>Reset Password</CardTitle>
                  <CardDescription>
                    Enter your email and we'll send you a password reset link
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {error && <div className="bg-red-100 text-red-700 rounded px-3 py-2 text-sm">{error}</div>}
                  {success && <div className="bg-green-100 text-green-700 rounded px-3 py-2 text-sm flex items-center"><MailCheck className="h-4 w-4 mr-2" />{success}</div>}
                  <form onSubmit={handleForgot} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="forgotEmail">Email</Label>
                      <Input
                        id="forgotEmail"
                        type="email"
                        autoComplete="email"
                        placeholder="Enter your email"
                        className="w-full"
                        value={forgotEmail}
                        onChange={e => setForgotEmail(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-slate-800 hover:bg-slate-700" disabled={loading}>
                      {loading ? 'Sending...' : 'Send Reset Link'}
                    </Button>
                  </form>
                  <div className="text-center mt-2">
                    <button
                      type="button"
                      className="text-sm text-slate-600 hover:text-slate-800 underline"
                      onClick={() => setTab('login')}
                    >
                      Back to Login
                    </button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
