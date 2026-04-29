"use client"
import { useState } from 'react'
import { Link2, Plus, Lock, Globe, EyeOff } from 'lucide-react'
import api from '@/lib/api'

export function ShortenForm({ onLinkCreated }: { onLinkCreated: () => void }) {
  const [loading, setLoading] = useState(false)
  const [isPremium] = useState(false) // Esto vendría de tu sesión/user
  
  const [formData, setFormData] = useState({
    url: '',
    custom_code: '',
    is_public: true
  })

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/shorten`, formData)
      setFormData({ url: '', custom_code: '', is_public: true })
      onLinkCreated()
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleShorten} className="space-y-4">
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

      <div className="flex flex-wrap gap-4 px-2">
        {/* Custom Code - Premium Only */}
        <div className="flex items-center gap-2 group">
          <div className="relative">
            <input 
              type="text" 
              disabled={!isPremium}
              placeholder={isPremium ? "Alias personalizado" : "Alias (Premium)"}
              className="bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-blue-500/50 disabled:cursor-not-allowed"
              value={formData.custom_code}
              onChange={(e) => setFormData({...formData, custom_code: e.target.value})}
            />
            {!isPremium && <Lock size={12} className="absolute right-2 top-2.5 text-slate-500" />}
          </div>
        </div>

        {/* Public/Private Toggle */}
        <button
          type="button"
          onClick={() => setFormData({...formData, is_public: !formData.is_public})}
          className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-500 transition-colors"
        >
          {formData.is_public ? <Globe size={16} /> : <EyeOff size={16} />}
          {formData.is_public ? "Público" : "Privado"}
        </button>
      </div>
    </form>
  )
}