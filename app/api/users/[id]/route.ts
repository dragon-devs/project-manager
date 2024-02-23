import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest, { params }: { params?: { id?: string } }) {
  try {
    if (!params?.id) {
      return NextResponse.json({
        error: "Invalid request: Missing user ID parameter",
      }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: params.id },
      include: { accounts: true, assignedProjects: true }
    });

    if (!user) {
      return NextResponse.json({
        error: `User not found`,
      }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({
      error: "Internal server error.",
    }, { status: 500 });
  }
}
