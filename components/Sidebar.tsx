import React from 'react';
import { WorkflowNodeType } from '../types';
import { Play, CheckSquare, FileCheck, Zap, Flag, GripVertical, Layers } from 'lucide-react';

const SidebarItem = ({ type, label, icon: Icon, colorClass, borderClass, textClass }: { type: WorkflowNodeType, label: string, icon: any, colorClass: string, borderClass: string, textClass: string }) => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div 
      className={`
        flex items-center gap-3 p-3 mb-3 bg-white border rounded-xl cursor-grab 
        hover:shadow-md transition-all duration-200 group relative overflow-hidden
        ${borderClass}
      `}
      onDragStart={(event) => onDragStart(event, type)}
      draggable
    >
      <div className={`
        p-2.5 rounded-lg transition-colors shadow-sm
        ${colorClass} ${textClass} group-hover:scale-110 duration-200
      `}>
        <Icon size={18} />
      </div>
      <div className="flex-1 relative z-10">
        <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">{label}</span>
      </div>
      <GripVertical size={16} className="text-slate-300 group-hover:text-slate-400" />
    </div>
  );
};

export const Sidebar = () => {
  return (
    <aside className="w-72 bg-white border-r border-slate-200 flex flex-col h-full shadow-lg z-10">
      <div className="p-6 border-b border-slate-100 flex items-center gap-2">
        <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
           <Layers size={20} />
        </div>
        <div>
          <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide">Node Library</h2>
          <p className="text-[10px] text-slate-400 font-medium">DRAG TO CANVAS</p>
        </div>
      </div>
      
      <div className="p-4 overflow-y-auto flex-1 bg-slate-50/50">
        <div className="text-[10px] font-black text-slate-400 mb-3 pl-1 uppercase tracking-widest">Flow Control</div>
        <SidebarItem 
          type={WorkflowNodeType.START} 
          label="Start Trigger" 
          icon={Play} 
          colorClass="bg-blue-100 group-hover:bg-blue-600"
          textClass="text-blue-600 group-hover:text-white"
          borderClass="border-slate-200 hover:border-blue-300"
        />
        <SidebarItem 
          type={WorkflowNodeType.END} 
          label="End Point" 
          icon={Flag} 
          colorClass="bg-emerald-100 group-hover:bg-emerald-600" 
          textClass="text-emerald-600 group-hover:text-white"
          borderClass="border-slate-200 hover:border-emerald-300"
        />
        
        <div className="text-[10px] font-black text-slate-400 mb-3 mt-6 pl-1 uppercase tracking-widest">Actions</div>
        <SidebarItem 
          type={WorkflowNodeType.TASK} 
          label="Human Task" 
          icon={CheckSquare} 
          colorClass="bg-slate-100 group-hover:bg-slate-600" 
          textClass="text-slate-600 group-hover:text-white"
          borderClass="border-slate-200 hover:border-slate-300"
        />
        <SidebarItem 
          type={WorkflowNodeType.APPROVAL} 
          label="Approval Step" 
          icon={FileCheck} 
          colorClass="bg-purple-100 group-hover:bg-purple-600" 
          textClass="text-purple-600 group-hover:text-white"
          borderClass="border-slate-200 hover:border-purple-300"
        />
        <SidebarItem 
          type={WorkflowNodeType.AUTOMATED} 
          label="Automation" 
          icon={Zap} 
          colorClass="bg-amber-100 group-hover:bg-amber-500" 
          textClass="text-amber-600 group-hover:text-white"
          borderClass="border-slate-200 hover:border-amber-300"
        />
      </div>
      
      <div className="p-4 text-xs text-slate-400 text-center border-t border-slate-200 bg-white">
        <p>💡 Tip: Double click nodes to edit</p>
      </div>
    </aside>
  );
};