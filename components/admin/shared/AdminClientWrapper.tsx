"use client";
import React, { useState } from 'react';
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AdminClientWrapper({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar gets state and setter */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
        {/* Header gets setter to open sidebar on mobile */}
        <Header setIsOpen={setIsOpen} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8 animate-in fade-in duration-700">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}