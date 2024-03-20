import React from 'react';
import {getServerSession} from "next-auth";
import authOptions from "@/app/auth/authOptions";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ChevronRightIcon} from "@radix-ui/react-icons";
import ProjectCard from "@/app/components/ProjectCard";
import prisma from "@/prisma/client";
import Link from "next/link";
import Roles from "@/app/components/Roles";


const MyProfile = async () => {
  const session = await getServerSession(authOptions)
  const user = await prisma.user.findUnique({
    where: {
      id: session!.user!.id
    },
    include: {
      assignedProjects: true,
      accounts: true,
    }
  })
  if (!user)
    return console.log("Unable to fetch users.")

  return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5 ">
        <div className="flex flex-col gap-3 sm:gap-5">
          <Card>
            <CardHeader
                className="dark:bg-accent bg-accent flex sm:flex-row flex-col-reverse
                justify-between sm:items-center  rounded-md rounded-b-none">
              <div className="flex flex-col gap-2">
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
                <Roles className="bg-background" role={user.role!}/>
              </div>
              <div className="sm:pb-0 pb-5 sm:pl-3">
                <Avatar className="w-20 h-20 border">
                  <AvatarImage src={user.image!}/>
                  <AvatarFallback className="bg-slate-200 text-slate-800">DP</AvatarFallback>
                </Avatar>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mt-3">
                <div>
                  {user.accounts.map(acc => (
                      <div className="flex" key={acc.id}>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-muted-foreground">Account Logged by</p>
                          <ChevronRightIcon/>
                          <div className="capitalize">{acc.provider}</div>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          {user.role === "ADMIN" && (
              <Card>
                <CardHeader>
                  <CardTitle>Admin Control Panel</CardTitle>
                  <CardDescription>Reserved for administrators only, providing full control.</CardDescription>
                </CardHeader>
                <CardContent className="">
                  <div className="font-bold">
                    <Link href="/users">All Users Details</Link>
                  </div>
                </CardContent>
              </Card>
          )}

        </div>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>My Projects</CardTitle>
            <CardDescription>Here are all the projects assigned to you.</CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-5">
            <div className="flex flex-col gap-3 sm:gap-5">
              {!user.assignedProjects || user.assignedProjects.length === 0 && (
                  <div className="flex  self-center pb-5">Currently there are no projects assigned to you.</div>
              )}
              {user.assignedProjects.map(project => (
                  <ProjectCard key={project.id} project={project}/>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>


  );
};

export default MyProfile;
