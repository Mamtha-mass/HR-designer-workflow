import React, { useState } from 'react';
import { X, Save, Check, Settings } from 'lucide-react';

interface WorkflowSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WorkflowSettingsModal: React.FC<WorkflowSettingsModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('HR Onboarding Workflow');
  const [category, setCategory] = useState('onboarding');
  const [agreed, setAgreed] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return; // Simple validation
    
    // Simulate save
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all animate-in zoom-in-95 duration-200 border border-white/20">
        
        {/* Colorful Gradient Header */}
        <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <Settings size={120} />
          </div>
          <div className="flex justify-between items-center text-white relative z-10">
            <h2 className="text-xl font-bold tracking-tight">Workflow Settings</h2>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-white/20 rounded-full transition-colors backdrop-blur-md"
            >
              <X size={20} />
            </button>
          </div>
          <p className="text-indigo-100 text-sm mt-2 relative z-10 font-medium">Configure the core parameters for this process.</p>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-6">
          {/* Name Input - Elegant text field */}
          <div className="space-y-2 group">
            <label htmlFor="wf-name" className="block text-sm font-semibold text-slate-700 transition-colors group-focus-within:text-indigo-600">
              Workflow Name
            </label>
            <input
              id="wf-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 text-slate-800 font-medium shadow-sm"
              placeholder="e.g. Employee Onboarding"
              required
            />
          </div>

          {/* Category Dropdown - Elegant select */}
          <div className="space-y-2 group">
            <label htmlFor="wf-category" className="block text-sm font-semibold text-slate-700 transition-colors group-focus-within:text-indigo-600">
              Process Category
            </label>
            <div className="relative">
              <select
                id="wf-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none appearance-none transition-all text-slate-800 cursor-pointer font-medium shadow-sm"
              >
                <option value="onboarding">🚀 Onboarding & Orientation</option>
                <option value="recruitment">🤝 Recruitment Pipeline</option>
                <option value="performance">📈 Performance Review</option>
                <option value="offboarding">👋 Offboarding Process</option>
                <option value="administrative">📁 Administrative Tasks</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-500">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
              </div>
            </div>
          </div>

          {/* Terms Checkbox - Styled container */}
          <div className={`
            flex items-start gap-3 p-4 rounded-xl border transition-all duration-300
            ${agreed ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-50 border-slate-200 hover:border-indigo-200'}
          `}>
            <div className="flex items-center h-5 mt-0.5">
              <input
                id="wf-terms"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-5 h-5 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer transition-colors"
              />
            </div>
            <div className="text-sm">
              <label htmlFor="wf-terms" className="font-bold text-slate-800 cursor-pointer block mb-1">
                Policy Compliance
              </label>
              <p className="text-slate-500 leading-relaxed">
                I acknowledge that this workflow adheres to the company's <span className="text-indigo-600 font-medium cursor-pointer hover:underline">Automation Standards</span> and <span className="text-indigo-600 font-medium cursor-pointer hover:underline">Data Privacy Policy</span>.
              </p>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-slate-800 focus:ring-4 focus:ring-slate-100 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!agreed || isSaved}
              className={`
                flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white rounded-xl shadow-lg shadow-indigo-200 transition-all duration-300
                ${!agreed 
                  ? 'bg-slate-300 cursor-not-allowed shadow-none opacity-70' 
                  : isSaved 
                    ? 'bg-emerald-500 hover:bg-emerald-600 scale-105' 
                    : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 hover:shadow-indigo-300 hover:-translate-y-0.5'
                }
              `}
            >
              {isSaved ? (
                <>
                  <Check size={18} className="animate-bounce" />
                  Settings Saved
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};