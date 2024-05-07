import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";
import {teamsSchema} from "@/app/validationSchema";
import {Knock} from "@knocklabs/node";
import authOptions from "@/app/auth/authOptions";
import {getServerSession} from "next-auth";
import {notifyTeamAddition} from "@/app/api/teams/extra";

const knock = new Knock(process.env.KNOCK_API_KEY)


export async function GET(request: NextRequest) {
  const teams = await prisma.teams.findMany({
    include: {
      members: true,
    }
  })
  return NextResponse.json(teams, {status: 200});
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session)
    return NextResponse.json({}, {status: 401})

  const body = await request.json();
  const validation = teamsSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      {
        error: `Validation Failed`,
        details: validation.error.errors
      },
      {status: 400}
    );

  let members; // Initialize members variable

  if (body.members) {
    members = body.members.map((memberId: string) => ({ id: memberId }));
  }
  
  // noinspection TypeScriptValidateJSTypes
  const newTeam = await prisma.teams.create({
    data: {
      name: body.name,
      description: body.description,
      // Only include members if they are provided
      ...(members && {members: {connect: members}}),
      industry: body.industry,
      rating: body.rating
    }
  });

  await notifyTeamAddition(session.user!.id, body.members, body.name);

  return NextResponse.json(newTeam, {status: 201});
}