import Strategy from "@/models/Strategy";
import dbConnect from "@/lib/mongodb";

export async function PUT(request,{params}) {
    try {
        await dbConnect();
        const {id}=params
        const data = await request.json();
        const strategy = await Strategy.findOneAndUpdate({ _id: id }, data, { new: true });
        return Response.json(strategy);

    } catch (error) {
        return Response.json('Error Updating Strategy');
    }
}


export async function DELETE(request, {params}) {
    try {
        await dbConnect();
        const {id} =  params;
        const strategy = await Strategy.findByIdAndDelete(id);
        console.log(strategy)
        return Response.json('Deleted Successfully')
    } catch (error) {
        console.log(error)
        return Response.json('Error Deleting the Strategy');
    }
}