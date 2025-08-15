'use client'
import Link from 'next/link'



export default function TestimonialsPage() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Mitchell",
      text: "Working with Studio Zephyr was an extraordinary experience. The artistic vision and attention to detail brought my ideas to life in ways I never imagined possible.",
      project: "Custom Portrait Commission"
    },
    {
      id: 2,
      name: "Marcus Thompson",
      text: "I commissioned a piece for my partner's birthday and the result was absolutely breathtaking. The artist captured not just the visual elements but the emotional essence of what I was trying to convey.",
      project: "Anniversary Gift Artwork"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      text: "The professionalism and creativity of Studio Zephyr is unmatched. From initial consultation to final delivery, every step was handled with exceptional care and expertise.",
      project: "Interior Design Commission"
    }
  ]



  return (
    <div className="container">
      
      {/* Title Section */}
      <div className="title-section">
        <h2 className="text-5xl md:text-8xl">
          TESTIMONIALS
        </h2>
        <p>Kind words from people who've commissioned and supported my art</p>
      </div>
      

      {/* Testimonials Grid */}
      <div className="md:w-1/2 mx-auto mb-16">
        {testimonials.map((testimonial: Testimonial) => (
          <div key={testimonial.id} className="text-center mb-12">

            <div className="w-[250px] h-[1px] bg-[linear-gradient(90deg,transparent,var(--tx3),transparent)] mx-auto mb-12"></div>

            <p className="text-sm uppercase tracking-wider text-[var(--tx2)]">
              {testimonial.project}
            </p>

            <blockquote className="text-xl md:text-2xl leading-relaxed italic mb-6">
              "{testimonial.text}"
            </blockquote>

            <h4 className="font-bold text-lg text-[var(--tx3)]">
              — {testimonial.name}
            </h4>
          </div>
        ))}
      </div>


      {/* Call to Action */}
      <div className="text-center">
        <h3 className="text-3xl md:text-4xl font-bold">
          Have something in mind?
        </h3>
        <p className="text-lg mb-6 mx-auto">
          I'd love to hear about your idea and work out the details together
        </p>
        <Link className="cta-button" href='/contact'>
          GET IN TOUCH
        </Link>
      </div>
    </div>
  )
}