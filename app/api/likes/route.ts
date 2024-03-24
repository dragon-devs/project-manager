import {NextRequest, NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({message: 'Unauthorized'}, {status: 403});
        }

        const body = await request.json();
        const {commentId, replyId} = body;
        const userId = session.user.id;

        let like;
        if (replyId) {
            // @ts-ignore
            like = await prisma.like.create({
                data: {
                    userId,
                    replyId,
                },
            });
        } else {
            // @ts-ignore
            like = await prisma.like.create({
                data: {
                    userId,
                    commentId
                },
            });
        }

        return NextResponse.json(like, {status: 201});
    } catch (error) {
        console.error('Error in POST /api/likes:', error);
        return NextResponse.json({message: 'Internal Server Error'}, {status: 500});
    }
}

export async function DELETE(
    request: NextRequest,
) {
    const session = await getServerSession(authOptions)
    if (!session)
        return NextResponse.json("Unauthorized", {status: 401})

    const body = await request.json();
    const {commentId, replyId} = body;

    const userId = session!.user!.id;

    let like;
    if (replyId) {
        // @ts-ignore
        like = await prisma.like.findFirst({
            where: {
                userId: userId,
                replyId: replyId,
            },
        });
    } else {
        // @ts-ignore
        like = await prisma.like.findUnique({
            where: {
                commentId_userId: {
                    userId,
                    commentId
                }
            },
        });
    }

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
