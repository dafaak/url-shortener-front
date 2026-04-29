import { Copy, ExternalLink, BarChart3, Trash2, MousePointerClick , Lock} from 'lucide-react';
import { toast } from 'sonner';
import { Link } from '@/types/link';
import { useUser } from '@/providers/UserProvider';
import api from '@/lib/api';

interface LinkCardProps {
  link: Link;
  onDeleteSuccess: (id: number) => void; 
}

export function LinkCard({ link, onDeleteSuccess }: LinkCardProps) {
  const {user}=useUser();
  const isPremium= user?.plan==="premium";

  const copyToClipboard = () => {
    const slug = link.short_code;
    const fullLink = `ghst.tech/${slug}`;
    navigator.clipboard.writeText(fullLink);
    
    toast.success('¡Enlace copiado!', {
      description: `${fullLink}`,
      icon: <Copy size={16} className="text-blue-500" />,
      duration: 2000, 
    });
  };

  const handleDelete = () => {
  toast("¿Eliminar este enlace?", {
    icon: <Trash2 size={16} className="text-red-500" />,
    description: "Esta acción borrará todas las estadísticas permanentemente.",
    duration: Infinity, // No desaparece hasta que el usuario decida
    action: {
      label: "Eliminar",
      onClick: async () => {
        try {
          await api.delete(`/api/links/${link.id}`);
          onDeleteSuccess(link.id);
        } catch (error) {
          // Error manejado por el interceptor
        }
      },
    },
    cancel: {
      label: "Cancelar",
      onClick: () => {},
    },
  });
};

  const handleStatsClick = () => {
  if (user?.plan === 'free') {
  
    toast.info("Función Premium", {
      description: "Hazte Premium para ver estadísticas de tus enlaces.",
      action: {
        label: "Upgrade",
        onClick:()=> console.log('quiero ser premium')
        // onClick: () => router.push('/billing')
      }
    });
    return;
  }
  // router.push(`/stats/${link.id}`);
};

  return (
    <div className="p-5 bg-white/70 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between group hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 shadow-sm hover:shadow-md">
      
      <div className="flex flex-col gap-0.5 overflow-hidden">
        {/* Alias (Solo si existe) */}
        {link.alias && (
          <h3 className="text-slate-900 dark:text-slate-100 font-bold text-sm mb-0.5 truncate max-w-[200px] sm:max-w-xs">
            {link.alias}
          </h3>
        )}

        {/* URL Acortada */}
        <a 
          href={`https://ghst.tech/${link.short_code}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 font-semibold text-base flex items-center gap-1.5 w-fit hover:text-blue-700 dark:hover:text-blue-300 transition-colors group/link"
        >
          ghst.tech/{link.short_code} 
          <ExternalLink 
            size={12} 
            className="opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" 
          />
        </a>
        
        {/* URL Original y Click Count */}
        <div className="flex items-center gap-3 mt-1">
          <span className="text-slate-400 dark:text-slate-500 text-xs truncate max-w-[120px] sm:max-w-sm font-medium">
            {link.original_url}
          </span>
          
          <div className="flex items-center gap-1 px-2 py-0.5 bg-slate-100/50 dark:bg-slate-800/50 rounded-full text-[10px] font-bold text-slate-500 dark:text-slate-400">
            <MousePointerClick size={12} className="text-blue-500" />
            <span>{link.click_count}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-1">
        {/* Botones de acción (se mantienen igual) */}
        <button 
          onClick={copyToClipboard}
          className="p-2.5 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-xl text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all active:scale-90"
        >
          <Copy size={18} />
        </button>

        <button
           onClick={handleStatsClick}
          className='p-2.5 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-xl text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all active:scale-90'
        >
          <BarChart3 size={18} />
        </button>

        <button 
          onClick={handleDelete}
          className="p-2.5 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-all active:scale-90"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}