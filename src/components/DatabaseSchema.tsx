
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface DatabaseSchemaProps {
  data: any;
  onUpdate: (data: any) => void;
}

export const DatabaseSchema = ({ data, onUpdate }: DatabaseSchemaProps) => {
  const [formData, setFormData] = useState({
    databaseType: '',
    erDiagram: '',
    tableStructures: '',
    relationships: '',
    indexing: '',
    constraints: '',
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
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Database Schema</h3>
        <p className="text-gray-600 mb-6">
          Define how data is structured and related in your application.
        </p>
      </div>

      <div className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="databaseType">Database Type</Label>
          <Input
            id="databaseType"
            value={formData.databaseType}
            onChange={(e) => handleInputChange('databaseType', e.target.value)}
            placeholder="e.g., PostgreSQL, MySQL, MongoDB, Supabase"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tableStructures">Table Structures</Label>
          <Textarea
            id="tableStructures"
            value={formData.tableStructures}
            onChange={(e) => handleInputChange('tableStructures', e.target.value)}
            placeholder="List tables with columns, data types, and constraints..."
            className="min-h-[150px] font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="relationships">Entity Relationships</Label>
          <Textarea
            id="relationships"
            value={formData.relationships}
            onChange={(e) => handleInputChange('relationships', e.target.value)}
            placeholder="Describe foreign keys, joins, and table relationships..."
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="erDiagram">ER Diagram Link/Description</Label>
          <Textarea
            id="erDiagram"
            value={formData.erDiagram}
            onChange={(e) => handleInputChange('erDiagram', e.target.value)}
            placeholder="Link to ER diagram or detailed description of entity relationships..."
            className="min-h-[80px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="indexing">Indexing Strategy</Label>
            <Textarea
              id="indexing"
              value={formData.indexing}
              onChange={(e) => handleInputChange('indexing', e.target.value)}
              placeholder="Performance indexes, primary keys, unique constraints..."
              className="min-h-[80px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="constraints">Data Constraints</Label>
            <Textarea
              id="constraints"
              value={formData.constraints}
              onChange={(e) => handleInputChange('constraints', e.target.value)}
              placeholder="Validation rules, check constraints, triggers..."
              className="min-h-[80px]"
            />
          </div>
        </div>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-sm text-blue-800">Example</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-700 font-mono">
          <p><strong>Table: Users</strong></p>
          <p>- id (UUID, Primary Key)</p>
          <p>- email (VARCHAR, Unique)</p>
          <p>- created_at (TIMESTAMPTZ)</p>
          <br />
          <p><strong>Table: Activities</strong></p>
          <p>- id (UUID, Primary Key)</p>
          <p>- user_id (UUID, Foreign Key to Users)</p>
          <p>- type (VARCHAR)</p>
          <p>- carbon_value (NUMERIC)</p>
        </CardContent>
      </Card>
    </div>
  );
};
