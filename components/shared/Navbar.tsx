import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle'; // El componente que hicimos antes

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-black tracking-tighter italic text-slate-900 dark:text-white">
          GHOST<span className="text-blue-500">TECH</span>
        </Link>

        {/* Acciones */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          <Link href="/login" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition">
            Login
          </Link>
          <Link href="/register" className="bg-slate-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-blue-600 hover:text-white transition-all shadow-lg">
            Registrarse
          </Link>
        </div>
      </div>
    </nav>
  );
}