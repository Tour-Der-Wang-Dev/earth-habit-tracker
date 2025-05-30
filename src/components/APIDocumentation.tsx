
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface APIDocumentationProps {
  data: any;
  onUpdate: (data: any) => void;
}

interface Endpoint {
  id: string;
  path: string;
  method: string;
  description: string;
  requestExample: string;
  responseExample: string;
  authentication: string;
}

export const APIDocumentation = ({ data, onUpdate }: APIDocumentationProps) => {
  const [endpoints, setEndpoints] = useState<Endpoint[]>(data.endpoints || []);
  const [authMethod, setAuthMethod] = useState(data.authMethod || '');
  const [baseUrl, setBaseUrl] = useState(data.baseUrl || '');

  useEffect(() => {
    onUpdate({
      endpoints,
      authMethod,
      baseUrl
    });
  }, [endpoints, authMethod, baseUrl, onUpdate]);

  const addEndpoint = () => {
    const newEndpoint: Endpoint = {
      id: Date.now().toString(),
      path: '',
      method: 'GET',
      description: '',
      requestExample: '',
      responseExample: '',
      authentication: ''
    };
    setEndpoints([...endpoints, newEndpoint]);
  };

  const updateEndpoint = (id: string, field: keyof Endpoint, value: string) => {
    setEndpoints(endpoints.map(endpoint => 
      endpoint.id === id ? { ...endpoint, [field]: value } : endpoint
    ));
  };

  const removeEndpoint = (id: string) => {
    setEndpoints(endpoints.filter(endpoint => endpoint.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">API Documentation</h3>
        <p className="text-gray-600 mb-6">
          Detail how the application communicates with external systems or internally.
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="baseUrl">Base URL</Label>
            <Input
              id="baseUrl"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://api.example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="authMethod">Authentication Method</Label>
            <Input
              id="authMethod"
              value={authMethod}
              onChange={(e) => setAuthMethod(e.target.value)}
              placeholder="Bearer Token, API Key, JWT, etc."
            />
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-lg font-medium">API Endpoints</h4>
          
          {endpoints.map((endpoint, index) => (
            <Card key={endpoint.id} className="border-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Endpoint {index + 1}</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeEndpoint(endpoint.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>HTTP Method</Label>
                    <Select
                      value={endpoint.method}
                      onValueChange={(value) => updateEndpoint(endpoint.id, 'method', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GET">GET</SelectItem>
                        <SelectItem value="POST">POST</SelectItem>
                        <SelectItem value="PUT">PUT</SelectItem>
                        <SelectItem value="DELETE">DELETE</SelectItem>
                        <SelectItem value="PATCH">PATCH</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor={`path-${endpoint.id}`}>Endpoint Path</Label>
                    <Input
                      id={`path-${endpoint.id}`}
                      value={endpoint.path}
                      onChange={(e) => updateEndpoint(endpoint.id, 'path', e.target.value)}
                      placeholder="/api/calculate-carbon"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`description-${endpoint.id}`}>Description</Label>
                  <Input
                    id={`description-${endpoint.id}`}
                    value={endpoint.description}
                    onChange={(e) => updateEndpoint(endpoint.id, 'description', e.target.value)}
                    placeholder="What does this endpoint do?"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`request-${endpoint.id}`}>Request Example</Label>
                    <Textarea
                      id={`request-${endpoint.id}`}
                      value={endpoint.requestExample}
                      onChange={(e) => updateEndpoint(endpoint.id, 'requestExample', e.target.value)}
                      placeholder='{ "transport": "car", "distance": 10 }'
                      className="min-h-[80px] font-mono text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`response-${endpoint.id}`}>Response Example</Label>
                    <Textarea
                      id={`response-${endpoint.id}`}
                      value={endpoint.responseExample}
                      onChange={(e) => updateEndpoint(endpoint.id, 'responseExample', e.target.value)}
                      placeholder='{ "carbonFootprint": 5.2, "unit": "kgCO2e" }'
                      className="min-h-[80px] font-mono text-sm"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button onClick={addEndpoint} className="w-full" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add New Endpoint
          </Button>
        </div>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-sm text-blue-800">Example</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-700">
          <p><strong>Endpoint:</strong> POST /api/calculate-carbon</p>
          <p><strong>Description:</strong> Calculates carbon footprint from user inputs</p>
          <p><strong>Request:</strong> {"{ \"transport\": \"car\", \"distance\": 10, \"diet\": \"vegetarian\" }"}</p>
          <p><strong>Response:</strong> {"{ \"carbonFootprint\": 5.2, \"unit\": \"kgCO2e\" }"}</p>
        </CardContent>
      </Card>
    </div>
  );
};
