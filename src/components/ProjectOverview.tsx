
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ProjectOverviewProps {
  data: any;
  onUpdate: (data: any) => void;
}

export const ProjectOverview = ({ data, onUpdate }: ProjectOverviewProps) => {
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    primaryGoals: '',
    keyObjectives: '',
    targetAudience: '',
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
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Project Overview</h3>
        <p className="text-gray-600 mb-6">
          Provide a concise summary of the project to give context to all stakeholders.
        </p>
      </div>

      <div className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="projectName">Project Name</Label>
          <Input
            id="projectName"
            value={formData.projectName}
            onChange={(e) => handleInputChange('projectName', e.target.value)}
            placeholder="e.g., EcoTrack"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Project Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Brief description of what the project is about..."
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="primaryGoals">Primary Goals</Label>
          <Textarea
            id="primaryGoals"
            value={formData.primaryGoals}
            onChange={(e) => handleInputChange('primaryGoals', e.target.value)}
            placeholder="e.g., solving a specific problem, delivering a service..."
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="keyObjectives">Key Objectives</Label>
          <Textarea
            id="keyObjectives"
            value={formData.keyObjectives}
            onChange={(e) => handleInputChange('keyObjectives', e.target.value)}
            placeholder="e.g., improve user experience, increase efficiency..."
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="targetAudience">Target Audience</Label>
          <Textarea
            id="targetAudience"
            value={formData.targetAudience}
            onChange={(e) => handleInputChange('targetAudience', e.target.value)}
            placeholder="Who is this project for?"
            className="min-h-[60px]"
          />
        </div>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-sm text-blue-800">Example</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-700">
          <p className="font-medium">EcoTrack</p>
          <p>EcoTrack is a web application designed to help users track their carbon footprint. The main goal is to provide insights into daily activities' environmental impact, with objectives to suggest actionable reduction strategies and promote sustainable habits.</p>
        </CardContent>
      </Card>
    </div>
  );
};
