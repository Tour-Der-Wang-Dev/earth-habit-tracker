
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Eye } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DocumentationPreviewProps {
  data: any;
}

export const DocumentationPreview = ({ data }: DocumentationPreviewProps) => {
  const [showFullPreview, setShowFullPreview] = useState(false);

  const generateMarkdown = () => {
    let markdown = `# Project Documentation\n\n`;

    // Project Overview
    if (data.overview?.projectName) {
      markdown += `## Project Overview\n\n`;
      markdown += `**Project Name:** ${data.overview.projectName}\n\n`;
      if (data.overview.description) {
        markdown += `**Description:** ${data.overview.description}\n\n`;
      }
      if (data.overview.primaryGoals) {
        markdown += `**Primary Goals:** ${data.overview.primaryGoals}\n\n`;
      }
      if (data.overview.keyObjectives) {
        markdown += `**Key Objectives:** ${data.overview.keyObjectives}\n\n`;
      }
    }

    // User Personas
    if (data.personas?.length > 0) {
      markdown += `## User Personas\n\n`;
      data.personas.forEach((persona: any, index: number) => {
        if (persona.name) {
          markdown += `### ${persona.name}\n\n`;
          if (persona.demographics) markdown += `**Demographics:** ${persona.demographics}\n\n`;
          if (persona.goals) markdown += `**Goals:** ${persona.goals}\n\n`;
          if (persona.painPoints) markdown += `**Pain Points:** ${persona.painPoints}\n\n`;
          if (persona.behaviors) markdown += `**Behaviors:** ${persona.behaviors}\n\n`;
          if (persona.quote) markdown += `**Quote:** "${persona.quote}"\n\n`;
        }
      });
    }

    // Features
    if (data.features?.length > 0) {
      markdown += `## Feature Specifications\n\n`;
      data.features.forEach((feature: any) => {
        if (feature.name) {
          markdown += `### ${feature.name}\n\n`;
          if (feature.userStory) markdown += `**User Story:** ${feature.userStory}\n\n`;
          if (feature.acceptanceCriteria) markdown += `**Acceptance Criteria:**\n${feature.acceptanceCriteria}\n\n`;
          if (feature.description) markdown += `**Description:** ${feature.description}\n\n`;
        }
      });
    }

    // Continue with other sections...
    return markdown;
  };

  const downloadDocumentation = () => {
    const markdown = generateMarkdown();
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.overview?.projectName || 'project'}-documentation.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getCompletionPercentage = () => {
    const sections = ['overview', 'personas', 'features', 'design', 'api', 'database', 'environment', 'testing', 'deployment', 'versionControl', 'security', 'compliance'];
    let completed = 0;

    sections.forEach(section => {
      if (section === 'personas' || section === 'features') {
        if (data[section]?.length > 0) completed++;
      } else {
        if (data[section] && Object.keys(data[section]).length > 0) completed++;
      }
    });

    return Math.round((completed / sections.length) * 100);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="text-2xl font-bold text-green-600 mb-2">
          {getCompletionPercentage()}%
        </div>
        <p className="text-sm text-gray-600">Documentation Complete</p>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div 
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getCompletionPercentage()}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              <Eye className="h-4 w-4 mr-2" />
              Preview Documentation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Documentation Preview</DialogTitle>
              <DialogDescription>
                Full preview of your generated project documentation
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[60vh] pr-4">
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap text-sm">{generateMarkdown()}</pre>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>

        <Button onClick={downloadDocumentation} className="w-full">
          <Download className="h-4 w-4 mr-2" />
          Download Markdown
        </Button>
      </div>

      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle className="text-sm">Quick Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span>Project Name:</span>
            <span className="font-medium">{data.overview?.projectName || 'Not set'}</span>
          </div>
          <div className="flex justify-between">
            <span>Personas:</span>
            <span className="font-medium">{data.personas?.length || 0}</span>
          </div>
          <div className="flex justify-between">
            <span>Features:</span>
            <span className="font-medium">{data.features?.length || 0}</span>
          </div>
          <div className="flex justify-between">
            <span>API Endpoints:</span>
            <span className="font-medium">{data.api?.endpoints?.length || 0}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
