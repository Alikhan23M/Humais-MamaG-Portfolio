import Message from "../../../../models/Message";
import dbConnect from "../../../../lib/mongodb";

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    await Message.findByIdAndDelete(params.id);

    return Response.json({ message: "Message deleted" });
  } catch (error) {
    return Response.json({ message: "Error deleting message" }, { status: 500 });
  }
}
export async function GET(request, { params }) {
  try {
    await dbConnect();
    const message = await Message.findById(params.id);

    return Response.json(message);
  } catch (error) {
    return Response.json({ message: "Error fetching message" }, { status: 500 });
  }

}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const data = await request.json();
    const message = await Message.findOneAndUpdate({ _id: params.id }, data, { new: true });

    return Response.json(message);
  } catch (error) {
    return Response.json({ message: "Error updating message" }, { status: 500 });
  }
}
