import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Copy, Check, Mail, Shield, Globe, Building, Users, Database, Cog } from 'lucide-react';

const TermsGenerator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [showFullDocument, setShowFullDocument] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    websiteUrl: '',
    country: '',
    state: '',
    productType: '',
    targetUsers: [],
    dataCollected: [],
    thirdPartyServices: [],
    userEmail: ''
  });

  const countries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'India', 'Australia', 'Other'];
  const productTypes = ['Physical Products', 'Digital Products', 'Software/SaaS', 'Services', 'Marketplace', 'Subscription'];
  const targetUserOptions = ['European Union (GDPR)', 'California (CCPA)', 'India (IT Act)', 'Global'];
  const dataOptions = ['Email addresses', 'Cookies', 'IP addresses', 'Payment information', 'Personal details', 'Usage analytics'];
  const serviceOptions = ['Google Analytics', 'Stripe', 'PayPal', 'Mailchimp', 'Facebook Pixel', 'Shopify', 'WooCommerce', 'Zendesk'];

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayField = (field, value) => {
    const current = formData[field] || [];
    const updated = current.includes(value) 
      ? current.filter(item => item !== value)
      : [...current, value];
    updateFormData(field, updated);
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
    else setShowEmailGate(true);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleEmailSubmit = () => {
    console.log('Email captured:', formData.userEmail);
    setShowFullDocument(true);
  };

  const generateDocument = () => {
    const hasGDPR = formData.targetUsers.includes('European Union (GDPR)');
    const hasCCPA = formData.targetUsers.includes('California (CCPA)');
    const hasIndianIT = formData.targetUsers.includes('India (IT Act)');

    return `
TERMS AND CONDITIONS

Last updated: ${new Date().toLocaleDateString()}

1. ACCEPTANCE OF TERMS

By accessing and using ${formData.businessName || '[Business Name]'} website (${formData.websiteUrl || '[Website URL]'}), you accept and agree to be bound by the terms and provision of this agreement.

2. BUSINESS INFORMATION

Company: ${formData.businessName || '[Business Name]'}
Website: ${formData.websiteUrl || '[Website URL]'}
Location: ${formData.state ? `${formData.state}, ` : ''}${formData.country || '[Country]'}
Business Type: ${formData.productType || '[Product/Service Type]'}

3. PRODUCTS AND SERVICES

We provide ${formData.productType?.toLowerCase() || 'products and services'} through our platform. All products and services are subject to availability and may be modified or discontinued without notice.

4. USER ACCOUNTS

To access certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.

5. DATA COLLECTION AND PRIVACY

We collect the following types of data:
${formData.dataCollected.map(item => `• ${item}`).join('\n')}

Third-party services we use:
${formData.thirdPartyServices.map(service => `• ${service}`).join('\n')}

${hasGDPR ? `
6. GDPR COMPLIANCE (EU Users)

If you are located in the European Union, you have the following rights under GDPR:
• Right to access your personal data
• Right to rectification of inaccurate data
• Right to erasure ("right to be forgotten")
• Right to restrict processing
• Right to data portability
• Right to object to processing
• Rights related to automated decision-making

To exercise these rights, contact us at [contact email].
` : ''}

${hasCCPA ? `
7. CCPA COMPLIANCE (California Users)

California residents have the right to:
• Know what personal information is collected
• Know whether personal information is sold or disclosed
• Say no to the sale of personal information
• Access personal information
• Equal service and pricing

To exercise these rights, contact us at [contact email].
` : ''}

${hasIndianIT ? `
8. INDIAN IT ACT COMPLIANCE

In accordance with India's Information Technology Act, 2000:
• We implement reasonable security practices
• We notify users of data breaches as required
• We comply with data localization requirements where applicable
• We maintain proper records of data processing activities
` : ''}

9. PROHIBITED USES

You may not use our service:
• For any unlawful purpose or to solicit others to perform illegal acts
• To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances
• To infringe upon or violate our intellectual property rights or the intellectual property rights of others
• To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate
• To submit false or misleading information

10. INTELLECTUAL PROPERTY

The service and its original content, features, and functionality are and will remain the exclusive property of ${formData.businessName || '[Business Name]'} and its licensors.

11. TERMINATION

We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever.

12. LIMITATION OF LIABILITY

In no event shall ${formData.businessName || '[Business Name]'}, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages.

13. GOVERNING LAW

These terms shall be governed by and construed in accordance with the laws of ${formData.country || '[Country]'}, without regard to its conflict of law provisions.

14. CHANGES TO TERMS

We reserve the right, at our sole discretion, to modify or replace these terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.

15. CONTACT INFORMATION

If you have any questions about these Terms and Conditions, please contact us at:

Email: [contact email]
Address: [address]


---

DISCLAIMER: This document is for informational purposes only and does not constitute legal advice. Please consult with a qualified attorney for legal advice specific to your situation.
`.trim();
  };

  const getPreview = () => {
    const fullDoc = generateDocument();
    const lines = fullDoc.split('\n');
    return lines.slice(0, 15).join('\n') + '\n\n[Document continues...]';
  };

  const [copySuccess, setCopySuccess] = useState(false);

  const generateHTMLDocument = () => {
    const hasGDPR = formData.targetUsers.includes('European Union (GDPR)');
    const hasCCPA = formData.targetUsers.includes('California (CCPA)');
    const hasIndianIT = formData.targetUsers.includes('India (IT Act)');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Terms and Conditions - ${formData.businessName || '[Business Name]'}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .container {
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #2563eb;
            border-bottom: 3px solid #2563eb;
            padding-bottom: 10px;
            margin-bottom: 30px;
        }
        h2 {
            color: #1e40af;
            margin-top: 30px;
            margin-bottom: 15px;
            border-left: 4px solid #3b82f6;
            padding-left: 15px;
        }
        .business-info {
            background: #eff6ff;
            padding: 20px;
            border-radius: 6px;
            margin: 20px 0;
        }
        .compliance-section {
            background: #f0f9ff;
            border: 1px solid #0ea5e9;
            border-radius: 6px;
            padding: 20px;
            margin: 20px 0;
        }
        .disclaimer {
            background: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 6px;
            padding: 15px;
            margin: 30px 0;
            font-size: 14px;
        }
        ul {
            padding-left: 20px;
        }
        li {
            margin-bottom: 8px;
        }
        .highlight {
            background: #dbeafe;
            padding: 2px 6px;
            border-radius: 3px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>TERMS AND CONDITIONS</h1>
        
        <p><strong>Last updated:</strong> ${new Date().toLocaleDateString()}</p>

        <h2>1. ACCEPTANCE OF TERMS</h2>
        <p>By accessing and using <span class="highlight">${formData.businessName || '[Business Name]'}</span> website (<a href="${formData.websiteUrl || '#'}">${formData.websiteUrl || '[Website URL]'}</a>), you accept and agree to be bound by the terms and provision of this agreement.</p>

        <h2>2. BUSINESS INFORMATION</h2>
        <div class="business-info">
            <p><strong>Company:</strong> ${formData.businessName || '[Business Name]'}</p>
            <p><strong>Website:</strong> <a href="${formData.websiteUrl || '#'}">${formData.websiteUrl || '[Website URL]'}</a></p>
            <p><strong>Location:</strong> ${formData.state ? `${formData.state}, ` : ''}${formData.country || '[Country]'}</p>
            <p><strong>Business Type:</strong> ${formData.productType || '[Product/Service Type]'}</p>
        </div>

        <h2>3. PRODUCTS AND SERVICES</h2>
        <p>We provide <span class="highlight">${formData.productType?.toLowerCase() || 'products and services'}</span> through our platform. All products and services are subject to availability and may be modified or discontinued without notice.</p>

        <h2>4. USER ACCOUNTS</h2>
        <p>To access certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.</p>

        <h2>5. DATA COLLECTION AND PRIVACY</h2>
        <p><strong>We collect the following types of data:</strong></p>
        <ul>
            ${formData.dataCollected.map(item => `<li>${item}</li>`).join('')}
        </ul>

        <p><strong>Third-party services we use:</strong></p>
        <ul>
            ${formData.thirdPartyServices.map(service => `<li>${service}</li>`).join('')}
        </ul>

        ${hasGDPR ? `
        <div class="compliance-section">
            <h2>6. GDPR COMPLIANCE (EU Users)</h2>
            <p>If you are located in the European Union, you have the following rights under GDPR:</p>
            <ul>
                <li>Right to access your personal data</li>
                <li>Right to rectification of inaccurate data</li>
                <li>Right to erasure ("right to be forgotten")</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
                <li>Rights related to automated decision-making</li>
            </ul>
            <p>To exercise these rights, contact us at <strong>[contact email]</strong>.</p>
        </div>
        ` : ''}

        ${hasCCPA ? `
        <div class="compliance-section">
            <h2>7. CCPA COMPLIANCE (California Users)</h2>
            <p>California residents have the right to:</p>
            <ul>
                <li>Know what personal information is collected</li>
                <li>Know whether personal information is sold or disclosed</li>
                <li>Say no to the sale of personal information</li>
                <li>Access personal information</li>
                <li>Equal service and pricing</li>
            </ul>
            <p>To exercise these rights, contact us at <strong>[contact email]</strong>.</p>
        </div>
        ` : ''}

        ${hasIndianIT ? `
        <div class="compliance-section">
            <h2>8. INDIAN IT ACT COMPLIANCE</h2>
            <p>In accordance with India's Information Technology Act, 2000:</p>
            <ul>
                <li>We implement reasonable security practices</li>
                <li>We notify users of data breaches as required</li>
                <li>We comply with data localization requirements where applicable</li>
                <li>We maintain proper records of data processing activities</li>
            </ul>
        </div>
        ` : ''}

        <h2>9. PROHIBITED USES</h2>
        <p>You may not use our service:</p>
        <ul>
            <li>For any unlawful purpose or to solicit others to perform illegal acts</li>
            <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
            <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
            <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
            <li>To submit false or misleading information</li>
        </ul>

        <h2>10. INTELLECTUAL PROPERTY</h2>
        <p>The service and its original content, features, and functionality are and will remain the exclusive property of <span class="highlight">${formData.businessName || '[Business Name]'}</span> and its licensors.</p>

        <h2>11. TERMINATION</h2>
        <p>We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever.</p>

        <h2>12. LIMITATION OF LIABILITY</h2>
        <p>In no event shall <span class="highlight">${formData.businessName || '[Business Name]'}</span>, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages.</p>

        <h2>13. GOVERNING LAW</h2>
        <p>These terms shall be governed by and construed in accordance with the laws of <span class="highlight">${formData.country || '[Country]'}</span>, without regard to its conflict of law provisions.</p>

        <h2>14. CHANGES TO TERMS</h2>
        <p>We reserve the right, at our sole discretion, to modify or replace these terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.</p>

        <h2>15. CONTACT INFORMATION</h2>
        <p>If you have any questions about these Terms and Conditions, please contact us at:</p>
        <ul>
            <li><strong>Email:</strong>  ${formData.userEmail}</li> 
            <li><strong>Address:</strong>  ${formData.country || '[Country]'}</li>
        </ul>

        <div class="disclaimer">
            <p><strong>DISCLAIMER:</strong> This document is for informational purposes only and does not constitute legal advice. Please consult with a qualified attorney for legal advice specific to your situation.</p>
        </div>
    </div>
</body>
</html>`;
  };

  const copyToClipboard = async () => {
    try {
      const htmlContent = generateHTMLDocument();
      await navigator.clipboard.writeText(htmlContent);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = generateHTMLDocument();
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    }
  };

  if (showEmailGate && !showFullDocument) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <Shield className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Terms & Conditions are Ready!</h2>
              <p className="text-gray-600">Enter your email to unlock the full document</p>
              
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-8 relative">
              <div className="absolute inset-0 bg-white bg-opacity-80 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <Mail className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                  <p className="text-gray-700 font-medium">Enter your email to view the full document</p>
                </div>
              </div>
              <pre className="text-sm text-gray-800 font-mono whitespace-pre-wrap blur-sm">
                {getPreview()}
              </pre>
            </div>

            <div className="max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                value={formData.userEmail}
                onChange={(e) => updateFormData('userEmail', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-4"
                required
              />
              <button
                onClick={handleEmailSubmit}
                disabled={!formData.userEmail}
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Get My Terms & Conditions
              </button>
              <p className="text-xs text-gray-500 mt-4 text-center">
                By submitting your email, you agree to our data handling practices under GDPR/CCPA.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showFullDocument) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Terms & Conditions for {formData.businessName || '[Business Name]'}</h2>
              <div className="flex gap-3">
                <button
                  onClick={copyToClipboard}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 ${
                    copySuccess 
                      ? 'bg-green-600 text-white' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {copySuccess ? (
                    <>
                      <Check className="w-5 h-5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      Copy as HTML
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 max-h-[600px] overflow-y-scroll">
              <div 
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: generateHTMLDocument().match(/<body[^>]*>(.*?)<\/body>/s)?.[1] || generateDocument() 
                }}
              />
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">How to use your HTML Terms & Conditions:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Click "Copy as HTML" to copy the complete HTML document</li>
                <li>• Paste directly into your website or CMS</li>
                <li>• The HTML includes professional styling and responsive design</li>
                <li>• Replace placeholder text like [contact email] with your actual details</li>
              </ul>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Disclaimer:</strong> This document is for informational purposes only and does not constitute legal advice. 
                Please consult with a qualified attorney for legal advice specific to your situation.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Shield className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms & Conditions Generator</h1>
            <p className="text-gray-600">Generate GDPR, CCPA & IT Act compliant terms for your eCommerce business</p>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  {step < 4 && <ChevronRight className="w-5 h-5 text-gray-400 mx-2" />}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Business Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Building className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-bold text-gray-900">Business Information</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => updateFormData('businessName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Your Company Name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website URL *</label>
                  <input
                    type="url"
                    value={formData.websiteUrl}
                    onChange={(e) => updateFormData('websiteUrl', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                  <select
                    value={formData.country}
                    onChange={(e) => updateFormData('country', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select Country</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State/Province</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => updateFormData('state', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="State or Province"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Product/Service & Target Users */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-bold text-gray-900">Products & Target Market</h2>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product/Service Type *</label>
                <select
                  value={formData.productType}
                  onChange={(e) => updateFormData('productType', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Select Type</option>
                  {productTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Target Users (Select all that apply) *</label>
                <div className="grid md:grid-cols-2 gap-3">
                  {targetUserOptions.map(option => (
                    <label key={option} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.targetUsers.includes(option)}
                        onChange={() => toggleArrayField('targetUsers', option)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Data Collection */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Database className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-bold text-gray-900">Data Collection</h2>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">What data do you collect? *</label>
                <div className="grid md:grid-cols-2 gap-3">
                  {dataOptions.map(option => (
                    <label key={option} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.dataCollected.includes(option)}
                        onChange={() => toggleArrayField('dataCollected', option)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Third-party Services */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Cog className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-bold text-gray-900">Third-party Services</h2>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Which services do you use?</label>
                <div className="grid md:grid-cols-2 gap-3">
                  {serviceOptions.map(service => (
                    <label key={service} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.thirdPartyServices.includes(service)}
                        onChange={() => toggleArrayField('thirdPartyServices', service)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{service}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>
            
            <button
              onClick={nextStep}
              className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {currentStep === 4 ? 'Generate Terms' : 'Next'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsGenerator;