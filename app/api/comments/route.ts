// pages/api/comments.ts
import prisma from "@/prisma/client";
import {NextRequest, NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function POST(request: NextRequest) {
    {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({message: 'Unauthorized'}, {status: 403});
        }

        const body = await request.json();

        const {content, status, projectId} = body
        const userId = session.user.id;
        try {
            const comment = await prisma.comment.create({
                data: {
                    content,
                    status,
                    project: {
                        connect: {id: projectId},
                    },
                    user: {
                        connect: {id: userId},
                    },
                },
            })
            return NextResponse.json(comment, {status: 201})
        } catch (error) {
            return NextResponse.json({message: 'Something went wrong'}, {status: 400})
        }
    }
}

export async function DELETE(
    request: NextRequest,
) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json("Unauthorized", {status: 401});

    const body = await request.json();
    const {commentId} = body;

    try {
        // Find all likes associated with the comment
        const likes = await prisma.like.findMany({
            where: {
                commentId: commentId,
            },
        });

        // Delete each like associated with the comment
        for (const like of likes) {
            await prisma.like.delete({
                where: {
                    id: like.id,
                },
            });
        }

        // Delete the comment
        await prisma.comment.delete({
            where: {
                id: commentId,
            },
        });

        return NextResponse.json({}, {status: 200});
    } catch (error) {
        console.error("Error occurred while deleting comment and likes:", error);
        return NextResponse.json({error: "Failed to delete comment and associated likes"}, {status: 500});
    }
}
