"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, Loader2 } from 'lucide-react';
import api from '@/lib/api'; // Ajusta la ruta según tu alias

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
      localStorage.setItem('token', data.token);
      
      router.push('/'); // Al Dashboard
    } catch (error) {
      alert("Credenciales incorrectas o error en el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <form onSubmit={handleLogin} className="w-full max-w-md p-8 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Bienvenido a GhostTech</h1>
          <p className="text-slate-400 text-sm">Ingresa tus credenciales para continuar</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 text-slate-500" size={20} />
            <input 
              type="email" 
              placeholder="Correo electrónico"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-10 pr-4 outline-none focus:border-blue-500 transition-all text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-slate-500" size={20} />
            <input 
              type="password" 
              placeholder="Contraseña"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-10 pr-4 outline-none focus:border-blue-500 transition-all text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button 
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : "Iniciar Sesión"}
        </button>
      </form>
    </div>
  );
}