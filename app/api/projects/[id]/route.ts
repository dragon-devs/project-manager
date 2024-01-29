import {NextRequest, NextResponse} from "next/server";
import {projectSchema} from "@/app/validationSchema";
import prisma from "@/prisma/client";
import {Prisma} from ".prisma/client";
import PrismaClientValidationError = Prisma.PrismaClientValidationError;
import {Frameworks, Priority, Status} from "@prisma/client";

export async function PATCH(
    request: NextRequest,
    {params}: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const validation = projectSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
          {
            error: `Validation Failed`,
            details: validation.error.errors
          },
          {status: 400}
      );
    }

    const projectId = params.id; // Assuming you have the project ID in the route

    // Check if the project with the given ID exists
    const existingProject = await prisma.project.findUnique({
      where: {
        id: projectId
      }
    });

    if (!existingProject) {
      return NextResponse.json(
          {
            error: `Project not found`,
            details: `Project with ID ${projectId} does not exist`
          },
          {status: 404}
      );
    }

    // Only include non-null and non-undefined properties from the body
    const updateData = {
      name: body.name,
      description: body.description,
      frameworks: body.frameworks,
      dueDate: body.dueDate,
      status: body.status,
      priority: body.priority,
      timeline: body.timeline,
      budget: body.budget,
      owner: body.owner
    };



    const updatedProject = await prisma.project.update({
      where: {
        id: projectId
      },
      data: updateData
    });

    return NextResponse.json(updatedProject, {status: 200});
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      return NextResponse.json(
          {
            error: `Validation Failed`,
            details: error.message
          },
          {status: 400}
      );
    }

    // Handle other errors
    console.error(error);
    return NextResponse.json(
        {
          error: `Internal Server Error`,
          details: `An unexpected error occurred`
        },
        {status: 500}
    );
  }
}

export async function DELETE(
    request: NextRequest,
    {params}: { params: { id: string } }) {

  const project = await prisma.project.findUnique({
    where: {id: params.id}
  });

  if (!project)
    return NextResponse.json({error: "Invalid project"}, {status: 404});

  await prisma.project.delete({
    where: {id: project.id}
  });

  return NextResponse.json({})
}