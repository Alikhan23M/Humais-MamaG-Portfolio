import Details from '@/models/Details';
import dbConnect from '@/lib/mongodb';
// GET /api/detail-about
export async function GET() {
    try {
        await dbConnect();
        const about = await Details.find();
        return Response.json(about);
    } catch (error) {
        return Response.json({ message: 'Error fetching detailed about' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        
        const data = await request.json();
        const about = await Details.findOne();
        if(!about){
            const newAbout = new Details(data);
            await newAbout.save();
            return Response.json(newAbout);
        } else {
            await Details.findOneAndUpdate({}, data, { new: true });
            return Response.json('About updated successfully')
        }
        
    } catch (error) {
        return Response.json({ message: 'Error creating detailed about' }, { status: 500 });
    }
}