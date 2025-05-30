
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface SecurityPracticesProps {
  data: any;
  onUpdate: (data: any) => void;
}

export const SecurityPractices = ({ data, onUpdate }: SecurityPracticesProps) => {
  const [formData, setFormData] = useState({
    secureCoding: '',
    dataProtection: '',
    authentication: '',
    authorization: '',
    inputValidation: '',
    secretsManagement: '',
    ...data
  });

  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Security Practices</h3>
        <p className="text-gray-600 mb-6">
          Protect the application and user data with comprehensive security measures.
        </p>
      </div>

      <div className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="secureCoding">Secure Coding Guidelines</Label>
          <Textarea
            id="secureCoding"
            value={formData.secureCoding}
            onChange={(e) => handleInputChange('secureCoding', e.target.value)}
            placeholder="Input sanitization, XSS prevention, SQL injection prevention..."
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dataProtection">Data Protection Measures</Label>
          <Textarea
            id="dataProtection"
            value={formData.dataProtection}
            onChange={(e) => handleInputChange('dataProtection', e.target.value)}
            placeholder="Encryption at rest and in transit, PII handling..."
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="authentication">Authentication Strategy</Label>
          <Textarea
            id="authentication"
            value={formData.authentication}
            onChange={(e) => handleInputChange('authentication', e.target.value)}
            placeholder="Password policies, multi-factor authentication, session management..."
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="authorization">Authorization & Access Control</Label>
          <Textarea
            id="authorization"
            value={formData.authorization}
            onChange={(e) => handleInputChange('authorization', e.target.value)}
            placeholder="Role-based access control, permissions, API security..."
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="inputValidation">Input Validation</Label>
          <Textarea
            id="inputValidation"
            value={formData.inputValidation}
            onChange={(e) => handleInputChange('inputValidation', e.target.value)}
            placeholder="Client and server-side validation, sanitization methods..."
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="secretsManagement">Secrets Management</Label>
          <Textarea
            id="secretsManagement"
            value={formData.secretsManagement}
            onChange={(e) => handleInputChange('secretsManagement', e.target.value)}
            placeholder="API keys, environment variables, credential storage..."
            className="min-h-[80px]"
          />
        </div>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-sm text-blue-800">Example</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-700">
          <p>• Use HTTPS for all requests</p>
          <p>• Sanitize user inputs to prevent XSS</p>
          <p>• Store secrets in .env files, never in code</p>
          <p>• Implement proper session management</p>
        </CardContent>
      </Card>
    </div>
  );
};
