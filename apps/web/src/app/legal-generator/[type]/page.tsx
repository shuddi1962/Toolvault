"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const VALID_TYPES = ["privacy-policy", "terms-of-service", "cookie-policy", "eula"] as const;
type LegalType = (typeof VALID_TYPES)[number];

const TYPE_LABELS: Record<LegalType, string> = {
  "privacy-policy": "Privacy Policy",
  "terms-of-service": "Terms of Service",
  "cookie-policy": "Cookie Policy",
  eula: "End User License Agreement",
};

interface FormData {
  companyName: string;
  websiteUrl: string;
  contactEmail: string;
  businessAddress: string;
  businessType: string;
}

function generatePrivacyPolicy(data: FormData): string {
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `PRIVACY POLICY
Last Updated: ${date}

${data.companyName} ("we", "our", or "us") operates the ${data.websiteUrl} website. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.

1. INFORMATION WE COLLECT
We may collect information about you in a variety of ways. The information we may collect via the website includes:

Personal Data: Personally identifiable information, such as your name, email address, and business address, that you voluntarily give to us when you fill out a form on the website.

Derivative Data: Information our servers automatically collect when you access the website, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the website.

2. USE OF YOUR INFORMATION
We may use information collected about you via the website to:
- Provide and manage our services
- Communicate with you about updates, offers, and promotions
- Improve our website and user experience
- Ensure compliance with our Terms of Service
- Detect and prevent fraud or unauthorized access

3. COOKIES AND TRACKING TECHNOLOGIES
We may use cookies, web beacons, tracking pixels, and other tracking technologies on the website to help customize the website and improve your experience. For more information, please refer to our Cookie Policy.

4. THIRD-PARTY SHARING
We may share your information with third parties only in the following circumstances:
- With service providers who assist in operating our website
- To comply with legal obligations or protect our rights
- In connection with a merger, acquisition, or sale of assets
- With your explicit consent

5. YOUR RIGHTS
Depending on your location, you may have the following rights:
- Access to your personal data
- Correction of inaccurate data
- Deletion of your personal data
- Objection to processing
- Data portability

6. DATA SECURITY
We use administrative, technical, and physical security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.

7. CONTACT US
If you have questions about this Privacy Policy, please contact us at:
${data.contactEmail}
${data.businessAddress}`;
}

function generateTermsOfService(data: FormData): string {
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `TERMS OF SERVICE
Last Updated: ${date}

Welcome to ${data.companyName}. These Terms of Service ("Terms") govern your access to and use of ${data.websiteUrl} and our services. By accessing or using our services, you agree to be bound by these Terms.

1. ACCEPTANCE OF TERMS
By accessing or using our services, you confirm that you are at least 18 years of age and agree to comply with and be bound by these Terms. If you do not agree to these Terms, please do not use our services.

2. SERVICES DESCRIPTION
${data.companyName} provides ${data.businessType} services. We reserve the right to modify, suspend, or discontinue any part of our services at any time without prior notice.

3. USER ACCOUNTS
You may be required to create an account to access certain features. You are responsible for:
- Maintaining the confidentiality of your account credentials
- All activities that occur under your account
- Notifying us immediately of any unauthorized use

4. PAYMENT TERMS
- All fees are quoted in USD unless otherwise specified
- Payment is due upon subscription or purchase
- We reserve the right to change pricing with 30 days' notice
- Refunds are handled on a case-by-case basis

5. INTELLECTUAL PROPERTY
All content, features, and functionality of our services are owned by ${data.companyName} and are protected by copyright, trademark, and other intellectual property laws.

6. LIMITATION OF LIABILITY
To the maximum extent permitted by law, ${data.companyName} shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.

7. TERMINATION
We may terminate or suspend your access to our services immediately, without prior notice, for conduct that we determine, in our sole discretion, violates these Terms or is harmful to other users or third parties.

8. GOVERNING LAW
These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles.

9. CONTACT US
For questions about these Terms, contact us at:
${data.contactEmail}
${data.businessAddress}`;
}

function generateCookiePolicy(data: FormData): string {
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `COOKIE POLICY
Last Updated: ${date}

This Cookie Policy explains how ${data.companyName} ("we", "our", or "us") uses cookies and similar technologies when you visit ${data.websiteUrl}.

1. WHAT ARE COOKIES
Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.

2. TYPES OF COOKIES WE USE

Essential Cookies: These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and account access.

Functional Cookies: These cookies allow the website to remember choices you make, such as your language preference or region.

Analytics Cookies: These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.

Marketing Cookies: These cookies are used to track visitors across websites to display relevant advertisements.

3. HOW WE USE COOKIES
We use cookies to:
- Remember your preferences and settings
- Analyze website traffic and usage patterns
- Improve our services and user experience
- Provide personalized content and advertisements
- Ensure security and prevent fraud

4. THIRD-PARTY COOKIES
We may allow third-party service providers to place cookies on your device for the purposes described above. These third parties include analytics providers, advertising networks, and social media platforms.

5. MANAGING COOKIES
You can control and manage cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our website.

To manage cookies in common browsers:
- Chrome: Settings > Privacy and Security > Cookies
- Firefox: Options > Privacy & Security > Cookies
- Safari: Preferences > Privacy > Cookies
- Edge: Settings > Privacy and Services > Cookies

6. UPDATES TO THIS POLICY
We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated "Last Updated" date.

7. CONTACT US
If you have questions about our use of cookies, please contact us at:
${data.contactEmail}
${data.businessAddress}`;
}

