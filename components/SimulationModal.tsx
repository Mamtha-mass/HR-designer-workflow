import React from 'react';
import { X, CheckCircle, AlertCircle, PlayCircle, Loader2 } from 'lucide-react';
import { SimulationResult, SimulationLog } from '../types';

interface SimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: SimulationResult | null;
  loading: boolean;
}

export const SimulationModal: React.FC<SimulationModalProps> = ({ isOpen, onClose, result, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div className="flex items-center gap-2">
            <PlayCircle className="text-blue-600" size={20} />
            <h2 className="text-lg font-bold text-gray-800">Workflow Simulation</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 min-h-[300px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-3">
              <Loader2 className="animate-spin text-blue-500" size={40} />
              <p>Simulating workflow execution...</p>
            </div>
          ) : result ? (
            <div className="space-y-4">
              {result.error ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="text-red-500 mt-0.5" size={20} />
                  <div>
                    <h3 className="font-bold text-red-800">Simulation Failed</h3>
                    <p className="text-red-600 text-sm mt-1">{result.error}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-green-700 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
                    <CheckCircle size={20} />
                    <span className="font-semibold">Validation Successful</span>
                  </div>
                  
                  <div className="relative border-l-2 border-gray-200 ml-4 space-y-8">
                    {result.logs.map((log: SimulationLog, index: number) => (
                      <div key={index} className="relative pl-6">
                        <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-white" />
                        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{log.nodeType}</span>
                            <span className="text-xs text-gray-400 font-mono">{new Date(log.timestamp).toLocaleTimeString()}</span>
                          </div>
                          <h4 className="font-medium text-gray-900">{log.label}</h4>
                          <p className="text-sm text-gray-600 mt-1">{log.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No results available.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};