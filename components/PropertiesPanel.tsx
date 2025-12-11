import React, { useEffect, useState } from 'react';
import { Node, useReactFlow } from 'reactflow';
import { WorkflowNodeType, MockAutomation, NodeData } from '../types';
import { fetchAutomations } from '../services/mockApi';
import { X, Trash2 } from 'lucide-react';

interface PropertiesPanelProps {
  selectedNode: Node | null;
  onClose: () => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ selectedNode, onClose }) => {
  const { setNodes, setEdges } = useReactFlow();
  const [automations, setAutomations] = useState<MockAutomation[]>([]);
  
  // Local state for form handling to prevent excessive re-renders on every keystroke
  const [formData, setFormData] = useState<NodeData | null>(null);

  useEffect(() => {
    fetchAutomations().then(setAutomations);
  }, []);

  useEffect(() => {
    if (selectedNode) {
      setFormData(selectedNode.data);
    } else {
      setFormData(null);
    }
  }, [selectedNode]);

  const handleChange = (field: keyof NodeData, value: any) => {
    if (!selectedNode || !formData) return;
    
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    
    // Update React Flow state immediately (or could debounce this)
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === selectedNode.id) {
          return { ...node, data: newData };
        }
        return node;
      })
    );
  };

  const handleDelete = () => {
    if (!selectedNode) return;
    setNodes((nodes) => nodes.filter((n) => n.id !== selectedNode.id));
    setEdges((edges) => edges.filter((e) => e.source !== selectedNode.id && e.target !== selectedNode.id));
    onClose();
  };

  if (!selectedNode || !formData) {
    return (
      <aside className="w-80 bg-white border-l border-slate-200 p-6 flex items-center justify-center h-full text-slate-400">
        <div className="text-center">
          <p>Select a node to edit</p>
        </div>
      </aside>
    );
  }

  const renderFields = () => {
    switch (selectedNode.type) {
      case WorkflowNodeType.START:
        return (
          <>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Metadata (JSON)</label>
              <textarea 
                className="w-full p-2 border border-gray-300 rounded-md text-sm font-mono h-24"
                placeholder='{"source": "HR Portal"}'
                value={JSON.stringify(formData.metadata || {}, null, 2)}
                onChange={(e) => {
                  try {
                    handleChange('metadata', JSON.parse(e.target.value));
                  } catch (err) {
                    // ignore invalid json during typing
                  }
                }}
              />
            </div>
          </>
        );

      case WorkflowNodeType.TASK:
        return (
          <>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => handleChange('description', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  placeholder="e.g. john.doe@company.com"
                  value={formData.assignee || ''}
                  onChange={(e) => handleChange('assignee', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  value={formData.dueDate || ''}
                  onChange={(e) => handleChange('dueDate', e.target.value)}
                />
              </div>
            </div>
          </>
        );

      case WorkflowNodeType.APPROVAL:
        return (
          <>
             <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Approver Role</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  value={formData.approverRole || ''}
                  onChange={(e) => handleChange('approverRole', e.target.value)}
                >
                  <option value="">Select Role...</option>
                  <option value="Manager">Manager</option>
                  <option value="HRBP">HR Business Partner</option>
                  <option value="Director">Director</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Auto-Approve Threshold ($)</label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  value={formData.autoApproveThreshold || 0}
                  onChange={(e) => handleChange('autoApproveThreshold', parseInt(e.target.value))}
                />
              </div>
            </div>
          </>
        );

      case WorkflowNodeType.AUTOMATED:
        const selectedAutomation = automations.find(a => a.id === formData.automationId);
        return (
          <>
             <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Action</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  value={formData.automationId || ''}
                  onChange={(e) => {
                    handleChange('automationId', e.target.value);
                    handleChange('automationParams', {}); // Reset params on change
                  }}
                >
                  <option value="">Select Automation...</option>
                  {automations.map(a => (
                    <option key={a.id} value={a.id}>{a.label}</option>
                  ))}
                </select>
              </div>
              
              {selectedAutomation && (
                <div className="bg-slate-50 p-3 rounded-md border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Parameters</h4>
                  {selectedAutomation.params.map(param => (
                    <div key={param} className="mb-2 last:mb-0">
                      <label className="block text-xs text-gray-600 mb-1 capitalize">{param}</label>
                      <input 
                        type="text"
                        className="w-full p-1.5 border border-gray-300 rounded text-sm"
                        value={formData.automationParams?.[param] || ''}
                        onChange={(e) => {
                          const newParams = { ...(formData.automationParams || {}), [param]: e.target.value };
                          handleChange('automationParams', newParams);
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        );
      
      case WorkflowNodeType.END:
         return (
          <>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Message</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  value={formData.endMessage || ''}
                  onChange={(e) => handleChange('endMessage', e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                 <input
                  type="checkbox"
                  id="isSummary"
                  checked={formData.isSummary || false}
                  onChange={(e) => handleChange('isSummary', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                 />
                 <label htmlFor="isSummary" className="text-sm text-gray-700">Generate Summary Report</label>
              </div>
            </div>
          </>
         );

      default:
        return <p className="text-sm text-gray-500">No specific configuration for this node type.</p>;
    }
  };

  return (
    <aside className="w-80 bg-white border-l border-slate-200 h-full flex flex-col shadow-xl z-20">
      <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <div>
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Configuration</h2>
          <p className="text-xs text-slate-500 mt-1">{selectedNode.type} Node</p>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
          <X size={20} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            value={formData.label}
            onChange={(e) => handleChange('label', e.target.value)}
          />
        </div>
        
        {renderFields()}
      </div>

      <div className="p-4 border-t border-slate-200 bg-slate-50">
        <button 
          onClick={handleDelete}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-red-200 text-red-600 rounded-md hover:bg-red-50 transition-colors text-sm font-medium"
        >
          <Trash2 size={16} />
          Delete Node
        </button>
      </div>
    </aside>
  );
};