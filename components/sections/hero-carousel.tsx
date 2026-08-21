'use client'

import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const slides = [
  { src: '/office/owes.jpg', label: 'Accueil OWES' },
  { src: '/office/coworking.jpg', label: 'Espace coworking' },
  { src: '/office/salle_reunion.jpg', label: 'Salle de réunion' },
  { src: '/office/bureau_prive.jpg', label: 'Bureau privé' },
  { src: '/office/formation.jpg', label: 'Espace formation' },
]

export function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (isPaused || reducedMotion.matches) return

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
    }, 5500)

    return () => window.clearInterval(timer)
  }, [isPaused])

  const changeSlide = (direction: number) => {
    setActiveSlide((current) => (current + direction + slides.length) % slides.length)
  }

  return (
    <div className="absolute inset-0" aria-label="Aperçu des espaces OWES" aria-roledescription="carousel">
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-out motion-reduce:transition-none ${
            index === activeSlide ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          aria-hidden={index !== activeSlide}
        >
          <Image
            src={slide.src}
            alt=""
            fill
            priority={index === 0}
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-linear-to-b from-brand-950/35 to-brand-950/0" />

      <div className="absolute bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/30 p-2 shadow-[0_8px_30px_rgba(0,15,61,0.55)] backdrop-blur-xl sm:bottom-6">
        <div className="mr-1 hidden rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md sm:block">
          {slides[activeSlide].label}
        </div>
        <button type="button" onClick={() => changeSlide(-1)} className="grid size-10 place-items-center rounded-full border border-white/35 bg-white/10 text-white transition hover:bg-white/25" aria-label="Image précédente">
          <ChevronLeft size={18} />
        </button>
        <button type="button" onClick={() => setIsPaused((current) => !current)} className="grid size-10 place-items-center rounded-full border border-white/35 bg-white/10 text-white transition hover:bg-white/25" aria-label={isPaused ? 'Reprendre le diaporama' : 'Mettre le diaporama en pause'}>
          {isPaused ? <Play size={16} /> : <Pause size={16} />}
        </button>
        <button type="button" onClick={() => changeSlide(1)} className="grid size-10 place-items-center rounded-full border border-white/35 bg-white/10 text-white transition hover:bg-white/25" aria-label="Image suivante">
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="absolute bottom-[5.15rem] left-1/2 z-40 flex -translate-x-1/2 gap-1.5 rounded-full bg-brand-950/75 px-3 py-2 shadow-lg backdrop-blur-md sm:bottom-[5.65rem]">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => setActiveSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${index === activeSlide ? 'w-8 bg-rose-500' : 'w-3 bg-white/45 hover:bg-white/75'}`}
            aria-label={`Afficher ${slide.label}`}
            aria-current={index === activeSlide ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
  )
}
