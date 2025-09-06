import Stats from "@/models/Stats";
import dbConnect from "@/lib/mongodb";

export async function DELETE(request, { params }) {
  await dbConnect();
  const { id } = params;
  const stats = await Stats.findByIdAndDelete(id);
  return Response.json(stats);
}
export async function PUT(request, { params }) {
  await dbConnect();
  const { id } = params;
  const data = await request.json();
  const stats = await Stats.findOneAndUpdate({ _id: id }, data, { new: true });
  return Response.json(stats);
}

export async function GET(request, { params }) {
  await dbConnect();
  const { id } = params;
  const stats = await Stats.findById(id);
  return Response.json(stats);
}