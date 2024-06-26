import {NextRequest, NextResponse} from "next/server";
import {patchProjectSchema} from "@/app/validationSchema";
import prisma from "@/prisma/client";
import {Prisma} from ".prisma/client";
import {Knock} from "@knocklabs/node";
import {getServerSession} from "next-auth";
import authOptions from "@/app/auth/authOptions";
import {io, Socket} from "socket.io-client";
import PrismaClientValidationError = Prisma.PrismaClientValidationError;

const socket: Socket = io();

const knock = new Knock(process.env.KNOCK_API_KEY)

export async function PATCH(
  request: NextRequest,
  {params}: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session)
    return NextResponse.json({}, {status: 401})

  try {
    const body = await request.json();

    if (body.budget) {
      body.budget = body.budget.toString();
    }

    const validation = patchProjectSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: `Validation Failed`,
          details: validation.error.errors
        },
        {status: 400}
      );
    }

    const {assignedToUserId} = body;
    if (assignedToUserId) {
      const user = await prisma.user.findUnique({
        where: {id: assignedToUserId}
      })

      if (!user)
        return NextResponse.json({error: "Invalid user."}, {status: 404})

    }
    const projectId = params.id;

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

    const updateData = {
      name: body.name,
      description: body.description,
      frameworks: body.frameworks,
      dueDate: body.dueDate,
      status: body.status,
      priority: body.priority,
      timeline: body.timeline,
      budget: body.budget,
      createdAt: body.createdAt,
      assignedToUserId,
    };


    const updatedProject = await prisma.project.update({
      where: {
        id: projectId
      },
      data: updateData
    });


    if (assignedToUserId) {
      await knock.notify('assign-project', {
        actor: session.user!.id,
        recipients: [assignedToUserId],
        data: {
          project: {
            name: body.name
          }
        }
      })
    }


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
  // const session = await getServerSession(authOptions)
  // if (!session)
  //   return NextResponse.json({}, {status: 401})

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