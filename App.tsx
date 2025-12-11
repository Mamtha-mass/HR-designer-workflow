import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Connection,
  Edge,
  Node,
  useReactFlow,
  Panel,
} from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import { Play, Save, LayoutGrid, Settings, Plus } from 'lucide-react';

import { Sidebar } from './components/Sidebar';
import { PropertiesPanel } from './components/PropertiesPanel';
import { nodeTypes } from './components/nodes/WorkflowNodes';
import { WorkflowNodeType } from './types';
import { simulateWorkflow } from './services/mockApi';
import { SimulationModal } from './components/SimulationModal';
import { WorkflowSettingsModal } from './components/WorkflowSettingsModal';

// Initial state
const initialNodes: Node[] = [
  {
    id: 'start-1',
    type: WorkflowNodeType.START,
    position: { x: 100, y: 100 },
    data: { label: 'New Employee' },
  },
];

const AppContent = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  
  // Modals
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<any>(null);
  const [showSimulationModal, setShowSimulationModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, type: 'smoothstep', animated: true, style: { strokeWidth: 2, stroke: '#64748b' } }, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow') as WorkflowNodeType;
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: uuidv4(),
        type,
        position,
        data: { label: `${type.charAt(0).toUpperCase() + type.slice(1)}` },
      };

      setNodes((nds) => nds.concat(newNode));
      setSelectedNode(newNode);
    },
    [reactFlowInstance, setNodes]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const handleSimulate = async () => {
    setIsSimulating(true);
    setShowSimulationModal(true);
    
    const workflowJson = { nodes, edges };

    try {
      const result = await simulateWorkflow(workflowJson);
      setSimulationResult(result);
    } catch (error) {
      console.error("Simulation failed", error);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans text-slate-800">
      <Sidebar />
      
      <div className="flex-1 flex flex-col h-full relative">
        {/* Colorful Gradient Header */}
        <header className="h-16 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 flex items-center justify-between px-6 z-20 shadow-md">
          <div className="flex items-center gap-4">
             <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg text-white shadow-lg shadow-indigo-500/30">
                <LayoutGrid size={20} />
             </div>
             <div>
               <h1 className="text-lg font-bold text-white leading-tight tracking-tight">HR Workflow Designer</h1>
               <p className="text-xs text-slate-400 font-medium">New Employee Onboarding • Draft</p>
             </div>
          </div>
          
          <div className="flex items-center gap-3">
             <button 
              onClick={() => setShowSettingsModal(true)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <Settings size={18} />
              Settings
            </button>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-200 bg-white/10 rounded-lg hover:bg-white/20 transition-all border border-white/5">
              <Save size={16} />
              Save
            </button>
            <button 
              onClick={handleSimulate}
              className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg hover:from-indigo-500 hover:to-blue-500 shadow-lg shadow-indigo-500/20 transition-all active:scale-95 border border-indigo-400/20"
            >
              <Play size={16} fill="currentColor" />
              Simulate Run
            </button>
          </div>
        </header>

        {/* Canvas Area */}
        <div className="flex-1 relative bg-slate-50" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            fitView
            attributionPosition="bottom-right"
            snapToGrid={true}
            snapGrid={[20, 20]}
            defaultEdgeOptions={{
              style: { strokeWidth: 2, stroke: '#94a3b8' },
              animated: true,
            }}
          >
            <Controls className="!bg-white !border-slate-200 !shadow-xl !rounded-lg overflow-hidden !m-4" />
            <Background color="#cbd5e1" gap={20} size={1.5} variant="dots" />
            
            {/* Overlay Panel */}
            <Panel position="top-right" className="m-4">
               <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full border border-slate-200 text-xs font-semibold text-slate-500 shadow-sm flex gap-3">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> {nodes.length} Nodes</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-400"></span> {edges.length} Links</span>
               </div>
            </Panel>
          </ReactFlow>
        </div>
      </div>

      {/* Properties Panel (Right Sidebar) */}
      {selectedNode && (
        <PropertiesPanel 
          selectedNode={selectedNode} 
          onClose={() => setSelectedNode(null)} 
        />
      )}

      {/* Modals */}
      <SimulationModal 
        isOpen={showSimulationModal} 
        onClose={() => setShowSimulationModal(false)}
        result={simulationResult}
        loading={isSimulating}
      />
      
      <WorkflowSettingsModal 
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <ReactFlowProvider>
      <AppContent />
    </ReactFlowProvider>
  );
}