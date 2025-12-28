'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { SearchModal } from '@/components/ui/SearchModal';

interface HomePageWrapperProps {
  children: React.ReactNode;
}

export function HomePageWrapper({ children }: HomePageWrapperProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />
      {children}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}

export default HomePageWrapper;
