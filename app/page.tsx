import Link from 'next/link';
import { ArrowRight, BarChart3, Zap, ShieldCheck, Play } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-sans selection:bg-blue-500/30 transition-colors duration-500">
      
      {/* Luces de fondo consistentes y adaptativas */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 dark:bg-blue-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 dark:bg-indigo-900/20 blur-[120px]" />
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-24 lg:py-32">
        {/* Badge Hero */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-600 dark:text-blue-400 text-xs font-medium mb-8 animate-fade-in">
          <Zap size={14} />
          <span>v1.0 ahora disponible</span>
        </div>

        <h1 className="text-6xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1] text-slate-900 dark:text-white">
          Links más cortos,<br />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 bg-clip-text text-transparent">
            impacto masivo.
          </span>
        </h1>
        
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mb-12 leading-relaxed">
          Gestión de enlaces con arquitectura de alto rendimiento. 
          Métricas en tiempo real y despliegue minimalista diseñado por ingenieros.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5">
          <Link href="/register" className="group bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 dark:shadow-blue-900/30 flex items-center gap-2">
            Comenzar Gratis
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="flex items-center gap-2 border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md px-10 py-4 rounded-2xl font-bold text-lg text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
            <Play size={18} fill="currentColor" />
            Ver Demo
          </button>
        </div>
      </main>

      {/* Feature Grid con Glassmorphism Adaptativo */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              icon: <Zap className="text-blue-600 dark:text-blue-400" />, 
              title: "Rápido", 
              desc: "Infraestructura optimizada para una redirección casi instantánea en ms.",
              step: "01"
            },
            { 
              icon: <ShieldCheck className="text-indigo-600 dark:text-indigo-400" />, 
              title: "Seguro", 
              desc: "Privacidad por diseño. Tus datos están cifrados y bajo tu control total.",
              step: "02"
            },
            { 
              icon: <BarChart3 className="text-blue-600 dark:text-blue-400" />, 
              title: "Analítico", 
              desc: "Métricas avanzadas de tráfico y origen con visualización técnica.",
              step: "03"
            }
          ].map((feature, i) => (
            <div key={i} className="group p-8 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl hover:border-blue-500/50 transition-all duration-500 shadow-sm dark:shadow-none">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-slate-100 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <span className="text-slate-400 dark:text-slate-700 font-mono text-sm">{feature.step}</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer simple */}
      <footer className="relative z-10 border-t border-slate-200 dark:border-slate-900 py-12 text-center text-slate-500 dark:text-slate-600 text-sm">
        <p>&copy; 2026 GhstTech. Built for performance.</p>
      </footer>
    </div>
  );
}