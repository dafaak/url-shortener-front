import Link from 'next/link';
import { ArrowRight, BarChart3, Zap, ShieldCheck, Play } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500/30">
      {/* Luces de fondo consistentes */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-900/20 blur-[120px]" />
      </div>

      {/* Navbar Minimalista */}
      <nav className="relative z-10 flex justify-between items-center p-8 max-w-7xl mx-auto">
        <div className="text-2xl font-black tracking-tighter italic">
          GHST<span className="text-blue-500">TECH</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-sm font-medium text-slate-400 hover:text-white transition">
            Login
          </Link>
          <Link href="/register" className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-bold hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-lg shadow-white/5">
            Get Started
          </Link>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-24 lg:py-32">
        {/* Badge Hero */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-8 animate-fade-in">
          <Zap size={14} />
          <span>v2.0 ahora disponible para ingenieros</span>
        </div>

        <h1 className="text-6xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1]">
          Links más cortos,<br />
          <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            impacto masivo.
          </span>
        </h1>
        
        <p className="text-lg text-slate-400 max-w-2xl mb-12 leading-relaxed">
          Gestión de enlaces con arquitectura de alto rendimiento. 
          Métricas en tiempo real y despliegue minimalista diseñado por ingenieros.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5">
          <Link href="/register" className="group bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/30 flex items-center gap-2">
            Comenzar Gratis
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="flex items-center gap-2 border border-slate-800 bg-slate-900/50 backdrop-blur-md px-10 py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all">
            <Play size={18} fill="currentColor" />
            Ver Demo
          </button>
        </div>
      </main>

      {/* Feature Grid con Glassmorphism */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              icon: <Zap className="text-blue-400" />, 
              title: "Rápido", 
              desc: "Infraestructura optimizada para una redirección casi instantánea en ms.",
              step: "01"
            },
            { 
              icon: <ShieldCheck className="text-indigo-400" />, 
              title: "Seguro", 
              desc: "Privacidad por diseño. Tus datos están cifrados y bajo tu control total.",
              step: "02"
            },
            { 
              icon: <BarChart3 className="text-blue-400" />, 
              title: "Analítico", 
              desc: "Métricas avanzadas de tráfico y origen con visualización técnica.",
              step: "03"
            }
          ].map((feature, i) => (
            <div key={i} className="group p-8 bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl hover:border-blue-500/50 transition-all duration-500">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <span className="text-slate-700 font-mono text-sm">{feature.step}</span>
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer simple */}
      <footer className="relative z-10 border-t border-slate-900 py-12 text-center text-slate-600 text-sm">
        <p>&copy; 2026 GhstTech. Built for performance.</p>
      </footer>
    </div>
  );
}