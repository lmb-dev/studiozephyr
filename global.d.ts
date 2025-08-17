interface Testimonial {
  name: string
  text: string
  project: string
}

interface Artwork {
  name: string
  collection: string
  category: string
  imageURL: string
}

interface Settings {
  categories: Record<string, string[]>
  art: Artwork[]
  testimonials: Testimonial[]
}