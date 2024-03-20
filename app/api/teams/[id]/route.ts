import {NextRequest, NextResponse} from "next/server";
import {patchTeamsSchema} from "@/app/validationSchema";
import prisma from "@/prisma/client";

export async function PATCH(
    request: NextRequest,
    {params}: { params: { id: string } }
) {
    try {
        const body = await request.json();

        const validation = patchTeamsSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                {
                    error: `Validation Failed`,
                    details: validation.error.errors
                },
                {status: 400}
            );
        }

        const teamId = params.id;

        const existingTeam = await prisma.teams.findUnique({
            where: {
                id: teamId
            },
            include: {
                members: true // Include the members relation
            }
        });

        if (!existingTeam) {
            return NextResponse.json(
                {
                    error: `Team not found`,
                    details: `Team with ID ${teamId} does not exist`
                },
                {status: 404}
            );
        }

        const currentMembers = existingTeam.members.map(member => member.id);
        const newMembers = body.members || [];

        // Find members to remove
        const membersToRemove = currentMembers.filter((memberId: string) => !newMembers.includes(memberId));

        // Find members to add
        const membersToAdd = newMembers.filter((memberId: string) => !currentMembers.includes(memberId));

        const updateData = {
            name: body.name,
            description: body.description,
            members: {
                disconnect: membersToRemove.map(memberId => ({id: memberId})), // Disconnect the members to be removed
                connect: membersToAdd.map((memberId: string) => ({id: memberId})) // Connect the new members
            },
            industry: body.industry,
            rating: body.rating
        };

        const updatedTeam = await prisma.teams.update({
            where: {
                id: teamId
            },
            data: updateData,
            include: {
                members: true // Include the updated members
            }
        });

        return NextResponse.json(updatedTeam, {status: 200});
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

export async function DELETE(
    request: NextRequest,
    {params}: { params: { id: string } }
) {
    // const session = await getServerSession(authOptions);
    // if (!session)
    //   return NextResponse.json({}, { status: 401 });

    try {
        const team = await prisma.teams.findUnique({where: {id: params.id}});

        if (!team)
            return NextResponse.json({error: "Invalid team"}, {status: 404});

        await prisma.teams.delete({
            where: {id: team.id}
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
