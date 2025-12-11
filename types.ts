export enum WorkflowNodeType {
  START = 'start',
  TASK = 'task',
  APPROVAL = 'approval',
  AUTOMATED = 'automated',
  END = 'end',
}

export interface NodeData {
  label: string;
  description?: string;
  // Start Node
  metadata?: Record<string, string>;
  // Task Node
  assignee?: string;
  dueDate?: string;
  customFields?: Record<string, string>;
  // Approval Node
  approverRole?: string;
  autoApproveThreshold?: number;
  // Automated Node
  automationId?: string;
  automationParams?: Record<string, string>;
  // End Node
  endMessage?: string;
  isSummary?: boolean;
}

export interface MockAutomation {
  id: string;
  label: string;
  params: string[];
}

export interface SimulationLog {
  step: number;
  nodeId: string;
  nodeType: string;
  label: string;
  status: 'success' | 'pending' | 'failed';
  message: string;
  timestamp: string;
}

export interface SimulationResult {
  success: boolean;
  logs: SimulationLog[];
  error?: string;
}