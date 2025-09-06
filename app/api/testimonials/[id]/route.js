import Testimonial from "../../../../models/Testimonial"
import dbConnect from "../../../../lib/mongodb"
export async function DELETE(request, { params }) {
  try {
    await dbConnect()
    await Testimonial.findByIdAndDelete(params.id)
    return Response.json({ message: 'Testimonial deleted' })
  } catch (error) {
    return Response.json({ message: 'Error deleting testimonial' }, { status: 500 })

  }
}
export async function PUT(request, { params }) {
  try {
    await dbConnect()
    const data = await request.json()
    const testimonial = await Testimonial.findOneAndUpdate({ _id: params.id }, data, { new: true })
    return Response.json(testimonial)
  } catch (error) {
    return Response.json({ message: 'Error updating testimonial' }, { status: 500 })
  }
}