
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface UserPersonasProps {
  data: any[];
  onUpdate: (data: any[]) => void;
}

interface Persona {
  id: string;
  name: string;
  demographics: string;
  goals: string;
  painPoints: string;
  behaviors: string;
  quote: string;
}

export const UserPersonas = ({ data, onUpdate }: UserPersonasProps) => {
  const [personas, setPersonas] = useState<Persona[]>(data || []);

  useEffect(() => {
    onUpdate(personas);
  }, [personas, onUpdate]);

  const addPersona = () => {
    const newPersona: Persona = {
      id: Date.now().toString(),
      name: '',
      demographics: '',
      goals: '',
      painPoints: '',
      behaviors: '',
      quote: ''
    };
    setPersonas([...personas, newPersona]);
  };

  const updatePersona = (id: string, field: keyof Persona, value: string) => {
    setPersonas(personas.map(persona => 
      persona.id === id ? { ...persona, [field]: value } : persona
    ));
  };

  const removePersona = (id: string) => {
    setPersonas(personas.filter(persona => persona.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">User Personas</h3>
        <p className="text-gray-600 mb-6">
          Define the target audience to align the team on user needs and behaviors.
        </p>
      </div>

      <div className="space-y-6">
        {personas.map((persona, index) => (
          <Card key={persona.id} className="border-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Persona {index + 1}</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removePersona(persona.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`name-${persona.id}`}>Name & Title</Label>
                  <Input
                    id={`name-${persona.id}`}
                    value={persona.name}
                    onChange={(e) => updatePersona(persona.id, 'name', e.target.value)}
                    placeholder="e.g., Sarah, the Eco-Conscious Millennial"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`demographics-${persona.id}`}>Demographics</Label>
                  <Input
                    id={`demographics-${persona.id}`}
                    value={persona.demographics}
                    onChange={(e) => updatePersona(persona.id, 'demographics', e.target.value)}
                    placeholder="Age, occupation, location"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`goals-${persona.id}`}>Goals</Label>
                <Textarea
                  id={`goals-${persona.id}`}
                  value={persona.goals}
                  onChange={(e) => updatePersona(persona.id, 'goals', e.target.value)}
                  placeholder="What does this persona want to achieve?"
                  className="min-h-[60px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`painPoints-${persona.id}`}>Pain Points</Label>
                <Textarea
                  id={`painPoints-${persona.id}`}
                  value={persona.painPoints}
                  onChange={(e) => updatePersona(persona.id, 'painPoints', e.target.value)}
                  placeholder="What challenges or frustrations do they face?"
                  className="min-h-[60px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`behaviors-${persona.id}`}>Behaviors</Label>
                <Textarea
                  id={`behaviors-${persona.id}`}
                  value={persona.behaviors}
                  onChange={(e) => updatePersona(persona.id, 'behaviors', e.target.value)}
                  placeholder="How do they typically behave or interact with technology?"
                  className="min-h-[60px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`quote-${persona.id}`}>Representative Quote</Label>
                <Input
                  id={`quote-${persona.id}`}
                  value={persona.quote}
                  onChange={(e) => updatePersona(persona.id, 'quote', e.target.value)}
                  placeholder="A quote that represents their mindset"
                />
              </div>
            </CardContent>
          </Card>
        ))}

        <Button onClick={addPersona} className="w-full" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add New Persona
        </Button>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-sm text-blue-800">Example</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-700">
          <p className="font-medium">Sarah, the Eco-Conscious Millennial</p>
          <p><strong>Demographics:</strong> 28 years old, marketing professional, urban dweller</p>
          <p><strong>Goals:</strong> Reduce her environmental impact through informed choices</p>
          <p><strong>Pain Points:</strong> Lack of clear data on how her habits affect the planet</p>
          <p><strong>Behaviors:</strong> Tech-savvy, uses apps daily, follows sustainability blogs</p>
          <p><strong>Quote:</strong> "I want to live greener, but I need to know where to start."</p>
        </CardContent>
      </Card>
    </div>
  );
};
