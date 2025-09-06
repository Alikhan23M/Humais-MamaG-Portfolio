import dbConnect from '../../../lib/mongodb'
import Profile from '../../../models/Profile'

export async function GET() {
  try {
    await dbConnect()
    
    let profile = await Profile.findOne()
    
    // Create default profile if none exists
    if (!profile) {
      profile = await Profile.create({
        name: 'Your Name',
        title: 'Content Writer & Digital Strategist',
        bio: 'Passionate content writer with 5+ years of experience creating engaging content that drives results.',
        email: 'hello@yourname.com'
      })
    }
    
    return Response.json(profile)
  } catch (error) {
    return Response.json({ message: 'Error fetching profile' }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    await dbConnect()
    
    const data = await request.json()
    let profile = await Profile.findOne()
    
    if (!profile) {
      profile = await Profile.create(data)
    } else {
      profile = await Profile.findOneAndUpdate({}, data, { new: true })
    }
    
    return Response.json(profile)
  } catch (error) {
    return Response.json({ message: 'Error updating profile' }, { status: 500 })
  }
}