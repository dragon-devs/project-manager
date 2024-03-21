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

        const {content, projectId} = body
        const userId = session.user.id;
        try {
            const comment = await prisma.comment.create({
                data: {
                    content,
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
