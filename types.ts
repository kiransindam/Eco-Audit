export interface ActionableStep {
  title: string;
  description: string;
  impactLevel: 'High' | 'Medium' | 'Low';
}

export interface Observation {
  issue: string;
  detail: string;
}

export interface AuditReport {
  ecoScore: number;
  scoreLabel: string;
  keyObservations: Observation[];
  impactContext: string;
  actionableSteps: ActionableStep[];
  summary: string;
}

export interface FileWithPreview extends File {
  preview: string;
}