"use client"
import { useState, useEffect } from 'react'
import { ShortenForm } from '@/components/dashboard/ShortenForm'
import { LinkCard } from '@/components/dashboard/LinkCard'
import axios from 'axios'
import api from '@/lib/api'
import { Link } from '@/types/link'

export default function Dashboard() {
  const [links, setLinks] = useState<Link[]>([])
  const [loading, setLoading] = useState(true)

  const fetchLinks = async () => {
    try {
      const res = await api.get<Link[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/my-links`)
      setLinks(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteLink = (id: number) => {
  setLinks(prevLinks => prevLinks.filter(link => link.id !== id));
};

  useEffect(() => { fetchLinks() }, [])

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 transition-colors duration-500">
      {/* Header con tipografía técnica */}
      <header className="mb-10 animate-fade-in">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Panel de <span className="text-blue-600 dark:text-blue-500">Control</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
          Gestiona tus URLs con rendimiento <span className="text-slate-900 dark:text-slate-200">GhstTech</span>.
        </p>
      </header>

      {/* Sección del Formulario */}
      <section className="mb-16 relative z-10">
        <ShortenForm onLinkCreated={fetchLinks} />
      </section>

      {/* Listado de Enlaces */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Mis Enlaces</h2>
          <span className="text-xs font-mono px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-md">
            {links.length} TOTAL
          </span>
        </div>

        {loading ? (
          /* Skeleton Loader mejorado */
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div 
                key={i} 
                className="h-24 w-full bg-slate-200/50 dark:bg-slate-800/50 animate-pulse rounded-2xl border border-slate-200 dark:border-slate-800" 
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-4">
            {links.length > 0 ? (
              links.map((link: any) => <LinkCard key={link.id} link={link} onDeleteSuccess={handleDeleteLink}/>)
            ) : (
              /* Empty State con estilo minimalista */
              <div className="flex flex-col items-center justify-center py-20 px-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50/50 dark:bg-slate-900/20">
                <p className="text-slate-500 dark:text-slate-400 text-center max-w-xs leading-relaxed">
                  Tu base de datos está vacía. <br />
                  <span className="text-blue-600 dark:text-blue-400 font-semibold italic">¡Es hora de acortar algo masivo!</span>
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}