
import { DocumentationData } from '@/store/documentationStore';

export const generateEnhancedMarkdown = (data: DocumentationData): string => {
  let markdown = `# 📋 Project Documentation\n\n`;
  markdown += `*Generated on ${new Date().toLocaleDateString()}*\n\n`;
  markdown += `---\n\n`;

  // Table of Contents
  markdown += `## 📚 Table of Contents\n\n`;
  const sections = [
    { key: 'overview', title: '🎯 Project Overview' },
    { key: 'personas', title: '👥 User Personas' },
    { key: 'features', title: '⚙️ Feature Specifications' },
    { key: 'design', title: '🎨 Design Assets' },
    { key: 'api', title: '🔌 API Documentation' },
    { key: 'database', title: '🗄️ Database Schema' },
    { key: 'environment', title: '🌍 Environment Setup' },
    { key: 'testing', title: '🧪 Testing Guidelines' },
    { key: 'deployment', title: '🚀 Deployment Instructions' },
    { key: 'versionControl', title: '📋 Version Control Practices' },
    { key: 'security', title: '🔒 Security Practices' },
    { key: 'compliance', title: '✅ Compliance Requirements' }
  ];

  sections.forEach(section => {
    markdown += `- [${section.title}](#${section.title.toLowerCase().replace(/[^a-z0-9]/g, '-')})\n`;
  });
  markdown += `\n---\n\n`;

  // Project Overview
  if (data.overview?.projectName) {
    markdown += `## 🎯 Project Overview\n\n`;
    if (data.overview.projectName) markdown += `### Project Name\n${data.overview.projectName}\n\n`;
    if (data.overview.description) markdown += `### Description\n${data.overview.description}\n\n`;
    if (data.overview.primaryGoals) markdown += `### Primary Goals\n${data.overview.primaryGoals}\n\n`;
    if (data.overview.keyObjectives) markdown += `### Key Objectives\n${data.overview.keyObjectives}\n\n`;
    markdown += `---\n\n`;
  }

  // User Personas
  if (data.personas?.length > 0) {
    markdown += `## 👥 User Personas\n\n`;
    data.personas.forEach((persona: any, index: number) => {
      if (persona.name) {
        markdown += `### ${index + 1}. ${persona.name}\n\n`;
        if (persona.demographics) markdown += `**👤 Demographics:** ${persona.demographics}\n\n`;
        if (persona.goals) markdown += `**🎯 Goals:** ${persona.goals}\n\n`;
        if (persona.painPoints) markdown += `**😤 Pain Points:** ${persona.painPoints}\n\n`;
        if (persona.behaviors) markdown += `**🔄 Behaviors:** ${persona.behaviors}\n\n`;
        if (persona.quote) markdown += `**💬 Quote:** *"${persona.quote}"*\n\n`;
        markdown += `---\n\n`;
      }
    });
  }

  // Feature Specifications
  if (data.features?.length > 0) {
    markdown += `## ⚙️ Feature Specifications\n\n`;
    data.features.forEach((feature: any, index: number) => {
      if (feature.name) {
        markdown += `### ${index + 1}. ${feature.name}\n\n`;
        if (feature.userStory) markdown += `**📖 User Story:** ${feature.userStory}\n\n`;
        if (feature.acceptanceCriteria) {
          markdown += `**✅ Acceptance Criteria:**\n\n`;
          const criteria = feature.acceptanceCriteria.split('\n').filter((line: string) => line.trim());
          criteria.forEach((criterion: string) => {
            markdown += `- ${criterion.trim()}\n`;
          });
          markdown += `\n`;
        }
        if (feature.description) markdown += `**📝 Description:** ${feature.description}\n\n`;
        markdown += `---\n\n`;
      }
    });
  }

  // Design Assets
  if (data.design && Object.keys(data.design).length > 0) {
    markdown += `## 🎨 Design Assets\n\n`;
    if (data.design.colorPalette) markdown += `### 🎨 Color Palette\n\`\`\`\n${data.design.colorPalette}\n\`\`\`\n\n`;
    if (data.design.typography) markdown += `### ✍️ Typography\n${data.design.typography}\n\n`;
    if (data.design.designFiles) markdown += `### 📐 Design Files\n${data.design.designFiles}\n\n`;
    if (data.design.iconLibrary) markdown += `### 🔍 Icon Library\n${data.design.iconLibrary}\n\n`;
    markdown += `---\n\n`;
  }

  // Continue with other sections following the same enhanced pattern...
  
  return markdown;
};

export const downloadMarkdown = (markdown: string, filename: string = 'project-documentation.md') => {
  const blob = new Blob([markdown], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const downloadJSON = (data: DocumentationData, filename: string = 'project-documentation.json') => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
