// src/app/register/page.tsx
'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Loader2, UserPlus } from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({ email: '', password: '', username: '' });
const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://api.ghst.tech/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Después de registrar, lo mandamos al login
        router.push('/login?registered=true');
      }
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  };

  return (
<div className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden">
  {/* Decoración de fondo: Luces difusas */}
  <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px]" />
  <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-900/20 blur-[120px]" />

  <form 
    onSubmit={handleRegister} 
    className="relative z-10 w-full max-w-md p-10 bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl space-y-8"
  >
    <div className="text-center space-y-2">
      <h1 className="text-3xl font-extrabold tracking-tight text-white">
        Únete a <span className="text-blue-500">GhstTech</span>
      </h1>
      <p className="text-slate-400 text-sm">Crea tu cuenta para empezar</p>
    </div>

    <div className="space-y-5">
      {/* Input Group Template */}
      {[
        { id: 'user', icon: User, type: 'text', placeholder: 'Nombre completo', val: username, set: setUsername },
        { id: 'email', icon: Mail, type: 'email', placeholder: 'Correo electrónico', val: email, set: setEmail },
        { id: 'pass', icon: Lock, type: 'password', placeholder: 'Contraseña', val: password, set: setPassword }
      ].map((input) => (
        <div key={input.id} className="group relative">
          <input.icon 
            className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-blue-500 transition-colors" 
            size={18} 
          />
          <input 
            type={input.type} 
            placeholder={input.placeholder}
            className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 outline-none 
                       focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm text-white
                       placeholder:text-slate-600"
            value={input.val}
            onChange={(e) => input.set(e.target.value)}
            required
          />
        </div>
      ))}
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
          <span>Comenzar ahora</span>
          <UserPlus size={18} className="group-hover:translate-x-1 transition-transform" />
        </>
      )}
    </button>

    <div className="text-center pt-2">
      <p className="text-slate-500 text-sm">
        ¿Ya tienes cuenta?{" "}
        <a href="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
          Inicia sesión
        </a>
      </p>
    </div>
  </form>
</div>
  );
}