import React, { useState, useEffect } from 'react';
import { X, Loader2, CheckCircle2 } from 'lucide-react';
import { ORDER_STATUS_CONFIG, canTransition } from './utils';

interface UpdateStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStatus: string;
  orderId: number;
  onUpdate: (newStatus: string) => void;
}

export default function UpdateStatusModal({
  isOpen,
  onClose,
  currentStatus,
  orderId,
  onUpdate,
}: UpdateStatusModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const allowed = Object.keys(ORDER_STATUS_CONFIG).filter(status =>
        canTransition(currentStatus, status)
      );
      // Default to the first allowed status, if any
      setSelectedStatus(allowed[0] || '');
    }
  }, [currentStatus, isOpen]);

  if (!isOpen) return null;

  const availableStatuses = Object.keys(ORDER_STATUS_CONFIG).filter(status =>
    canTransition(currentStatus, status)
  );

  const handleSubmit = async () => {
    if (!selectedStatus) {
      console.error('No status selected');
      return;
    }
    if (selectedStatus === currentStatus) {
      onClose();
      return;
    }
    setLoading(true);
    try {
      await onUpdate(selectedStatus);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Update Order Status</h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full">
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <div className="text-sm text-slate-500">
            Current: <span className="font-medium">{ORDER_STATUS_CONFIG[currentStatus]?.label || currentStatus}</span>
          </div>
          {availableStatuses.length === 0 ? (
            <div className="text-sm text-amber-600">No further status changes allowed.</div>
          ) : (
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {availableStatuses.map(status => (
                <option key={status} value={status}>
                  {ORDER_STATUS_CONFIG[status]?.label || status}
                </option>
              ))}
            </select>
          )}
          <button
            onClick={handleSubmit}
            disabled={loading || availableStatuses.length === 0}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle2 size={18} />}
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
}