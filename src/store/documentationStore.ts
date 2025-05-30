
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DocumentationData {
  overview: any;
  personas: any[];
  features: any[];
  design: any;
  api: any;
  database: any;
  environment: any;
  testing: any;
  deployment: any;
  versionControl: any;
  security: any;
  compliance: any;
}

interface DocumentationStore {
  data: DocumentationData;
  lastSaved: Date | null;
  updateSection: (section: keyof DocumentationData, data: any) => void;
  clearData: () => void;
  exportData: () => string;
  importData: (jsonData: string) => boolean;
  getCompletionPercentage: () => number;
}

const initialData: DocumentationData = {
  overview: {},
  personas: [],
  features: [],
  design: {},
  api: {},
  database: {},
  environment: {},
  testing: {},
  deployment: {},
  versionControl: {},
  security: {},
  compliance: {}
};

export const useDocumentationStore = create<DocumentationStore>()(
  persist(
    (set, get) => ({
      data: initialData,
      lastSaved: null,
      
      updateSection: (section, sectionData) => {
        set((state) => ({
          data: {
            ...state.data,
            [section]: sectionData
          },
          lastSaved: new Date()
        }));
      },
      
      clearData: () => {
        set({
          data: initialData,
          lastSaved: null
        });
      },
      
      exportData: () => {
        const { data } = get();
        return JSON.stringify(data, null, 2);
      },
      
      importData: (jsonData) => {
        try {
          const parsedData = JSON.parse(jsonData);
          set({
            data: { ...initialData, ...parsedData },
            lastSaved: new Date()
          });
          return true;
        } catch {
          return false;
        }
      },
      
      getCompletionPercentage: () => {
        const { data } = get();
        const sections = Object.keys(initialData) as (keyof DocumentationData)[];
        let completed = 0;
        
        sections.forEach(section => {
          if (section === 'personas' || section === 'features') {
            if (data[section]?.length > 0) completed++;
          } else {
            if (data[section] && Object.keys(data[section]).length > 0) completed++;
          }
        });
        
        return Math.round((completed / sections.length) * 100);
      }
    }),
    {
      name: 'documentation-storage',
      version: 1
    }
  )
);
