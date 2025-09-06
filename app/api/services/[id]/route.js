import Service from "../../../../models/Service"
import dbConnect from "../../../../lib/mongodb"
export async function DELETE(request, { params }) {
  try {
    await dbConnect()
    await Service.findByIdAndDelete(params.id)
    
    return Response.json({ message: 'Service deleted' })
  } catch (error) {
    return Response.json({ message: 'Error deleting service' }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect()
    
    const data = await request.json()
    const service = await Service.findOneAndUpdate({ _id: params.id }, data, { new: true })
    
    return Response.json(service)
  } catch (error) {
    return Response.json({ message: 'Error updating service' }, { status: 500 })
  }
}

export async function GET(request, { params }) {
  try {
    await dbConnect()
    const service = await Service.findById(params.id)
    
    return Response.json(service)
  } catch (error) {
    return Response.json({ message: 'Error fetching service' }, { status: 500 })
  }
}