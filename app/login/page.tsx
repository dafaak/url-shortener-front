"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import api from '@/lib/api'; // Ajusta la ruta según tu alias
import { User, Lock, Loader2, LogIn } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Endpoint que definimos en Go (ej. /login o /auth/login)
      const { data } = await api.post('/login', { email, password });
      
      // Guardamos el JWT
      Cookies.set('auth_token', data.token, { 
        expires: 7, // La cookie expira en 7 días
        path: '/',  // Disponible en toda la app
        secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
        sameSite: 'strict'
      });
      
      router.push('/'); // Al Dashboard
      router.refresh();
    } catch (error) {
      alert("Credenciales incorrectas o error en el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden">
  {/* Decoración de fondo idéntica para consistencia */}
  <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px]" />
  <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-900/20 blur-[120px]" />

  <form 
    onSubmit={handleLogin} 
    className="relative z-10 w-full max-w-md p-10 bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl space-y-8"
  >
    <div className="text-center space-y-2">
      <h1 className="text-3xl font-extrabold tracking-tight text-white">
        Bienvenido a <span className="text-blue-500">GhstTech</span>
      </h1>
      <p className="text-slate-400 text-sm">Ingresa tus credenciales para continuar</p>
    </div>

    <div className="space-y-5">
      {/* Input de Email */}
      <div className="group relative">
        <User 
          className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-blue-500 transition-colors" 
          size={18} 
        />
        <input 
          type="email" 
          placeholder="Correo electrónico"
          className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 outline-none 
                     focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm text-white
                     placeholder:text-slate-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Input de Password */}
      <div className="group relative">
        <Lock 
          className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-blue-500 transition-colors" 
          size={18} 
        />
        <input 
          type="password" 
          placeholder="Contraseña"
          className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 outline-none 
                     focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm text-white
                     placeholder:text-slate-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
    </div>

    <button 
      disabled={loading}
      className="group relative w-full bg-blue-600 hover:bg-blue-500 py-3.5 rounded-2xl font-bold transition-all 
                 flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-blue-900/20 active:scale-[0.98]"
    >
      {loading ? (
        <Loader2 className="animate-spin" size={20} />
      ) : (
        <>
          <span>Iniciar Sesión</span>
          <LogIn size={18} className="group-hover:translate-x-1 transition-transform" />
        </>
      )}
    </button>

    <div className="text-center pt-2">
      <p className="text-slate-500 text-sm">
        ¿Eres nuevo?{" "}
        <a href="/register" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
          Crea una cuenta
        </a>
      </p>
    </div>
  </form>
</div>
  );
}