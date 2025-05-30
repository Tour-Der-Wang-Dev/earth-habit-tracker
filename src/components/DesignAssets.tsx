
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface DesignAssetsProps {
  data: any;
  onUpdate: (data: any) => void;
}

export const DesignAssets = ({ data, onUpdate }: DesignAssetsProps) => {
  const [formData, setFormData] = useState({
    designFiles: '',
    colorPalette: '',
    typography: '',
    iconLibrary: '',
    logoAssets: '',
    brandGuidelines: '',
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
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Design Assets</h3>
        <p className="text-gray-600 mb-6">
          Ensure visual consistency across the project with comprehensive design documentation.
        </p>
      </div>

      <div className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="designFiles">Design Files & Links</Label>
          <Textarea
            id="designFiles"
            value={formData.designFiles}
            onChange={(e) => handleInputChange('designFiles', e.target.value)}
            placeholder="Links to Figma, Sketch, Adobe XD files..."
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="colorPalette">Color Palette</Label>
          <Textarea
            id="colorPalette"
            value={formData.colorPalette}
            onChange={(e) => handleInputChange('colorPalette', e.target.value)}
            placeholder="Primary: #2E7D32, Secondary: #0288D1, etc."
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="typography">Typography Guidelines</Label>
          <Textarea
            id="typography"
            value={formData.typography}
            onChange={(e) => handleInputChange('typography', e.target.value)}
            placeholder="Font families, sizes, weights, line heights..."
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="iconLibrary">Icon Library</Label>
          <Input
            id="iconLibrary"
            value={formData.iconLibrary}
            onChange={(e) => handleInputChange('iconLibrary', e.target.value)}
            placeholder="e.g., Lucide React, Heroicons, Feather Icons"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="logoAssets">Logo & Brand Assets</Label>
          <Textarea
            id="logoAssets"
            value={formData.logoAssets}
            onChange={(e) => handleInputChange('logoAssets', e.target.value)}
            placeholder="Logo variations, usage guidelines, file locations..."
            className="min-h-[60px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="brandGuidelines">Brand Guidelines</Label>
          <Textarea
            id="brandGuidelines"
            value={formData.brandGuidelines}
            onChange={(e) => handleInputChange('brandGuidelines', e.target.value)}
            placeholder="Voice, tone, imagery style, do's and don'ts..."
            className="min-h-[80px]"
          />
        </div>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-sm text-blue-800">Example</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-700">
          <p><strong>Color Palette:</strong> Primary Green (#2E7D32), Sky Blue (#0288D1), Light Gray (#F5F5F5)</p>
          <p><strong>Typography:</strong> Roboto (Regular 16px for body, Bold 24px for headers)</p>
          <p><strong>Design Files:</strong> <a href="#" className="underline">Figma Design System</a></p>
        </CardContent>
      </Card>
    </div>
  );
};
