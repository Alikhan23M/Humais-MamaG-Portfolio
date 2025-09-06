import About from '@/models/About'
import dbConnect from '@/lib/mongodb'

export async function GET() {
  try {
    await dbConnect()
    let about = await About.findOne()

    // Create default about if none exists
    if (!about) {
      about = await About.create({
        title: 'About Me',
        description: 'I am a passionate content writer with over 5 years of experience in crafting engaging and SEO-friendly content. My expertise spans various industries including technology, healthcare, finance, and lifestyle. I specialize in blog posts, articles, website content, and social media copy that drives traffic and boosts brand visibility.',
        image: null, // Placeholder image URL
      })
    }

    return Response.json(about)
  } catch (error) {
    return Response.json({ message: 'Error fetching about' }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    await dbConnect()

    const data = await request.json()
    let about = await About.findOne()

    if (!about) {
        about = await About.create(data)
      } else {
        about = await About.findOneAndUpdate({}, data, { new: true })
      }
      
      return Response.json(about)
    } catch (error) {
        console.log(error)
      return Response.json({ message: 'Error updating about' }, { status: 500 })
    }
    }