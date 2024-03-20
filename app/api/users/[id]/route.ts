import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";
import {getServerSession} from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function GET(request: NextRequest, {params}: { params?: { id?: string } }) {
  try {
    if (!params?.id) {
      return NextResponse.json({
        error: "Invalid request: Missing user ID parameter",
      }, {status: 400});
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
    }, {status: 500});
  }
}

export async function DELETE(
    request: NextRequest,
    {params}: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({}, {status: 401});

  if (session.user!.id !== params.id && session.user!.role !== "ADMIN")
    return NextResponse.json("Forbidden!", {status: 403});

  try {
    const user = await prisma.user.findUnique({where: {id: params.id}});

    if (!user)
      return NextResponse.json({error: "Invalid user"}, {status: 404});

    await prisma.user.delete({
      where: {id: user.id}
    });

    return NextResponse.json({}, {status: 200});
  } catch (error) {
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
