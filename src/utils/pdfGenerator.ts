
import jsPDF from 'jspdf';
import { DocumentationData } from '@/store/documentationStore';

export const generatePDF = async (data: DocumentationData): Promise<void> => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const lineHeight = 7;
  let yPosition = margin;

  // Helper function to add text with automatic page breaks
  const addText = (text: string, fontSize: number = 11, isBold: boolean = false) => {
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
    
    const lines = pdf.splitTextToSize(text, pageWidth - 2 * margin);
    
    for (const line of lines) {
      if (yPosition + lineHeight > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
      }
      pdf.text(line, margin, yPosition);
      yPosition += lineHeight;
    }
    yPosition += 3; // Extra space after text blocks
  };

  // Title
  addText('PROJECT DOCUMENTATION', 20, true);
  addText(`Generated on ${new Date().toLocaleDateString()}`, 10);
  yPosition += 10;

  // Project Overview
  if (data.overview?.projectName) {
    addText('PROJECT OVERVIEW', 16, true);
    if (data.overview.projectName) {
      addText(`Project Name: ${data.overview.projectName}`, 12, true);
    }
    if (data.overview.description) {
      addText(`Description: ${data.overview.description}`);
    }
    if (data.overview.primaryGoals) {
      addText(`Primary Goals: ${data.overview.primaryGoals}`);
    }
    if (data.overview.keyObjectives) {
      addText(`Key Objectives: ${data.overview.keyObjectives}`);
    }
    yPosition += 10;
  }

  // User Personas
  if (data.personas?.length > 0) {
    addText('USER PERSONAS', 16, true);
    data.personas.forEach((persona: any, index: number) => {
      if (persona.name) {
        addText(`${index + 1}. ${persona.name}`, 14, true);
        if (persona.demographics) addText(`Demographics: ${persona.demographics}`);
        if (persona.goals) addText(`Goals: ${persona.goals}`);
        if (persona.painPoints) addText(`Pain Points: ${persona.painPoints}`);
        if (persona.behaviors) addText(`Behaviors: ${persona.behaviors}`);
        if (persona.quote) addText(`Quote: "${persona.quote}"`);
        yPosition += 5;
      }
    });
  }

  // Features
  if (data.features?.length > 0) {
    addText('FEATURE SPECIFICATIONS', 16, true);
    data.features.forEach((feature: any, index: number) => {
      if (feature.name) {
        addText(`${index + 1}. ${feature.name}`, 14, true);
        if (feature.userStory) addText(`User Story: ${feature.userStory}`);
        if (feature.acceptanceCriteria) addText(`Acceptance Criteria: ${feature.acceptanceCriteria}`);
        if (feature.description) addText(`Description: ${feature.description}`);
        yPosition += 5;
      }
    });
  }

  // Save the PDF
  const filename = data.overview?.projectName 
    ? `${data.overview.projectName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_documentation.pdf`
    : 'project_documentation.pdf';
  
  pdf.save(filename);
};
