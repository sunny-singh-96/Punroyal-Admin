"use client";
import { X, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  type?: 'success' | 'error' | 'confirm' | 'info' | 'custom';
  title: string;
  message?: string;
  onClose: () => void;
  onConfirm?: () => void;
  children?: React.ReactNode; 
}

export default function Modal({ isOpen, type = 'info', title, message, onClose, onConfirm, children }: ModalProps) {
  if (!isOpen) return null;

  const themes = {
    success: { icon: <CheckCircle className="text-green-500" size={40} />, btn: 'bg-green-600', bg: 'bg-green-50' },
    error: { icon: <X className="text-red-500" size={40} />, btn: 'bg-red-600', bg: 'bg-red-50' },
    confirm: { icon: <AlertTriangle className="text-orange-500" size={40} />, btn: 'bg-blue-600', bg: 'bg-orange-50' },
    info: { icon: <Info className="text-blue-500" size={40} />, btn: 'bg-blue-600', bg: 'bg-blue-50' },
    custom: { icon: null, btn: 'bg-blue-600', bg: 'bg-white' }
  };

  const theme = themes[type] || themes.info;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className={`bg-white rounded-[2.5rem] w-full ${type === 'custom' ? 'max-w-2xl' : 'max-w-md'} overflow-hidden shadow-2xl scale-in-center`}>
        
        {/* Header Section */}
        <div className={`p-8 flex flex-col ${type === 'custom' ? 'items-start text-left' : 'items-center text-center'} ${theme.bg}`}>
          {type !== 'custom' && theme.icon}
          
          <div className="flex justify-between items-center w-full">
            <h3 className={`text-xl font-black text-slate-900 ${type === 'custom' ? 'mt-0' : 'mt-4'}`}>
              {title}
            </h3>
            {type === 'custom' && (
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                <X size={20} />
              </button>
            )}
          </div>

          {message && <p className="mt-2 text-slate-500 font-medium text-sm leading-relaxed">{message}</p>}
        </div>

        {/* Content Area - Form yahan dikhega */}
        <div className={children ? "px-8 pb-8 pt-2" : "hidden"}>
          {children}
        </div>

        {/* Footer Buttons (Alerts ke liye) */}
        {type !== 'custom' && !children && (
          <div className="p-6 flex gap-3">
            <button onClick={onClose} className="flex-1 px-6 py-3 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-all">
              Cancel
            </button>
            <button onClick={onConfirm || onClose} className={`flex-1 px-6 py-3 rounded-xl text-white font-bold shadow-lg transition-all ${theme.btn}`}>
              {type === 'success' ? 'Got it' : 'Confirm'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}