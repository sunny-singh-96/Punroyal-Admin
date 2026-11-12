"use client";

import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  rightContent?: React.ReactNode;
  transparent?: boolean;
  className?: string;
}

export default function PageHeader({
  title,
  subtitle,
  rightContent,
  transparent = false,
  className = "",
}: PageHeaderProps) {
  if (transparent) {
    return (
      <div className={`w-full py-1 ${className}`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
                {subtitle}
              </p>
            )}
          </div>
          {rightContent && <div>{rightContent}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white border-b border-slate-100 sticky top-0 z-10 shadow-sm ${className}`}>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-normal tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
              {title}
            </h1>

            {subtitle && (
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mt-1">
                {subtitle}
              </p>
            )}
          </div>

          {rightContent && <div>{rightContent}</div>}
        </div>
      </div>
    </div>
  );
}
