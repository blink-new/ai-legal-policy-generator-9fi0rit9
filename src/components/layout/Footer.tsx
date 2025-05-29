import { Link } from 'react-router-dom'
import { Scale, Twitter, Linkedin, Github } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Scale className="h-8 w-8 text-slate-800" />
              <span className="font-serif font-bold text-xl text-slate-800">
                LegalAI
              </span>
            </Link>
            <p className="text-slate-600 mb-6 max-w-md">
              AI-powered legal policy generation for modern businesses. 
              Create professional legal documents in minutes, not days.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-slate-600 hover:text-slate-800 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="#" className="text-slate-600 hover:text-slate-800 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="#" className="text-slate-600 hover:text-slate-800 transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link to="#" className="text-slate-600 hover:text-slate-800 transition-colors">
                  API
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-slate-600 hover:text-slate-800 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="#" className="text-slate-600 hover:text-slate-800 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="#" className="text-slate-600 hover:text-slate-800 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="#" className="text-slate-600 hover:text-slate-800 transition-colors">
                  Legal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-600 text-sm">
            © 2024 LegalAI. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="#" className="text-slate-600 hover:text-slate-800 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-slate-600 hover:text-slate-800 text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="#" className="text-slate-600 hover:text-slate-800 text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}