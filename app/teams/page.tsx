import React from 'react';
import prisma from "@/prisma/client";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import Image from "next/image";
import {Badge} from "@/components/ui/badge";
import CreateNewTeam from "@/app/teams/CreateNewTeamDialog";
import TeamForm from "@/app/teams/_components/TeamForm";
import {Button} from "@/components/ui/button";
import {Trash2Icon} from "lucide-react";
import DeleteTeamButton from "@/app/teams/DeleteTeamButton";
import delay from "delay";

const TeamsPage = async () => {
  const teams = await prisma.teams.findMany({include: {members: true}})
  const users = await prisma.user.findMany()

  await delay(2000)
  return (
      <div className="space-y-3 sm:space-y-5">
        <CreateNewTeam/>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-5">
          {teams.map((team) => (
              <Card key={team.id}>
                <CardHeader>
                  <div className="flex justify-between">
                    <div className="">
                      <CardTitle className="">{team.name}</CardTitle>
                      <CardDescription className="mt-2">{team.description}</CardDescription>
                    </div>
                    <div className="flex">
                      <TeamForm
                          users={users}
                          team={team}
                      />
                      <DeleteTeamButton teamId={team.id} />
                    </div>
                  </div>

                </CardHeader>
                <CardContent>
                  <div className="flex gap-3 flex-col">
                    <div className="flex gap-3">
                      <Badge>{team.industry}</Badge>
                      <Badge>{team.rating}</Badge>
                    </div>
                    <div className="flex -space-x-1 overflow-hidden">
                      {team.members.map((member) => (
                          <Popover key={member.id}>
                            <PopoverTrigger>
                              <div className="flex justify-center items-center">
                                <Image
                                    className="flex justify-center w-9 h-9 sm:w-9 sm:h-9 bg-foreground items-center rounded-full ring-4 ring-background"
                                    width={250} height={250} src={member.image!} alt="memeber profile picture"/>
                              </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-2 font-light text-xs">
                              <p>{member.name}</p>
                            </PopoverContent>
                          </Popover>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
          ))}
        </div>
      </div>
  );
};

export const dynamic = 'force-dynamic';
export default TeamsPage;
