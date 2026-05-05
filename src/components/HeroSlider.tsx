'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function HeroSlider({ slides }: { slides: any[] }) {
  if (!slides || slides.length === 0) return null

  const fallbackImage = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop';

  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 pt-32 pb-12" id="home">
      <div className="w-full h-[60vh] md:h-[85vh] rounded-3xl overflow-hidden relative shadow-2xl bg-card">
        <Swiper
          modules={[Autoplay, EffectFade, Navigation, Pagination]}
          effect="fade"
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          loop
          className="h-full w-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative h-full w-full flex items-center justify-center bg-page-bg">
                {/* Original background image with no fade */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${slide.imageUrl || fallbackImage})` }}
                />
                
                {/* Gradient overlay to ensure text is readable over any image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                <div className="relative z-10 max-w-3xl mx-auto px-8 text-center animate-fade-in-up flex flex-col items-center justify-center h-full">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-5 tracking-tight drop-shadow-lg" style={{ color: '#FFFFFF' }}>
                    {slide.title}
                  </h1>
                  {slide.subtitle && (
                    <p className="text-base md:text-lg lg:text-xl mb-8 leading-relaxed font-light drop-shadow-md max-w-2xl" style={{ color: 'rgba(255,255,255,0.9)' }}>
                      {slide.subtitle}
                    </p>
                  )}
                  <div className="flex justify-center">
                    <a 
                      href="#services" 
                      className="bg-white text-black px-8 py-3 text-xs md:text-sm font-bold uppercase tracking-widest hover:opacity-80 transition-opacity shadow-lg"
                      style={{ borderRadius: '10px' }}
                    >
                      Explore Services
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
