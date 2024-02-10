import React from 'react';
import prisma from "@/prisma/client";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import Image from "next/image";
import {Badge} from "@/components/ui/badge";

const TeamsPage = async () => {
  const teams = await prisma.teams.findMany({include: {members: true}})


  return (
      <div className="space-y-3 sm:space-y-5">
        {teams.map((team) => (
            <div key={team.id} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-5">
              <Card>
                <CardHeader>
                  <CardTitle>{team.name}</CardTitle>
                  <CardDescription>{team.description}</CardDescription>
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
            </div>
        ))}

      </div>
  );
};

export default TeamsPage;
