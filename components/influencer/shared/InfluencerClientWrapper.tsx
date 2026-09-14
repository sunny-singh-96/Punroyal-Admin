"use client";
import React, { useState } from 'react';
import InfluencerSidebar from "./InfluencerSidebar";
import InfluencerHeader from "./InfluencerHeader";

export default function InfluencerClientWrapper({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar gets state and setter */}
      <InfluencerSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
        {/* Header gets setter to open sidebar on mobile */}
        <InfluencerHeader setIsOpen={setIsOpen} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8 animate-in fade-in duration-700">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
