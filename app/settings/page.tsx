"use client";
import React from 'react';
import { Building2, MapPin, Globe, CreditCard, Save } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-black text-slate-900 mb-8">Business Settings</h1>

      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-black text-slate-400 uppercase mb-2 block">Enterprise Name</label>
              <input type="text" defaultValue="Punroyal" className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl font-bold outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="text-xs font-black text-slate-400 uppercase mb-2 block">GST Number</label>
              <input type="text" placeholder="03AAAAA0000A1Z5" defaultValue="03ADHPN0644H1ZV" className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl font-bold outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div>
            <label className="text-xs font-black text-slate-400 uppercase mb-2 block">Warehouse Address</label>
            <textarea
              rows={3}
              defaultValue="865, Industrial Area A, R. K. Road, Near Cheema Chowk, Ludhiana. Punjab 141003, land mark Opposite H. P. Petrol pump"
              className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl font-bold outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
            <Save size={18} /> Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}