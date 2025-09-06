import dbConnect from '../../../lib/mongodb'
import Testimonial from '../../../models/Testimonial'

export async function GET() {
  try {
    await dbConnect()
    const testimonials = await Testimonial.find({ isActive: true }).sort({ order: 1, createdAt: -1 })
    
    // Create default testimonials if none exist
    if (testimonials.length === 0) {
      const defaultTestimonials = [
        {
          name: 'Sarah Johnson',
          position: 'Marketing Director',
          company: 'TechCorp',
          content: 'Exceptional content writer who consistently delivers high-quality work. Our blog traffic increased by 300% since working together.',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b789?w=100&h=100&fit=crop&crop=face',
          rating: 5
        },
        {
          name: 'Michael Chen',
          position: 'CEO',
          company: 'StartupX',
          content: 'Professional, reliable, and creative. The content strategy developed helped us secure our Series A funding.',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
          rating: 5
        },
        {
          name: 'Emily Davis',
          position: 'Brand Manager',
          company: 'Fashion Forward',
          content: 'Amazing ability to capture our brand voice and create content that resonates with our audience.',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
          rating: 5
        }
      ]
      
      await Testimonial.insertMany(defaultTestimonials)
      return Response.json(defaultTestimonials)
    }
    
    return Response.json(testimonials)
  } catch (error) {
    return Response.json({ message: 'Error fetching testimonials' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    await dbConnect()
    
    const data = await request.json()
    const testimonial = await Testimonial.create(data)
    
    return Response.json(testimonial)
  } catch (error) {
    return Response.json({ message: 'Error creating testimonial' }, { status: 500 })
  }
}