import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";
import {getServerSession} from "next-auth";
import authOptions from "@/app/auth/authOptions";
import {Prisma} from ".prisma/client";
import PrismaClientValidationError = Prisma.PrismaClientValidationError;

export async function GET(request: NextRequest, {params}: { params?: { id?: string } }) {
  const session = await getServerSession(authOptions)
  if (!session)
    return NextResponse.json("Unauthorized", {status: 401})
  try {
    if (!params?.id) {
      return NextResponse.json({
        error: "Invalid request: Missing user ID parameter",
      }, {status: 400});
    }

    const user = await prisma.user.findUnique({
      where: {id: params.id},
      include: {accounts: true, assignedProjects: true}
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


export async function PATCH(
    request: NextRequest,
    {params}: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session)
    return NextResponse.json({}, {status: 401})

  if (session.user!.id !== params.id && session.user!.role !== "ADMIN")
    return NextResponse.json("Forbidden!", {status: 403});

  try {
    const body = await request.json();


    if (!body) {
      return NextResponse.json(
          {
            error: `Validation Failed`,
          },
          {status: 400}
      );
    }

    if (body.role) {
      const user = await prisma.user.findUnique({
        where: {
          id: params.id,
        }
      })

      if (!user)
        return NextResponse.json({error: "Invalid user."}, {status: 404})
    }

    // @ts-ignore
    const updatedProject = await prisma.user.update({
      where: {
        id: params.id,
      },
      data: {
        role: body.role
      }
    });

    // if (params.id) {
    //   await knock.notify('assign-project', {
    //     actor: session.user!.id,
    //     recipients: [assignedToUserId],
    //     data: {
    //       project: {
    //         name: body.name
    //       }
    //     }
    //   })
    // }

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
    {params}: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({}, {status: 401});

  if (session.user!.id !== params.id && session.user!.role !== "ADMIN")
    return NextResponse.json("Forbidden!", {status: 403});

  try {
    const user = await prisma.user.findUnique({
      where: {id: params.id},
      include: {Comment: true}
    });

    if (!user)
      return NextResponse.json({error: "Invalid user"}, {status: 404});

    await Promise.all(user.Comment.map(async (comment) => {
      await prisma.like.deleteMany({
        where: {commentId: comment.id}
      });
    }));

    await prisma.comment.deleteMany({
      where: {userId: user.id}
    });

    await prisma.like.deleteMany({
      where: {userId: user.id}
    });

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
