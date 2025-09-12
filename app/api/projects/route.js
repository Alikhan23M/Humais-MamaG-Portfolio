import dbConnect from '../../../lib/mongodb'
import Project from '../../../models/Project'

export async function GET() {
  try {
    await dbConnect()
    const projects = await Project.find().sort({ order: 1, createdAt: -1 })
    
    // Create default projects if none exist
    if (projects.length === 0) {
      const defaultProjects = [
        {
          title: 'E-commerce Blog Strategy',
          description: 'Developed comprehensive blog strategy for fashion e-commerce brand, resulting in 300% increase in organic traffic',
          category: 'Content Strategy',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
          tags: ['Content Strategy', 'SEO', 'E-commerce'],
          isFeatured: true
        },
        {
          title: 'Tech Startup Content',
          description: 'Created engaging technical content for SaaS platform, improving user engagement by 150%',
          category: 'Technical Writing',
          image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop',
          tags: ['Technical Writing', 'SaaS', 'User Engagement']
        },
        {
          title: 'Social Media Campaign',
          description: 'Managed social media content for health & wellness brand across multiple platforms',
          category: 'Social Media',
          image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
          tags: ['Social Media', 'Health & Wellness', 'Brand Management']
        }
      ]
      
      await Project.insertMany(defaultProjects)
      return Response.json(defaultProjects)
    }
    
    return Response.json(projects)
  } catch (error) {
    return Response.json({ message: 'Error fetching projects' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    await dbConnect()
    
    const data = await request.json()
    const project = await Project.create(data)
    
    return Response.json(project)
  } catch (error) {
    return Response.json({ message: 'Error creating project' }, { status: 500 })
  }
}