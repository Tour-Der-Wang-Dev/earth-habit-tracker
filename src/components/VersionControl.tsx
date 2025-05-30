
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface VersionControlProps {
  data: any;
  onUpdate: (data: any) => void;
}

export const VersionControl = ({ data, onUpdate }: VersionControlProps) => {
  const [formData, setFormData] = useState({
    branchingStrategy: '',
    commitConventions: '',
    codeReviewGuidelines: '',
    mergeStrategy: '',
    releaseProcess: '',
    hotfixProcess: '',
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
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Version Control Practices</h3>
        <p className="text-gray-600 mb-6">
          Maintain a clean and manageable codebase with consistent practices.
        </p>
      </div>

      <div className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="branchingStrategy">Branching Strategy</Label>
          <Textarea
            id="branchingStrategy"
            value={formData.branchingStrategy}
            onChange={(e) => handleInputChange('branchingStrategy', e.target.value)}
            placeholder="e.g., Gitflow, GitHub Flow, feature branches..."
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="commitConventions">Commit Message Conventions</Label>
          <Textarea
            id="commitConventions"
            value={formData.commitConventions}
            onChange={(e) => handleInputChange('commitConventions', e.target.value)}
            placeholder="e.g., Conventional Commits, format guidelines..."
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="codeReviewGuidelines">Code Review Guidelines</Label>
          <Textarea
            id="codeReviewGuidelines"
            value={formData.codeReviewGuidelines}
            onChange={(e) => handleInputChange('codeReviewGuidelines', e.target.value)}
            placeholder="Review requirements, approval process, checklist..."
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mergeStrategy">Merge Strategy</Label>
          <Input
            id="mergeStrategy"
            value={formData.mergeStrategy}
            onChange={(e) => handleInputChange('mergeStrategy', e.target.value)}
            placeholder="e.g., Squash and merge, rebase, merge commits"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="releaseProcess">Release Process</Label>
          <Textarea
            id="releaseProcess"
            value={formData.releaseProcess}
            onChange={(e) => handleInputChange('releaseProcess', e.target.value)}
            placeholder="Versioning, tagging, release notes process..."
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hotfixProcess">Hotfix Process</Label>
          <Textarea
            id="hotfixProcess"
            value={formData.hotfixProcess}
            onChange={(e) => handleInputChange('hotfixProcess', e.target.value)}
            placeholder="Emergency fix procedures and approval process..."
            className="min-h-[80px]"
          />
        </div>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-sm text-blue-800">Example</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-700">
          <p><strong>Branching:</strong> feature/feature-name, main for production</p>
          <p><strong>Commits:</strong> feat: add carbon calculator, fix: resolve login bug</p>
          <p><strong>Reviews:</strong> At least one approval, check for tests</p>
        </CardContent>
      </Card>
    </div>
  );
};
