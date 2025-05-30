
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface EnvironmentSetupProps {
  data: any;
  onUpdate: (data: any) => void;
}

export const EnvironmentSetup = ({ data, onUpdate }: EnvironmentSetupProps) => {
  const [formData, setFormData] = useState({
    nodeVersion: '',
    packageManager: '',
    installationSteps: '',
    environmentVariables: '',
    devServerCommands: '',
    prerequisites: '',
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
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Environment Setup</h3>
        <p className="text-gray-600 mb-6">
          Enable team members to quickly set up their development environment.
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nodeVersion">Node.js Version</Label>
            <Input
              id="nodeVersion"
              value={formData.nodeVersion}
              onChange={(e) => handleInputChange('nodeVersion', e.target.value)}
              placeholder="e.g., v18.17.0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="packageManager">Package Manager</Label>
            <Input
              id="packageManager"
              value={formData.packageManager}
              onChange={(e) => handleInputChange('packageManager', e.target.value)}
              placeholder="e.g., npm, yarn, pnpm"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="prerequisites">Prerequisites</Label>
          <Textarea
            id="prerequisites"
            value={formData.prerequisites}
            onChange={(e) => handleInputChange('prerequisites', e.target.value)}
            placeholder="Required software, accounts, or tools needed before setup..."
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="installationSteps">Installation Steps</Label>
          <Textarea
            id="installationSteps"
            value={formData.installationSteps}
            onChange={(e) => handleInputChange('installationSteps', e.target.value)}
            placeholder="Step-by-step installation instructions..."
            className="min-h-[120px] font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="environmentVariables">Environment Variables</Label>
          <Textarea
            id="environmentVariables"
            value={formData.environmentVariables}
            onChange={(e) => handleInputChange('environmentVariables', e.target.value)}
            placeholder="Required .env variables and their descriptions..."
            className="min-h-[100px] font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="devServerCommands">Development Server Commands</Label>
          <Textarea
            id="devServerCommands"
            value={formData.devServerCommands}
            onChange={(e) => handleInputChange('devServerCommands', e.target.value)}
            placeholder="Commands to start development server, run tests, etc..."
            className="min-h-[80px] font-mono text-sm"
          />
        </div>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-sm text-blue-800">Example</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-700 font-mono">
          <p>1. Install Node.js v18: nvm install 18</p>
          <p>2. Install dependencies: npm install</p>
          <p>3. Set up .env:</p>
          <p className="ml-4">NEXT_PUBLIC_SUPABASE_URL=your-url</p>
          <p className="ml-4">SUPABASE_SERVICE_ROLE_KEY=your-key</p>
          <p>4. Start dev server: npm run dev</p>
        </CardContent>
      </Card>
    </div>
  );
};
