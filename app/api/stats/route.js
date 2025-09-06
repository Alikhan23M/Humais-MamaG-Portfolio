import Stats from '@/models/Stats';
import dbConnect from '@/lib/mongodb';

export async function GET() {
  try {
    await dbConnect();
  const stats = await Stats.find();
  return Response.json(stats);
  } catch (error) {
    return Response.json('error occured')
  }
}

export async function POST(request) {
  try {
    await dbConnect();
  const data = await request.json();
  const stats = await Stats.create(data);
  return Response.json(stats);
  } catch (error) {
    console.log(error);
    return Response.json('error occured')
  }
}