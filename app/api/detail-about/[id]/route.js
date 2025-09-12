import Details from '@/models/Details';
import dbConnect from '@/lib/mongodb';

// GET /api/detail-about/[id]
export async function GET(request, { params }) {
    try {
        await dbConnect();
        const detailedAbout = await Details.findById(params.id);
        return Response.json(detailedAbout);
    } catch (error) {
        return Response.json({ message: 'Error fetching detailed about' }, { status: 500 });
    }
}

// update /api/detail-about/[id]
export async function PUT(request, { params }) {
    try {
        await dbConnect();
        const data = await request.json();
        const detailedAbout = await Details.findOneAndUpdate({ _id: params.id }, data, { new: true });
        return Response.json(detailedAbout);
    } catch (error) {
        return Response.json({ message: 'Error updating detailed about' }, { status: 500 });
    }
}

// delete /api/detail-about/[id]
export async function DELETE(request, { params }) {
    try {
        await dbConnect();
        await Details.findByIdAndDelete(params.id);
        return Response.json({ message: 'Detailed about deleted successfully' });
    } catch (error) {
        return Response.json({ message: 'Error deleting detailed about' }, { status: 500 });
    }
}