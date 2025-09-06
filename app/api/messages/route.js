import Message from "../../../models/Message";
import dbConnect from "../../../lib/mongodb";



export async function GET(req, res) {
  try {
    await dbConnect();
    const messages = await Message.find();
    return Response.json(messages, { status: 200 });
  } catch (error) {
    
   return Response.json({ error: "Internal Server Error" }, { status: 500 });
   
  }
}

export async function POST(req, res) {
  try {
    await dbConnect();
    const { name, email, subject, message } = await req.json();
    console.log(name, email, subject, message);
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();
    return Response.json(newMessage, { status: 201 });
  } catch (error) {
    console.error("Error creating message:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
