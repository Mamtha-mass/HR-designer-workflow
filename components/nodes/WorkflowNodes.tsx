import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { 
  Play, 
  CheckSquare, 
  FileCheck, 
  Zap, 
  Flag, 
} from 'lucide-react';
import { WorkflowNodeType } from '../../types';

// Wrapper for consistent node styling
const NodeWrapper = ({ 
  children, 
  selected, 
  gradientClass,
  icon: Icon,
  title 
}: { 
  children?: React.ReactNode, 
  selected: boolean, 
  gradientClass: string,
  icon: any,
  title: string
}) => (
  <div className={`
    shadow-xl rounded-xl border-[3px] bg-white w-[260px] transition-all duration-300 group
    ${selected ? 'border-indigo-500 ring-4 ring-indigo-100 scale-105 z-10' : 'border-white hover:border-slate-200 hover:-translate-y-1'}
  `}>
    <div className={`p-3 rounded-t-lg flex items-center gap-3 text-white bg-gradient-to-r ${gradientClass} relative overflow-hidden`}>
      {/* Decorative background circle */}
      <div className="absolute -right-4 -top-4 w-16 h-16 bg-white opacity-10 rounded-full blur-xl"></div>
      
      <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm shadow-inner">
        <Icon size={16} />
      </div>
      <span className="font-bold text-sm tracking-wide text-shadow">{title}</span>
    </div>
    <div className="p-4 bg-white rounded-b-lg relative">
      {children}
    </div>
  </div>
);

// --- Custom Node Components ---

export const StartNode = memo(({ data, selected }: NodeProps) => {
  return (
    <>
      <NodeWrapper selected={selected} gradientClass="from-blue-500 to-cyan-500" icon={Play} title="Start Flow">
        <p className="text-slate-600 text-sm font-medium">{data.label}</p>
        <div className="flex items-center gap-1 mt-2">
            <span className="px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 text-[10px] font-bold uppercase tracking-wider border border-cyan-100">Trigger</span>
        </div>
      </NodeWrapper>
      <Handle type="source" position={Position.Right} className="!w-4 !h-4 !bg-cyan-500 !border-2 !border-white shadow-md transition-transform hover:scale-125" />
    </>
  );
});

export const TaskNode = memo(({ data, selected }: NodeProps) => {
  return (
    <>
      <Handle type="target" position={Position.Left} className="!w-4 !h-4 !bg-slate-400 !border-2 !border-white shadow-md transition-transform hover:scale-125" />
      <NodeWrapper selected={selected} gradientClass="from-slate-600 to-slate-500" icon={CheckSquare} title="Task">
        <p className="font-bold text-slate-800">{data.label}</p>
        <div className="text-xs text-slate-500 mt-3 space-y-1.5 bg-slate-50 p-2 rounded-md border border-slate-100">
           {data.assignee && <div className="flex items-center gap-1.5"><span>👤</span> <span className="font-medium text-slate-700 truncate">{data.assignee}</span></div>}
           {data.dueDate && <div className="flex items-center gap-1.5"><span>📅</span> <span className="font-medium text-slate-700">{data.dueDate}</span></div>}
           {!data.assignee && !data.dueDate && <span className="italic text-slate-400">No details configured</span>}
        </div>
      </NodeWrapper>
      <Handle type="source" position={Position.Right} className="!w-4 !h-4 !bg-slate-500 !border-2 !border-white shadow-md transition-transform hover:scale-125" />
    </>
  );
});

export const ApprovalNode = memo(({ data, selected }: NodeProps) => {
  return (
    <>
      <Handle type="target" position={Position.Left} className="!w-4 !h-4 !bg-purple-400 !border-2 !border-white shadow-md transition-transform hover:scale-125" />
      <NodeWrapper selected={selected} gradientClass="from-fuchsia-600 to-purple-600" icon={FileCheck} title="Approval">
        <p className="font-bold text-slate-800">{data.label}</p>
        <div className="mt-3">
           {data.approverRole ? 
             <span className="bg-purple-50 text-purple-700 border border-purple-100 px-2 py-1 rounded-md text-xs font-semibold">{data.approverRole}</span> 
             : <span className="text-xs text-slate-400 italic">Role not assigned</span>}
        </div>
      </NodeWrapper>
      <Handle type="source" position={Position.Right} className="!w-4 !h-4 !bg-purple-600 !border-2 !border-white shadow-md transition-transform hover:scale-125" />
    </>
  );
});

export const AutomatedNode = memo(({ data, selected }: NodeProps) => {
  return (
    <>
      <Handle type="target" position={Position.Left} className="!w-4 !h-4 !bg-amber-400 !border-2 !border-white shadow-md transition-transform hover:scale-125" />
      <NodeWrapper selected={selected} gradientClass="from-amber-500 to-orange-500" icon={Zap} title="Automation">
         <p className="font-bold text-slate-800">{data.label}</p>
         <div className="text-xs text-slate-500 mt-2">
            {data.automationId ? 
              <div className="flex items-center gap-1 text-amber-700 font-mono bg-amber-50 px-2 py-1 rounded border border-amber-100"><Zap size={10} fill="currentColor"/> {data.automationId}</div> 
              : 'Select action...'}
         </div>
      </NodeWrapper>
      <Handle type="source" position={Position.Right} className="!w-4 !h-4 !bg-orange-500 !border-2 !border-white shadow-md transition-transform hover:scale-125" />
    </>
  );
});

export const EndNode = memo(({ data, selected }: NodeProps) => {
  return (
    <>
      <Handle type="target" position={Position.Left} className="!w-4 !h-4 !bg-emerald-400 !border-2 !border-white shadow-md transition-transform hover:scale-125" />
      <NodeWrapper selected={selected} gradientClass="from-emerald-500 to-teal-500" icon={Flag} title="End">
         <p className="font-bold text-slate-800">{data.label}</p>
         {data.isSummary && <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 border border-emerald-200 bg-emerald-50 px-2 py-1 rounded mt-2 inline-block shadow-sm">Summary Report</span>}
      </NodeWrapper>
    </>
  );
});

export const nodeTypes = {
  [WorkflowNodeType.START]: StartNode,
  [WorkflowNodeType.TASK]: TaskNode,
  [WorkflowNodeType.APPROVAL]: ApprovalNode,
  [WorkflowNodeType.AUTOMATED]: AutomatedNode,
  [WorkflowNodeType.END]: EndNode,
};