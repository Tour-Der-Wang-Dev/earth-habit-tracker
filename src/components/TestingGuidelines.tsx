
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface TestingGuidelinesProps {
  data: any;
  onUpdate: (data: any) => void;
}

export const TestingGuidelines = ({ data, onUpdate }: TestingGuidelinesProps) => {
  const [formData, setFormData] = useState({
    testingFrameworks: '',
    unitTests: '',
    integrationTests: '',
    e2eTests: '',
    coverageRequirements: '',
    testingCommands: '',
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
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Testing Guidelines</h3>
        <p className="text-gray-600 mb-6">
          Ensure the application's reliability through systematic testing.
        </p>
      </div>

      <div className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="testingFrameworks">Testing Frameworks</Label>
          <Input
            id="testingFrameworks"
            value={formData.testingFrameworks}
            onChange={(e) => handleInputChange('testingFrameworks', e.target.value)}
            placeholder="e.g., Jest, Vitest, Cypress, Playwright"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="unitTests">Unit Testing Strategy</Label>
          <Textarea
            id="unitTests"
            value={formData.unitTests}
            onChange={(e) => handleInputChange('unitTests', e.target.value)}
            placeholder="Components, functions, and utilities to test..."
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="integrationTests">Integration Testing</Label>
          <Textarea
            id="integrationTests"
            value={formData.integrationTests}
            onChange={(e) => handleInputChange('integrationTests', e.target.value)}
            placeholder="API endpoints, database interactions, third-party services..."
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="e2eTests">End-to-End Testing</Label>
          <Textarea
            id="e2eTests"
            value={formData.e2eTests}
            onChange={(e) => handleInputChange('e2eTests', e.target.value)}
            placeholder="User workflows, critical paths, browser testing..."
            className="min-h-[80px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="coverageRequirements">Coverage Requirements</Label>
            <Input
              id="coverageRequirements"
              value={formData.coverageRequirements}
              onChange={(e) => handleInputChange('coverageRequirements', e.target.value)}
              placeholder="e.g., 80% minimum coverage"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="testingCommands">Testing Commands</Label>
            <Input
              id="testingCommands"
              value={formData.testingCommands}
              onChange={(e) => handleInputChange('testingCommands', e.target.value)}
              placeholder="npm test, npm run test:e2e"
            />
          </div>
        </div>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-sm text-blue-800">Example</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-700">
          <p><strong>Unit Tests:</strong> Test components with Jest and React Testing Library</p>
          <p><strong>Integration Tests:</strong> Verify API endpoints with Supabase interactions</p>
          <p><strong>Framework:</strong> Jest for unit tests, Cypress for E2E</p>
          <p><strong>Coverage:</strong> Aim for 80% code coverage</p>
        </CardContent>
      </Card>
    </div>
  );
};
