
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ComplianceRequirementsProps {
  data: any;
  onUpdate: (data: any) => void;
}

export const ComplianceRequirements = ({ data, onUpdate }: ComplianceRequirementsProps) => {
  const [formData, setFormData] = useState({
    regulations: '',
    gdprCompliance: '',
    ccpaCompliance: '',
    dataRetention: '',
    privacyPolicy: '',
    userConsent: '',
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
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Compliance Requirements</h3>
        <p className="text-gray-600 mb-6">
          Ensure the project meets legal and regulatory standards.
        </p>
      </div>

      <div className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="regulations">Applicable Regulations</Label>
          <Input
            id="regulations"
            value={formData.regulations}
            onChange={(e) => handleInputChange('regulations', e.target.value)}
            placeholder="e.g., GDPR, CCPA, HIPAA, SOX"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gdprCompliance">GDPR Compliance</Label>
          <Textarea
            id="gdprCompliance"
            value={formData.gdprCompliance}
            onChange={(e) => handleInputChange('gdprCompliance', e.target.value)}
            placeholder="Data processing lawful basis, user rights implementation..."
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ccpaCompliance">CCPA Compliance</Label>
          <Textarea
            id="ccpaCompliance"
            value={formData.ccpaCompliance}
            onChange={(e) => handleInputChange('ccpaCompliance', e.target.value)}
            placeholder="California privacy rights, data selling disclosures..."
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dataRetention">Data Retention Policy</Label>
          <Textarea
            id="dataRetention"
            value={formData.dataRetention}
            onChange={(e) => handleInputChange('dataRetention', e.target.value)}
            placeholder="How long data is stored, deletion procedures..."
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="privacyPolicy">Privacy Policy</Label>
          <Textarea
            id="privacyPolicy"
            value={formData.privacyPolicy}
            onChange={(e) => handleInputChange('privacyPolicy', e.target.value)}
            placeholder="Privacy policy requirements and implementation..."
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="userConsent">User Consent Mechanisms</Label>
          <Textarea
            id="userConsent"
            value={formData.userConsent}
            onChange={(e) => handleInputChange('userConsent', e.target.value)}
            placeholder="Opt-in/opt-out processes, cookie consent, data processing consent..."
            className="min-h-[80px]"
          />
        </div>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-sm text-blue-800">Example</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-700">
          <p><strong>GDPR:</strong> Provide opt-in consent for data collection</p>
          <p><strong>Actions:</strong> Add privacy policy, allow data deletion requests</p>
          <p><strong>Implementation:</strong> Cookie banner, data export functionality</p>
        </CardContent>
      </Card>
    </div>
  );
};
