import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Textarea } from '../components/ui/textarea'
import { Badge } from '../components/ui/badge'
import { Header } from '../components/layout/Header'
import { Link } from 'react-router-dom'
import { Download, Edit, MessageSquare, Sparkles, ArrowLeft, RefreshCw } from 'lucide-react'

export function ResultsPage() {
  const [feedback, setFeedback] = useState('')
  const [isRegenerating, setIsRegenerating] = useState(false)

  const handleRegenerate = async () => {
    setIsRegenerating(true)
    // Simulate AI regeneration
    setTimeout(() => {
      setIsRegenerating(false)
      setFeedback('')
    }, 3000)
  }

  // Mock generated policy content
  const policyContent = `
# Privacy Policy for TechFlow SaaS

**Last updated: January 15, 2024**

## Introduction

TechFlow SaaS ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our software-as-a-service platform.

## Information We Collect

### Personal Information
- **Account Information**: Name, email address, and company details when you create an account
- **Usage Data**: Information about how you use our service, including features accessed and time spent
- **Communication Data**: Messages you send us through support channels

### Automatically Collected Information
- **Technical Data**: IP address, browser type, operating system, and device information
- **Analytics Data**: Pages visited, clicks, and user interactions within our platform
- **Performance Data**: System performance metrics and error logs

## How We Use Your Information

We use the collected information for the following purposes:

1. **Service Provision**: To provide, maintain, and improve our SaaS platform
2. **Account Management**: To create and manage your user account
3. **Customer Support**: To respond to your inquiries and provide technical support
4. **Product Development**: To develop new features and enhance existing functionality
5. **Security**: To protect against fraud, unauthorized access, and other security threats

## Information Sharing and Disclosure

We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:

- **Service Providers**: We may share information with trusted third-party vendors who assist us in operating our platform
- **Legal Requirements**: When required by law or to protect our rights and safety
- **Business Transfers**: In connection with a merger, acquisition, or sale of assets

## Data Security

We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

## Your Rights

Depending on your location, you may have certain rights regarding your personal information, including:

- The right to access your personal information
- The right to correct inaccurate information
- The right to delete your information
- The right to data portability

## Contact Us

If you have any questions about this Privacy Policy, please contact us at:
- Email: privacy@techflow.com
- Address: 123 Business Ave, Suite 100, City, State 12345

---

*This policy was generated using AI technology and should be reviewed by legal counsel before implementation.*
  `

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-serif font-bold text-slate-800">
                Generated Privacy Policy
              </h1>
              <p className="text-slate-600">TechFlow SaaS • Generated on January 15, 2024</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Badge variant="default" className="bg-green-600">
              <Sparkles className="h-3 w-3 mr-1" />
              AI Generated
            </Badge>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button className="bg-slate-800 hover:bg-slate-700">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Policy Content</CardTitle>
                  <Badge variant="secondary">Draft</Badge>
                </div>
                <CardDescription>
                  Review the generated policy and provide feedback for improvements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-slate max-w-none">
                  <div className="bg-white border rounded-lg p-6 font-serif leading-relaxed whitespace-pre-line">
                    {policyContent}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Feedback Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Provide Feedback
                </CardTitle>
                <CardDescription>
                  Help improve the policy by sharing your thoughts and requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="e.g., Add section about GDPR compliance, include cookie usage details, make language more user-friendly..."
                  className="min-h-[120px]"
                />
                <Button 
                  onClick={handleRegenerate}
                  disabled={!feedback.trim() || isRegenerating}
                  className="w-full bg-amber-600 hover:bg-amber-700"
                >
                  {isRegenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Regenerating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Regenerate with AI
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Policy Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Policy Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600">Business Name</p>
                  <p className="font-semibold">TechFlow SaaS</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Industry</p>
                  <p className="font-semibold">Software as a Service</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Compliance</p>
                  <p className="font-semibold">GDPR, CCPA</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Word Count</p>
                  <p className="font-semibold">~1,200 words</p>
                </div>
              </CardContent>
            </Card>

            {/* Subscription Upgrade */}
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader>
                <CardTitle className="text-lg text-amber-800">
                  Upgrade to Download
                </CardTitle>
                <CardDescription className="text-amber-700">
                  Subscribe to download this policy as a PDF and access advanced features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-amber-600 hover:bg-amber-700">
                  Upgrade Now
                </Button>
                <p className="text-xs text-amber-700 mt-2 text-center">
                  Starting at $29/month
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}