import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { AuthPage } from './pages/AuthPage'
import { DashboardPage } from './pages/DashboardPage'
import { WizardPage } from './pages/WizardPage'
import { ResultsPage } from './pages/ResultsPage'
import { SupabaseAuthProvider } from './context/SupabaseAuthContext'

function App() {
  return (
    <SupabaseAuthProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/wizard" element={<WizardPage />} />
            <Route path="/results/:id" element={<ResultsPage />} />
          </Routes>
        </div>
      </Router>
    </SupabaseAuthProvider>
  )
}

export default App