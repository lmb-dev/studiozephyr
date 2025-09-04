export const runtime = 'edge';
import { getRequestContext } from "@cloudflare/next-on-pages";
import Link from 'next/link'


export default async function Testimonials() {
  const KV = getRequestContext().env.KV;
  const data = await KV.get("CONTENT_MAP");
  const settings: Settings = data ? JSON.parse(data) : {};
  const testimonials = settings.testimonials;

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
        {testimonials.map((testimonial, index) => (
          <div key={index} className="text-center mb-12">

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