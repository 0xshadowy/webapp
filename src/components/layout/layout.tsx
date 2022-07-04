import React from 'react';
import Sidebar from '../sidebar';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-screen h-screen flex">
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;
