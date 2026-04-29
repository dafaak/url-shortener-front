"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import { LogOut, LayoutDashboard, User } from "lucide-react";
import Cookies from 'js-cookie';
import { useUser } from '@/providers/UserProvider'; // Importamos el contexto

export function Navbar() {
  const { user, setUser, isLoading } = useUser(); // Usamos el estado global
  const router = useRouter();

  const handleLogout = () => {
    // 1. Limpiamos Cookies
    Cookies.remove('auth_token');
    
    // 2. Limpiamos LocalStorage
    localStorage.removeItem('ghst_user');
    
    // 3. Limpiamos el estado global
    setUser(null);
    
    router.push('/login');
    router.refresh();
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-black tracking-tighter italic text-slate-900 dark:text-white">
          GHST<span className="text-blue-500">TECH</span>
        </Link>

        {/* Acciones */}
        <div className="flex items-center gap-4">
          
          {/* Mensaje de Bienvenida (Solo si está logueado) */}
          {user && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800/50 rounded-full border border-slate-200 dark:border-slate-700">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                Hola, <span className="text-blue-500">{user.username}</span>
              </span>
            </div>
          )}

          <ThemeToggle />
          
          {/* Mostramos opciones según el estado del UserProvider */}
          {!isLoading && (
            user ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition flex items-center gap-2"
                >
                  <LayoutDashboard size={18} />
                  <span className="hidden sm:inline">Panel</span>
                </Link>
                
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-500/10 text-red-600 dark:text-red-400 px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline">Salir</span>
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition">
                  Login
                </Link>
                <Link href="/register" className="bg-slate-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-blue-600 hover:text-white transition-all shadow-lg">
                  Registrarse
                </Link>
              </>
            )
          )}
        </div>
      </div>
    </nav>
  );
}