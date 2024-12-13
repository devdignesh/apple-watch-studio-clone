import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-screen min-h-[35rem] min-w-[400px] overflow-x-hidden">
      {children}
    </div>
  );
};

export default layout;
