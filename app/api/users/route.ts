import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany({orderBy: {name: 'asc'}, include: {accounts: true, assignedProjects: true}});
  return NextResponse.json(users);
}