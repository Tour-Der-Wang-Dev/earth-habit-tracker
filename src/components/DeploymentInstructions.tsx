
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface DeploymentInstructionsProps {
  data: any;
  onUpdate: (data: any) => void;
}

export const DeploymentInstructions = ({ data, onUpdate }: DeploymentInstructionsProps) => {
  const [formData, setFormData] = useState({
    platforms: '',
    developmentDeploy: '',
    stagingDeploy: '',
    productionDeploy: '',
    environmentVariables: '',
    cicdPipeline: '',
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
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Deployment Instructions</h3>
        <p className="text-gray-600 mb-6">
          Guide the team on deploying the application to various environments.
        </p>
      </div>

      <div className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="platforms">Deployment Platforms</Label>
          <Input
            id="platforms"
            value={formData.platforms}
            onChange={(e) => handleInputChange('platforms', e.target.value)}
            placeholder="e.g., Vercel, Netlify, AWS, Heroku, Lovable"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="developmentDeploy">Development Deployment</Label>
          <Textarea
            id="developmentDeploy"
            value={formData.developmentDeploy}
            onChange={(e) => handleInputChange('developmentDeploy', e.target.value)}
            placeholder="Steps for local development deployment..."
            className="min-h-[80px] font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stagingDeploy">Staging Deployment</Label>
          <Textarea
            id="stagingDeploy"
            value={formData.stagingDeploy}
            onChange={(e) => handleInputChange('stagingDeploy', e.target.value)}
            placeholder="Steps for staging environment deployment..."
            className="min-h-[80px] font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="productionDeploy">Production Deployment</Label>
          <Textarea
            id="productionDeploy"
            value={formData.productionDeploy}
            onChange={(e) => handleInputChange('productionDeploy', e.target.value)}
            placeholder="Steps for production deployment..."
            className="min-h-[80px] font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="environmentVariables">Environment Variables Setup</Label>
          <Textarea
            id="environmentVariables"
            value={formData.environmentVariables}
            onChange={(e) => handleInputChange('environmentVariables', e.target.value)}
            placeholder="How to configure environment variables for each environment..."
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cicdPipeline">CI/CD Pipeline</Label>
          <Textarea
            id="cicdPipeline"
            value={formData.cicdPipeline}
            onChange={(e) => handleInputChange('cicdPipeline', e.target.value)}
            placeholder="Automated deployment setup, GitHub Actions, etc..."
            className="min-h-[80px]"
          />
        </div>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-sm text-blue-800">Example</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-700 font-mono">
          <p><strong>Development:</strong> npm run build && npm start</p>
          <p><strong>Production (Vercel):</strong></p>
          <p className="ml-4">1. Connect Git repo</p>
          <p className="ml-4">2. Set env vars in Vercel dashboard</p>
          <p className="ml-4">3. Deploy via vercel --prod</p>
        </CardContent>
      </Card>
    </div>
  );
};
