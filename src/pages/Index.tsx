import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Users, Cog, Palette, Database, Code, TestTube, Rocket, GitBranch, Shield, CheckCircle } from 'lucide-react';
import { ProjectOverview } from '@/components/ProjectOverview';
import { UserPersonas } from '@/components/UserPersonas';
import { FeatureSpecs } from '@/components/FeatureSpecs';
import { DesignAssets } from '@/components/DesignAssets';
import { APIDocumentation } from '@/components/APIDocumentation';
import { DatabaseSchema } from '@/components/DatabaseSchema';
import { EnvironmentSetup } from '@/components/EnvironmentSetup';
import { TestingGuidelines } from '@/components/TestingGuidelines';
import { DeploymentInstructions } from '@/components/DeploymentInstructions';
import { VersionControl } from '@/components/VersionControl';
import { SecurityPractices } from '@/components/SecurityPractices';
import { ComplianceRequirements } from '@/components/ComplianceRequirements';
import { DocumentationPreview } from '@/components/DocumentationPreview';
import { useDocumentationStore } from '@/store/documentationStore';

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { data, updateSection } = useDocumentationStore();

  const sections = [
    { id: 'overview', label: 'Project Overview', icon: FileText, component: ProjectOverview },
    { id: 'personas', label: 'User Personas', icon: Users, component: UserPersonas },
    { id: 'features', label: 'Feature Specs', icon: Cog, component: FeatureSpecs },
    { id: 'design', label: 'Design Assets', icon: Palette, component: DesignAssets },
    { id: 'api', label: 'API Documentation', icon: Code, component: APIDocumentation },
    { id: 'database', label: 'Database Schema', icon: Database, component: DatabaseSchema },
    { id: 'environment', label: 'Environment Setup', icon: Cog, component: EnvironmentSetup },
    { id: 'testing', label: 'Testing Guidelines', icon: TestTube, component: TestingGuidelines },
    { id: 'deployment', label: 'Deployment', icon: Rocket, component: DeploymentInstructions },
    { id: 'versionControl', label: 'Version Control', icon: GitBranch, component: VersionControl },
    { id: 'security', label: 'Security Practices', icon: Shield, component: SecurityPractices },
    { id: 'compliance', label: 'Compliance', icon: CheckCircle, component: ComplianceRequirements }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Project Documentation Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Create comprehensive project documentation with enhanced features including auto-save,
            multiple export formats, and advanced preview capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-2xl text-gray-900">Documentation Sections</CardTitle>
                <CardDescription>
                  Complete each section to build comprehensive project documentation.
                  Data is automatically saved as you work.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-4 lg:grid-cols-6 w-full h-auto p-2 bg-gray-50">
                    {sections.map((section) => {
                      const Icon = section.icon;
                      return (
                        <TabsTrigger
                          key={section.id}
                          value={section.id}
                          className="flex flex-col items-center gap-2 p-3 text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm"
                        >
                          <Icon className="h-4 w-4" />
                          <span className="hidden sm:block">{section.label}</span>
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>

                  {sections.map((section) => {
                    const Component = section.component;
                    return (
                      <TabsContent key={section.id} value={section.id} className="p-6">
                        <Component
                          data={data[section.id as keyof typeof data]}
                          onUpdate={(sectionData: any) => updateSection(section.id as keyof typeof data, sectionData)}
                        />
                      </TabsContent>
                    );
                  })}
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="shadow-lg sticky top-8">
              <CardHeader className="border-b bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="text-xl text-gray-900">Enhanced Preview & Export</CardTitle>
                <CardDescription>
                  Live preview with multiple export options and data management
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <DocumentationPreview data={data} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