function generateEULA(data: FormData): string {
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `END USER LICENSE AGREEMENT (EULA)
Last Updated: ${date}

This End User License Agreement ("Agreement") is a legal agreement between you ("User" or "you") and ${data.companyName} ("Licensor", "we", "our", or "us") for the use of our software available at ${data.websiteUrl}.

1. GRANT OF LICENSE
Subject to the terms of this Agreement, ${data.companyName} grants you a limited, non-exclusive, non-transferable, revocable license to use the software for your personal or internal business purposes.

2. RESTRICTIONS
You shall not:
- Copy, modify, or distribute the software
- Reverse engineer, decompile, or disassemble the software
- Remove or alter any proprietary notices or labels
- Sublicense, sell, or otherwise transfer the software to third parties
- Use the software for any unlawful purpose
- Attempt to gain unauthorized access to any portion of the software

3. INTELLECTUAL PROPERTY
The software is owned by ${data.companyName} and is protected by copyright, trademark, and other intellectual property laws. This Agreement does not grant you any rights to use ${data.companyName}'s trademarks, logos, or other brand features.

4. UPDATES AND MODIFICATIONS
We may release updates or modifications to the software at our discretion. You acknowledge that we have no obligation to provide any updates or continued functionality.

5. WARRANTY DISCLAIMER
THE SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT. ${data.companyName} DOES NOT WARRANT THAT THE SOFTWARE WILL BE ERROR-FREE OR UNINTERRUPTED.

6. LIMITATION OF LIABILITY
IN NO EVENT SHALL ${data.companyName.toUpperCase()} BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SOFTWARE.

7. TERMINATION
This Agreement is effective until terminated. We may terminate this Agreement at any time if you fail to comply with any term of this Agreement. Upon termination, you must cease all use of the software and destroy all copies.

8. GOVERNING LAW
This Agreement shall be governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles.

9. CONTACT US
For questions about this EULA, contact us at:
${data.contactEmail}
${data.businessAddress}`;
}

const generators: Record<LegalType, (data: FormData) => string> = {
  "privacy-policy": generatePrivacyPolicy,
  "terms-of-service": generateTermsOfService,
  "cookie-policy": generateCookiePolicy,
  eula: generateEULA,
};

export default function LegalGeneratorPage() {
  const params = useParams();
  const type = params.type as string;

  const isValidType = VALID_TYPES.includes(type as LegalType);

  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    websiteUrl: "",
    contactEmail: "",
    businessAddress: "",
    businessType: "SaaS",
  });

  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateDocument = (): string => {
    if (!isValidType || !formData.companyName) return "";
    return generators[type as LegalType](formData);
  };

  const generatedDocument = generateDocument();

  const handleCopy = async () => {
    if (!generatedDocument) return;
    await navigator.clipboard.writeText(generatedDocument);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!generatedDocument) return;
    const blob = new Blob([generatedDocument], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement("a");
    a.href = url;
    a.download = `${type}.txt`;
    window.document.body.appendChild(a);
    a.click();
    window.document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isValidType) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl">404</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">
              The legal document type &quot;{type}&quot; is not supported.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {VALID_TYPES.map((t) => (
                <Badge key={t} variant="secondary">
                  {TYPE_LABELS[t]}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {TYPE_LABELS[type as LegalType]} Generator
          </h1>
          <p className="text-gray-600 mt-2">
            Fill in your business details to generate a customized legal document.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Acme Corp"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="websiteUrl">Website URL</Label>
                <Input
                  id="websiteUrl"
                  name="websiteUrl"
                  value={formData.websiteUrl}
                  onChange={handleChange}
                  placeholder="https://example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="legal@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessAddress">Business Address</Label>
                <Textarea
                  id="businessAddress"
                  name="businessAddress"
                  value={formData.businessAddress}
                  onChange={handleChange}
                  placeholder="123 Business St, City, State, ZIP"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type</Label>
                <select
                  id="businessType"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="SaaS">SaaS</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Blog">Blog</option>
                  <option value="Portfolio">Portfolio</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Document Preview</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  disabled={!generatedDocument}
                >
                  {copied ? "Copied!" : "Copy to Clipboard"}
                </Button>
                <Button
                  size="sm"
                  onClick={handleDownload}
                  disabled={!generatedDocument}
                >
                  Download as Text
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {generatedDocument ? (
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 max-h-[600px] overflow-y-auto">
                  <pre className="font-mono text-sm text-gray-800 whitespace-pre-wrap">
                    {generatedDocument}
                  </pre>
                </div>
              ) : (
                <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500">
                  Enter your company name to generate a preview
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
