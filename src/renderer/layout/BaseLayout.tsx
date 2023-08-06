import React, { ReactNode } from 'react';

export const BaseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center bg-[#03001C] text-white p-3 gap-2">
      {children}
    </div>
  );
};
