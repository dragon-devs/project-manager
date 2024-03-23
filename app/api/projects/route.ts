import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";
import {projectSchema} from "@/app/validationSchema";
import {getServerSession} from "next-auth";
import authOptions from "@/app/auth/authOptions";


export async function GET(request: NextRequest) {
  const projects = await prisma.project.findMany();
  return NextResponse.json(projects, {status: 200});
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session)
    return NextResponse.json("Unauthorized", {status: 401})

  const body = await request.json();

  if (body.budget) {
    body.budget = body.budget.toString();
  }

  const validation = projectSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
        {
          error: `Validation Failed`,
          details: validation.error.errors
        },
        {status: 400}
    );

  const existingProject = await prisma.project.findUnique({
    where: {name: body.name}
  });
  if (existingProject) {
    return NextResponse.json(
        {
          error: `Project with the name '${body.name}' already exists.`,
        },
        {status: 400}
    );
  }

  // noinspection TypeScriptValidateJSTypes
  const newProject = await prisma.project.create({
    data: {
      name: body.name,
      description: body.description,
      frameworks: body.frameworks,
      dueDate: body.dueDate,
      status: body.status,
      priority: body.priority,
      timeline: body.timeline,
      budget: body.budget,
      createdAt: body.createdAt,
    }
  });

  return NextResponse.json(newProject, {status: 201})

}