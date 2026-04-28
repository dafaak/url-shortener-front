"use client"
import { useState, useEffect } from 'react'
import { Link2, Plus, Copy, ExternalLink, BarChart3, Trash2 } from 'lucide-react'
import axios from 'axios'

export default function Dashboard() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [links, setLinks] = useState([]) // Aquí guardaremos lo que traiga la API

  const API_URL = process.env.NEXT_PUBLIC_API_URL
  
  useEffect(()=>{
    console.log("API: ",process.env.NEXT_PUBLIC_API_URL);
  },[])

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Llamada real a tu endpoint de Go en Render
      const res = await axios.post(`${API_URL}/shorten`, { 
        original_url: url 
      })
      
      // Si todo sale bien, podrías limpiar el input o recargar la lista
      setUrl('')
      alert("¡Link creado con éxito!")
    } catch (error) {
      console.error("Error al crear el link:", error)
      alert("Hubo un error al conectar con el backend.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto  py-10 px-4">
      <header className="mb-10">
        
        <p className="text-slate-400 mt-2">Gestiona tus URLs acortadas y revisa tus estadísticas.</p>
      </header>

      {/* Formulario de Acortado */}
      <section className="mb-12">
        <form onSubmit={handleShorten} className="flex gap-3 p-2 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl focus-within:border-blue-500/50 transition-all">
          <div className="flex-1 flex items-center gap-3 px-4">
            <Link2 className="text-slate-500" size={22} />
            <input 
              type="url" 
              placeholder="Pega tu link largo aquí (https://...)"
              className="bg-transparent border-none outline-none w-full text-slate-100 placeholder:text-slate-600 py-3"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Procesando...' : <><Plus size={18} /> Acortar</>}
          </button>
        </form>
      </section>

      {/* Título de la lista */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-200">Enlaces Recientes</h2>
      </div>

      {/* Lista de Enlaces (Skeleton o Lista vacía por ahora) */}
      <div className="space-y-4">
        <div className="p-5 bg-slate-900/40 border border-slate-800/60 rounded-xl flex items-center justify-between group hover:border-slate-700 transition-all">
          <div className="flex flex-col gap-1">
            <span className="text-blue-400 font-medium text-lg flex items-center gap-2 cursor-pointer hover:underline">
              ghost.tech/ejemplo <ExternalLink size={14} />
            </span>
            <span className="text-slate-500 text-sm truncate max-w-sm">
              https://www.tu-url-muy-larga-que-viene-de-algun-lado.com
            </span>
          </div>
          
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors" title="Copiar">
              <Copy size={18} />
            </button>
            <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors" title="Estadísticas">
              <BarChart3 size={18} />
            </button>
            <button className="p-2 hover:bg-red-500/10 rounded-lg text-slate-400 hover:text-red-400 transition-colors" title="Eliminar">
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}