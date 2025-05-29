import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { Checkbox } from '../components/ui/checkbox'
import { Header } from '../components/layout/Header'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Globe, Building } from 'lucide-react'

export function WizardPage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [wizardData, setWizardData] = useState({
    policyTypes: [] as string[],
    businessName: '',
    businessDescription: '',
    websiteUrl: '',
    industryType: '',
    dataCollection: '',
    userLocation: ''
  })

  const totalSteps = 5

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      // Generate policy
      navigate('/results/new')
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePolicyTypeToggle = (type: string) => {
    setWizardData(prev => ({
      ...prev,
      policyTypes: prev.policyTypes.includes(type)
        ? prev.policyTypes.filter(t => t !== type)
        : [...prev.policyTypes, type]
    }))
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-serif font-bold text-slate-800">
              Policy Generator Wizard
            </h1>
            <span className="text-slate-600">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-slate-800 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-8">
            {/* Step 1: Policy Types */}
            {currentStep === 1 && (
              <div>
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-xl">Select Policy Types</CardTitle>
                  <CardDescription>
                    Choose which legal policies you need for your business
                  </CardDescription>
                </CardHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'privacy', name: 'Privacy Policy', description: 'Data collection and usage terms' },
                    { id: 'terms', name: 'Terms of Service', description: 'User agreement and service terms' },
                    { id: 'cookies', name: 'Cookie Policy', description: 'Cookie usage and preferences' },
                    { id: 'disclaimer', name: 'Disclaimer', description: 'Liability limitations and disclaimers' }
                  ].map((policy) => (
                    <div 
                      key={policy.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                        wizardData.policyTypes.includes(policy.id)
                          ? 'border-slate-800 bg-slate-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                      onClick={() => handlePolicyTypeToggle(policy.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <Checkbox 
                          checked={wizardData.policyTypes.includes(policy.id)}
                          onChange={() => handlePolicyTypeToggle(policy.id)}
                        />
                        <div>
                          <h3 className="font-semibold">{policy.name}</h3>
                          <p className="text-sm text-slate-600">{policy.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Business Information */}
            {currentStep === 2 && (
              <div>
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-xl">Business Information</CardTitle>
                  <CardDescription>
                    Tell us about your business to personalize the policies
                  </CardDescription>
                </CardHeader>
                
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                      id="businessName"
                      value={wizardData.businessName}
                      onChange={(e) => setWizardData(prev => ({ ...prev, businessName: e.target.value }))}
                      placeholder="Enter your business name"
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="businessDescription">Business Description *</Label>
                    <Textarea
                      id="businessDescription"
                      value={wizardData.businessDescription}
                      onChange={(e) => setWizardData(prev => ({ ...prev, businessDescription: e.target.value }))}
                      placeholder="Describe what your business does, your products/services, and target audience"
                      className="mt-2 min-h-[100px]"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="industryType">Industry Type</Label>
                    <Input
                      id="industryType"
                      value={wizardData.industryType}
                      onChange={(e) => setWizardData(prev => ({ ...prev, industryType: e.target.value }))}
                      placeholder="e.g., SaaS, E-commerce, Healthcare, Education"
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Website Analysis */}
            {currentStep === 3 && (
              <div>
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-xl">Website Analysis</CardTitle>
                  <CardDescription>
                    Provide your website URL for automated business analysis (optional)
                  </CardDescription>
                </CardHeader>
                
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <Globe className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                      <div>
                        <h3 className="font-semibold text-blue-800 mb-1">Smart Website Analysis</h3>
                        <p className="text-sm text-blue-700">
                          Our AI will analyze your website to automatically understand your business model, 
                          services, and data practices to generate more accurate policies.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="websiteUrl">Website URL</Label>
                    <Input
                      id="websiteUrl"
                      type="url"
                      value={wizardData.websiteUrl}
                      onChange={(e) => setWizardData(prev => ({ ...prev, websiteUrl: e.target.value }))}
                      placeholder="https://www.yourbusiness.com"
                      className="mt-2"
                    />
                    <p className="text-sm text-slate-600 mt-1">
                      Leave empty to proceed with manual information only
                    </p>
                  </div>
                  
                  {wizardData.websiteUrl && (
                    <Button variant="outline" className="w-full">
                      <Building className="h-4 w-4 mr-2" />
                      Analyze Website
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Data Practices */}
            {currentStep === 4 && (
              <div>
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-xl">Data Practices</CardTitle>
                  <CardDescription>
                    Help us understand how your business collects and uses data
                  </CardDescription>
                </CardHeader>
                
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="dataCollection">Data Collection Practices</Label>
                    <Textarea
                      id="dataCollection"
                      value={wizardData.dataCollection}
                      onChange={(e) => setWizardData(prev => ({ ...prev, dataCollection: e.target.value }))}
                      placeholder="Describe what data you collect (email, name, usage analytics, payment info, etc.) and how you use it"
                      className="mt-2 min-h-[100px]"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="userLocation">Primary User Location</Label>
                    <Input
                      id="userLocation"
                      value={wizardData.userLocation}
                      onChange={(e) => setWizardData(prev => ({ ...prev, userLocation: e.target.value }))}
                      placeholder="e.g., United States, European Union, Global"
                      className="mt-2"
                    />
                    <p className="text-sm text-slate-600 mt-1">
                      This helps ensure compliance with regional regulations (GDPR, CCPA, etc.)
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Review */}
            {currentStep === 5 && (
              <div>
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-xl">Review & Generate</CardTitle>
                  <CardDescription>
                    Review your information before generating your legal policies
                  </CardDescription>
                </CardHeader>
                
                <div className="space-y-6">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-3">Selected Policies:</h3>
                    <div className="flex flex-wrap gap-2">
                      {wizardData.policyTypes.map(type => (
                        <span key={type} className="bg-slate-200 px-3 py-1 rounded-full text-sm">
                          {type.charAt(0).toUpperCase() + type.slice(1)} Policy
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-3">Business Information:</h3>
                    <p><strong>Name:</strong> {wizardData.businessName}</p>
                    <p><strong>Industry:</strong> {wizardData.industryType}</p>
                    <p><strong>Website:</strong> {wizardData.websiteUrl || 'Not provided'}</p>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-800 mb-2">Ready to Generate!</h3>
                    <p className="text-green-700 text-sm">
                      Your personalized legal policies will be generated using AI based on the information you provided. 
                      This typically takes 30-60 seconds.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={currentStep === 1 && wizardData.policyTypes.length === 0}
                className="bg-slate-800 hover:bg-slate-700"
              >
                {currentStep === totalSteps ? 'Generate Policies' : 'Next'}
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}