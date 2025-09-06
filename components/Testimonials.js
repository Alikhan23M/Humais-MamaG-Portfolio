'use client'

import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules' // just import, no SwiperCore registration
import { Star, Quote } from 'lucide-react'

import 'swiper/css'

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials')
      if (response.ok) {
        const data = await response.json()
        setTestimonials(data)
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error)
    }
  }

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-950">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">What Clients Say</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Don't just take my word for it - here's what my clients have to say about working with me
          </p>
        </div>

        <Swiper
         modules={[Autoplay]}                // <-- Use modules from 'swiper/modules'
        slidesPerView={1}
        spaceBetween={24}
        loop={true}
        grabCursor={true}
        autoplay={{
          delay:0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={4000}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 16 },
          768: { slidesPerView: 2, spaceBetween: 24 },
          1440: { slidesPerView: 3, spaceBetween: 32 },
        }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial._id}>
              <div className="bg-gray-800/80 p-6 rounded-2xl shadow-2xl max-w-xl mx-auto hover:scale-[1.02] transition-transform duration-300">
                <Quote className="text-purple-500 opacity-20 mb-4" size={32} />
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={16} />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-purple-500"
                  />
                  <div className="text-left">
                    <h4 className="text-white font-bold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">
                      {testimonial.position} at {testimonial.company}
                    </p>
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
