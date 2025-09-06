import dbConnect from "../../../../lib/mongodb";
import Project from "../../../../models/Project";

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    await Project.findByIdAndDelete(params.id);

    return Response.json({ message: "Project deleted" });
  } catch (error) {
    return Response.json({ message: "Error deleting project" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();

    const data = await request.json();
    const project = await Project.findOneAndUpdate({ _id: params.id }, data, { new: true });

    return Response.json(project);
  } catch (error) {
    return Response.json({ message: "Error updating project" }, { status: 500 });
  }
}

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const project = await Project.findById(params.id);

    return Response.json(project);
  } catch (error) {
    return Response.json({ message: "Error fetching project" }, { status: 500 });
  }
}
