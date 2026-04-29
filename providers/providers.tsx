"use client";

import { ThemeProvider } from 'next-themes';
import { UserProvider } from './UserProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem
    >
      <UserProvider>
        {children}
      </UserProvider>
    </ThemeProvider>
  );
}
