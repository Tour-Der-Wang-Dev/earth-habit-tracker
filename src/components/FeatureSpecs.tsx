
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface FeatureSpecsProps {
  data: any[];
  onUpdate: (data: any[]) => void;
}

interface Feature {
  id: string;
  name: string;
  userStory: string;
  acceptanceCriteria: string;
  description: string;
}

export const FeatureSpecs = ({ data, onUpdate }: FeatureSpecsProps) => {
  const [features, setFeatures] = useState<Feature[]>(data || []);

  useEffect(() => {
    onUpdate(features);
  }, [features, onUpdate]);

  const addFeature = () => {
    const newFeature: Feature = {
      id: Date.now().toString(),
      name: '',
      userStory: '',
      acceptanceCriteria: '',
      description: ''
    };
    setFeatures([...features, newFeature]);
  };

  const updateFeature = (id: string, field: keyof Feature, value: string) => {
    setFeatures(features.map(feature => 
      feature.id === id ? { ...feature, [field]: value } : feature
    ));
  };

  const removeFeature = (id: string) => {
    setFeatures(features.filter(feature => feature.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Feature Specifications</h3>
        <p className="text-gray-600 mb-6">
          Outline what the application will do, serving as a blueprint for development.
        </p>
      </div>

      <div className="space-y-6">
        {features.map((feature, index) => (
          <Card key={feature.id} className="border-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Feature {index + 1}</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeFeature(feature.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`name-${feature.id}`}>Feature Name</Label>
                <Input
                  id={`name-${feature.id}`}
                  value={feature.name}
                  onChange={(e) => updateFeature(feature.id, 'name', e.target.value)}
                  placeholder="e.g., Carbon Footprint Calculator"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`userStory-${feature.id}`}>User Story</Label>
                <Textarea
                  id={`userStory-${feature.id}`}
                  value={feature.userStory}
                  onChange={(e) => updateFeature(feature.id, 'userStory', e.target.value)}
                  placeholder="As a [user type], I want to [action] so that [benefit]"
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`acceptanceCriteria-${feature.id}`}>Acceptance Criteria</Label>
                <Textarea
                  id={`acceptanceCriteria-${feature.id}`}
                  value={feature.acceptanceCriteria}
                  onChange={(e) => updateFeature(feature.id, 'acceptanceCriteria', e.target.value)}
                  placeholder="List specific conditions for feature completion (one per line)"
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`description-${feature.id}`}>Detailed Description</Label>
                <Textarea
                  id={`description-${feature.id}`}
                  value={feature.description}
                  onChange={(e) => updateFeature(feature.id, 'description', e.target.value)}
                  placeholder="Detailed description of functionality and implementation"
                  className="min-h-[80px]"
                />
              </div>
            </CardContent>
          </Card>
        ))}

        <Button onClick={addFeature} className="w-full" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add New Feature
        </Button>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-sm text-blue-800">Example</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-700">
          <p className="font-medium">Carbon Footprint Calculator</p>
          <p><strong>User Story:</strong> "As an environmentally conscious user, I want to input my daily activities so that I can see my carbon footprint and get reduction tips."</p>
          <p><strong>Acceptance Criteria:</strong></p>
          <ul className="list-disc list-inside ml-4">
            <li>Users can input transportation, diet, and energy usage data</li>
            <li>The system calculates and displays the carbon footprint</li>
            <li>Suggestions for reduction are provided based on inputs</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
