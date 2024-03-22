import {NextRequest, NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
    {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({message: 'Unauthorized'}, {status: 403});
        }

        const body = await request.json();

        const {commentId} = body
        const userId = session!.user!.id;
        try {
            const like = await prisma.like.create({
                data: {
                    comment: {
                        connect: {id: commentId},
                    },
                    user: {
                        connect: {id: userId},
                    },
                },
            })

            return NextResponse.json(like, {status: 201})
        } catch (error) {
            return NextResponse.json({message: 'Something went wrong'}, {status: 400})
        }
    }
}

export async function DELETE(
    request: NextRequest,
) {
    const session = await getServerSession(authOptions)
    if (!session)
        return NextResponse.json("Unauthorized", {status: 401})

    const body = await request.json();
    const {commentId} = body;

    const userId = session!.user!.id;

    const like = await prisma.like.findUnique({
        where: {
            commentId_userId: {
                commentId,
                userId
            }
        },
    });

    if (!like)
        return NextResponse.json({error: "Like not found"}, {status: 404});

    try {
        await prisma.like.delete({
            where: {
                id: like.id
            }
        });

        return NextResponse.json({}, {status: 200});
    } catch (error) {
        console.error("Error occurred while deleting like:", error);
        return NextResponse.json({error: "Unable to unlike this comment"}, {status: 500});
    }
}
