import { Copy, ExternalLink, BarChart3, Trash2 } from 'lucide-react'

export function LinkCard({ link }: { link: any }) {
  const copyToClipboard = () => {
    // Usamos el custom_code si existe, si no el short_code
    const slug = link.custom_code || link.short_code
    navigator.clipboard.writeText(`ghst.tech/${slug}`)
    // Tip: Aquí podrías añadir una notificación tipo Toast
  }

  return (
    <div className="p-5 bg-white/70 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between group hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 shadow-sm hover:shadow-md">
      
      <div className="flex flex-col gap-1 overflow-hidden">
        {/* URL Acortada - Resalta más en ambos modos */}
        <span 
          onClick={copyToClipboard}
          className="text-blue-600 dark:text-blue-400 font-bold text-lg flex items-center gap-2 cursor-pointer hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          ghst.tech/{link.custom_code || link.short_code} 
          <ExternalLink size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
        </span>
        
        {/* URL Original - Más sutil pero legible */}
        <span className="text-slate-500 dark:text-slate-400 text-sm truncate max-w-[180px] sm:max-w-md font-medium">
          {link.original_url}
        </span>
      </div>
      
      <div className="flex items-center gap-1">
        {/* Botón Copiar */}
        <button 
          onClick={copyToClipboard}
          className="p-2.5 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-xl text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all active:scale-90"
          title="Copiar enlace"
        >
          <Copy size={18} />
        </button>

        {/* Botón Estadísticas */}
        <button 
          className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-all active:scale-90"
          title="Ver analíticas"
        >
          <BarChart3 size={18} />
        </button>

        {/* Botón Eliminar */}
        <button 
          className="p-2.5 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-all active:scale-90"
          title="Eliminar enlace"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  )
}