import Strategy from "@/models/Strategy";
import dbConnect from "@/lib/mongodb";

export async function GET() {
    try {
        await dbConnect();
        const Strategies =await  Strategy.find();
        return Response.json(Strategies);

    } catch (error) {
        return Response.json(error);
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const data = await request.json();
        const strategy = await Strategy.create(data);
        return Response.json(strategy);
    } catch (error) {
        return Response.json('Error creating Strategy');
    }
}