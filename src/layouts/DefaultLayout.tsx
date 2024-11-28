import React, { ReactNode } from 'react';
import Header from '../components/Header/Header';

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default DefaultLayout;
