import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { Scale, Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Scale className="h-8 w-8 text-slate-800" />
            <span className="font-serif font-bold text-xl text-slate-800">
              LegalAI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="#features" className="text-slate-600 hover:text-slate-800 transition-colors">
              Features
            </Link>
            <Link to="#pricing" className="text-slate-600 hover:text-slate-800 transition-colors">
              Pricing
            </Link>
            <Link to="#about" className="text-slate-600 hover:text-slate-800 transition-colors">
              About
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/auth">
              <Button variant="ghost" className="text-slate-600 hover:text-slate-800">
                Log In
              </Button>
            </Link>
            <Link to="/auth">
              <Button className="bg-slate-800 hover:bg-slate-700 text-white">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-slate-600 hover:text-slate-800 hover:bg-slate-100"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col space-y-4">
              <Link
                to="#features"
                className="text-slate-600 hover:text-slate-800 transition-colors px-4 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                to="#pricing"
                className="text-slate-600 hover:text-slate-800 transition-colors px-4 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                to="#about"
                className="text-slate-600 hover:text-slate-800 transition-colors px-4 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <div className="border-t border-slate-200 pt-4 px-4 space-y-2">
                <Link to="/auth" className="block w-full">
                  <Button variant="ghost" className="w-full justify-start text-slate-600 hover:text-slate-800">
                    Log In
                  </Button>
                </Link>
                <Link to="/auth" className="block w-full">
                  <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}