import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";
import {getServerSession} from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session)
        return NextResponse.json("Unauthorized", {status: 401})

    const users = await prisma.user.findMany({
        orderBy: {name: 'asc'},
        include: {accounts: true, assignedProjects: true}
    });
    return NextResponse.json(users);
}