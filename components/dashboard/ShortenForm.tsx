"use client"
import { useState } from 'react'
import { Link2, Plus, Lock, Tag, Globe, EyeOff } from 'lucide-react'
import api from '@/lib/api'
import { useUser } from '@/providers/UserProvider'

export function ShortenForm({ onLinkCreated }: { onLinkCreated: () => void }) {
  const { user } = useUser() 
  const [loading, setLoading] = useState(false)
  
  const isPremium = user?.plan === 'premium'
  
  const [formData, setFormData] = useState({
    url: '',
    custom_code: '',
    alias: '', 
    is_public: true
  })

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        ...formData,
        custom_code: isPremium ? formData.custom_code : "",
        alias: formData.alias.trim() || null // Enviamos null si está vacío
      }

      await api.post('/api/shorten', payload)
      setFormData({ url: '', custom_code: '', alias: '', is_public: true })
      onLinkCreated()
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleShorten} className="space-y-4">
      {/* Input Principal: URL */}
      <div className="flex flex-col md:flex-row gap-3 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl focus-within:border-blue-500/50 transition-all">
        <div className="flex-1 flex items-center gap-3 px-4">
          <Link2 className="text-slate-400" size={20} />
          <input 
            type="url" 
            placeholder="Pega tu link largo aquí..."
            className="bg-transparent border-none outline-none w-full text-slate-900 dark:text-slate-100 py-3"
            value={formData.url}
            onChange={(e) => setFormData({...formData, url: e.target.value})}
            required
          />
        </div>
        <button 
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? '...' : <><Plus size={18} /> Acortar</>}
        </button>
      </div>

      {/* Inputs Secundarios: Alias y Custom Code */}
      <div className="flex flex-wrap gap-4 px-2">
        
        {/* Alias del Enlace*/}
        <div className="flex items-center gap-2 group">
          <div className="relative flex items-center">
            <Tag size={14} className="absolute left-3 text-slate-400" />
            <input 
              type="text" 
              placeholder="Nombre del enlace (opcional)"
              className="bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-sm outline-none focus:border-blue-500/50 transition-all w-64"
              value={formData.alias}
              onChange={(e) => setFormData({...formData, alias: e.target.value})}
            />
          </div>
        </div>

        {/* Custom Code (Solo Premium) */}
        <div className="flex items-center gap-2 group">
          <div className="relative flex items-center">
            <input 
              type="text" 
              disabled={!isPremium}
              placeholder={isPremium ? "Slug personalizado (ej: mi-web)" : "Slug (Solo Premium)"}
              className={`bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-sm outline-none transition-all
                ${isPremium ? 'focus:border-blue-500/50 w-64' : 'cursor-not-allowed opacity-70 w-52'}`}
              value={formData.custom_code}
              onChange={(e) => setFormData({...formData, custom_code: e.target.value})}
            />
            {!isPremium && (
              <Lock 
                size={12} 
                className="absolute right-2 text-slate-500" 
              />
            )}
          </div>
        </div>

      </div>
    </form>
  )
}