import { MockAutomation, SimulationResult, WorkflowNodeType } from '../types';

// Mock Data
const MOCK_AUTOMATIONS: MockAutomation[] = [
  { id: 'send_email', label: 'Send Email', params: ['to', 'subject', 'body'] },
  { id: 'generate_pdf', label: 'Generate PDF', params: ['template_id', 'output_name'] },
  { id: 'slack_notify', label: 'Slack Notification', params: ['channel', 'message'] },
  { id: 'update_hrms', label: 'Update HRMS', params: ['employee_id', 'field', 'value'] },
];

// Service Functions
export const fetchAutomations = async (): Promise<MockAutomation[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_AUTOMATIONS);
    }, 500); // Simulate network latency
  });
};

export const simulateWorkflow = async (workflowJson: any): Promise<SimulationResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const nodes = workflowJson.nodes || [];
      const edges = workflowJson.edges || [];
      const logs: any[] = [];
      let step = 1;

      // Basic structure validation
      const startNode = nodes.find((n: any) => n.type === WorkflowNodeType.START);
      if (!startNode) {
        resolve({
          success: false,
          logs: [],
          error: 'Validation Failed: Workflow must have a Start Node.'
        });
        return;
      }

      // Simulate traversal (Simple BFS/Linear for prototype)
      let currentNode = startNode;
      const visited = new Set();
      
      while (currentNode) {
        if (visited.has(currentNode.id)) break; // Cycle detection
        visited.add(currentNode.id);

        logs.push({
          step: step++,
          nodeId: currentNode.id,
          nodeType: currentNode.type,
          label: currentNode.data.label,
          status: 'success',
          message: `Executed ${currentNode.type} node: ${currentNode.data.label}`,
          timestamp: new Date().toISOString()
        });

        // Find next node
        const outgoingEdge = edges.find((e: any) => e.source === currentNode.id);
        if (outgoingEdge) {
          currentNode = nodes.find((n: any) => n.id === outgoingEdge.target);
        } else {
          currentNode = null;
        }
      }

      resolve({
        success: true,
        logs
      });
    }, 1000);
  });
};