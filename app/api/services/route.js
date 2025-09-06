import dbConnect from '../../../lib/mongodb'
import Service from '../../../models/Service'

export async function GET() {
  try {
    await dbConnect()
    const services = await Service.find({ isActive: true }).sort({ order: 1, createdAt: -1 })
    
    // Create default services if none exist
    if (services.length === 0) {
      const defaultServices = [
        {
          title: 'Blog Writing',
          description: 'Engaging blog posts that drive traffic and establish your expertise',
          icon: 'PenTool',
          features: ['SEO Optimized', 'Research-based', 'Engaging storytelling', 'Call-to-action focused']
        },
        {
          title: 'Content Strategy',
          description: 'Comprehensive content strategies to achieve your marketing goals',
          icon: 'TrendingUp',
          features: ['Content planning', 'Audience analysis', 'Performance tracking', 'Brand voice development']
        },
        {
          title: 'Social Media Content',
          description: 'Compelling social media posts that increase engagement and followers',
          icon: 'Smartphone',
          features: ['Platform-specific content', 'Visual storytelling', 'Hashtag strategy', 'Community engagement']
        }
      ]
      
      await Service.insertMany(defaultServices)
      return Response.json(defaultServices)
    }
    
    return Response.json(services)
  } catch (error) {
    return Response.json({ message: 'Error fetching services' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    await dbConnect()
    
    const data = await request.json()
    const service = await Service.create(data)
    
    return Response.json(service)
  } catch (error) {
    return Response.json({ message: 'Error creating service' }, { status: 500 })
  }
}
