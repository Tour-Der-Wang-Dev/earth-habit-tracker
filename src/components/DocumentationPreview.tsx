
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Eye, FileText, Upload, Trash2, Save } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useDocumentationStore } from '@/store/documentationStore';
import { generateEnhancedMarkdown, downloadMarkdown, downloadJSON } from '@/utils/markdownGenerator';
import { generatePDF } from '@/utils/pdfGenerator';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';

interface DocumentationPreviewProps {
  data: any;
}

export const DocumentationPreview = ({ data }: DocumentationPreviewProps) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const { clearData, exportData, importData, getCompletionPercentage, lastSaved } = useDocumentationStore();

  const handleDownloadMarkdown = () => {
    const markdown = generateEnhancedMarkdown(data);
    const filename = data.overview?.projectName 
      ? `${data.overview.projectName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_documentation.md`
      : 'project_documentation.md';
    downloadMarkdown(markdown, filename);
    toast.success('Markdown downloaded successfully!');
  };

  const handleDownloadJSON = () => {
    const filename = data.overview?.projectName 
      ? `${data.overview.projectName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_data.json`
      : 'project_data.json';
    downloadJSON(data, filename);
    toast.success('JSON data downloaded successfully!');
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      await generatePDF(data);
      toast.success('PDF generated successfully!');
    } catch (error) {
      toast.error('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleImportJSON = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const result = importData(e.target.result);
          if (result) {
            toast.success('Data imported successfully!');
            window.location.reload(); // Refresh to show imported data
          } else {
            toast.error('Failed to import data. Please check the file format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all documentation data? This action cannot be undone.')) {
      clearData();
      toast.success('All data cleared successfully!');
      window.location.reload();
    }
  };

  const completion = getCompletionPercentage();

  return (
    <div className="space-y-4">
      {/* Completion Status */}
      <div className="text-center">
        <div className="text-2xl font-bold text-green-600 mb-2">
          {completion}%
        </div>
        <p className="text-sm text-gray-600">Documentation Complete</p>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div 
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${completion}%` }}
          ></div>
        </div>
        {lastSaved && (
          <p className="text-xs text-gray-500 mt-2">
            Last saved: {lastSaved.toLocaleString()}
          </p>
        )}
      </div>

      {/* Preview & Export Actions */}
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
              <DialogTitle>Enhanced Documentation Preview</DialogTitle>
              <DialogDescription>
                Full preview with enhanced formatting and styling
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[60vh] pr-4">
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown>{generateEnhancedMarkdown(data)}</ReactMarkdown>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>

        {/* Export Options */}
        <div className="grid grid-cols-1 gap-2">
          <Button onClick={handleDownloadMarkdown} className="w-full" variant="default">
            <Download className="h-4 w-4 mr-2" />
            Download Markdown
          </Button>
          
          <Button onClick={handleDownloadJSON} className="w-full" variant="outline">
            <Save className="h-4 w-4 mr-2" />
            Export JSON Data
          </Button>
          
          <Button 
            onClick={handleDownloadPDF} 
            className="w-full" 
            variant="secondary"
            disabled={isGeneratingPDF}
          >
            <FileText className="h-4 w-4 mr-2" />
            {isGeneratingPDF ? 'Generating PDF...' : 'Generate PDF'}
          </Button>
        </div>

        {/* Data Management */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t">
          <Button onClick={handleImportJSON} variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import Data
          </Button>
          
          <Button onClick={handleClearData} variant="destructive" size="sm">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>
      </div>

      {/* Quick Summary */}
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle className="text-sm">Project Summary</CardTitle>
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
          <div className="flex justify-between">
            <span>Completion:</span>
            <span className="font-medium text-green-600">{completion}%</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
