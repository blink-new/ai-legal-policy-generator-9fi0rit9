import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Header } from '../components/layout/Header'
import { Link } from 'react-router-dom'
import { Plus, FileText, Clock, Download, Edit } from 'lucide-react'

import { useSupabaseAuth } from '../context/SupabaseAuthContext'
import { useNavigate } from 'react-router-dom'

export function DashboardPage() {
  const policies = [
    {
      id: 1,
      title: 'Privacy Policy',
      type: 'Privacy',
      status: 'completed',
      createdAt: '2024-01-15',
      businessName: 'TechFlow SaaS'
    },
    {
      id: 2,
      title: 'Terms of Service',
      type: 'Terms',
      status: 'draft',
      createdAt: '2024-01-14',
      businessName: 'TechFlow SaaS'
    }
  ]

  const { user, signOut } = useSupabaseAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/auth')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-slate-800 mb-2">
              Your Legal Policies
            </h1>
            <p className="text-slate-600">
              Manage and generate professional legal documents for your business
            </p>
          </div>
          <div className="flex flex-col items-end space-y-2 md:space-y-0 md:flex-row md:items-center md:space-x-6">
            <div className="text-right text-slate-700 text-sm">
              {user ? (
                <div className="font-semibold">{user.email}</div>
              ) : null}
            </div>
            <Link to="/wizard">
              <Button className="bg-slate-800 hover:bg-slate-700 text-white mt-4 md:mt-0">
                <Plus className="h-4 w-4 mr-2" />
                Create New Policy
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-slate-600">Total Policies</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-amber-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-slate-600">In Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Download className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold">9</p>
                  <p className="text-slate-600">Downloaded</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Policies List */}
        <div className="grid gap-6">
          <h2 className="text-xl font-semibold text-slate-800">Recent Policies</h2>
          
          {policies.map((policy) => (
            <Card key={policy.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-slate-800">{policy.title}</h3>
                      <Badge 
                        variant={policy.status === 'completed' ? 'default' : 'secondary'}
                        className="ml-3"
                      >
                        {policy.status}
                      </Badge>
                    </div>
                    <p className="text-slate-600 mb-1">Business: {policy.businessName}</p>
                    <p className="text-sm text-slate-500">
                      Created on {new Date(policy.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-3 mt-4 md:mt-0">
                    <Link to={`/results/${policy.id}`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </Link>
                    {policy.status === 'completed' && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State for new users */}
        {policies.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <CardTitle className="mb-2">No policies yet</CardTitle>
              <CardDescription className="mb-6">
                Get started by creating your first legal policy
              </CardDescription>
              <Link to="/wizard">
                <Button className="bg-slate-800 hover:bg-slate-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Policy
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}