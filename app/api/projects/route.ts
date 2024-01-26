import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";
import {z} from "zod";

export const projectSchema = z.object({
  name: z.string().min(1, 'Project Name is required.').max(255),
  description: z.string().min(1, 'Project Description is required.').max(255),
})

export async function GET(request: NextRequest) {
  const projects = await prisma.project.findMany();
  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = projectSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
        {error: "Validation Failed",
          details: validation.error.errors},
        {status: 400}
    );

  // noinspection TypeScriptValidateJSTypes
  const newProject = await prisma.project.create({
    data: {name: body.name, description: body.description}
  });

  return NextResponse.json(newProject, {status: 201})

}