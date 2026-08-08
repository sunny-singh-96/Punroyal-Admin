"use client";
import { CheckCircle2, AlertCircle, X, HelpCircle } from 'lucide-react';

interface StatusModalProps {
  isOpen: boolean;
  type: 'success' | 'error' | 'confirm';
  title: string;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
}

export default function StatusModal({ isOpen, type, title, message, onClose, onConfirm }: StatusModalProps) {
  if (!isOpen) return null;

  const icons = {
    success: <CheckCircle2 size={40} className="text-emerald-500" />,
    error: <AlertCircle size={40} className="text-red-500" />,
    confirm: <HelpCircle size={40} className="text-blue-500" />
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-[400px] rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-10 flex flex-col items-center text-center">
          <div className="mb-6">{icons[type]}</div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
          <p className="text-slate-500 text-sm leading-relaxed">{message}</p>
        </div>
        
        <div className="flex gap-0 border-t border-slate-100">
          {type === 'confirm' ? (
            <>
              <button onClick={onClose} className="flex-1 py-5 text-sm font-bold text-slate-400 hover:bg-slate-50 transition-colors">Cancel</button>
              <button onClick={onConfirm} className="flex-1 py-5 text-sm font-bold text-blue-600 border-l border-slate-100 hover:bg-blue-50 transition-colors uppercase tracking-widest">Confirm</button>
            </>
          ) : (
            <button onClick={onClose} className={`flex-1 py-5 text-sm font-bold hover:bg-slate-50 transition-colors uppercase tracking-widest ${type === 'success' ? 'text-emerald-600' : 'text-red-600'}`}>
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}