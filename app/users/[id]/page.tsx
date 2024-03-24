import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ChevronRightIcon} from "@radix-ui/react-icons";
import prisma from "@/prisma/client";
import Link from "next/link";
import authOptions from "@/app/auth/authOptions";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import Roles from "@/app/components/Roles";

interface Props {
    params: { id: string }
}

const UserProfile = async ({params}: Props) => {
    const session = await getServerSession(authOptions)
    const user = await prisma.user.findUnique({
        where: {
            id: params.id
        },
        include: {
            assignedProjects: true,
            accounts: true,
            comments: true,
            likes: true,
        }
    })
    if (session && user!.id === session!.user!.id)
        return redirect("/users/me")
    if (!user)
        return console.log("Unable to fetch users.")

    return (
        <div className="space-y-3 sm:space-y-5">
            <Card>
                <CardHeader
                    className="dark:bg-accent bg-accent flex sm:flex-row flex-col-reverse
                justify-between sm:items-center  rounded-md rounded-b-none">
                    <div className="flex flex-col gap-2">
                        <CardTitle>{user.name}</CardTitle>
                        <CardDescription>{user.email}</CardDescription>
                        <Roles role={user.role!} className="bg-background"/>
                    </div>
                    <div className="sm:pb-0 pb-5 sm:pl-3">
                        <Avatar className="w-20 h-20 border">
                            <AvatarImage src={user.image!}/>
                            <AvatarFallback className="bg-slate-200 text-slate-800">DP</AvatarFallback>
                        </Avatar>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="sm:flex justify-between items-center mt-3">
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
                        <div>
                            <div className="flex items-center gap-2">
                                <p className="text-sm text-muted-foreground">Total Comments</p>
                                <ChevronRightIcon/>
                                <div className="capitalize font-medium">{user.comments.length}</div>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <p className="text-sm text-muted-foreground">Total Likes</p>
                                <ChevronRightIcon/>
                                <div className="capitalize font-medium">{user.likes.length}</div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle>Projects</CardTitle>
                    <CardDescription>Projects list assign to this user.</CardDescription>
                </CardHeader>
                <CardContent className="p-0 pb-5">
                    <div className="flex flex-col  gap-3 ">
                        {!user.assignedProjects || user.assignedProjects.length === 0 && (
                            <div className="flex  self-center pb-3">Currently there are no projects.</div>
                        )}
                        {user.assignedProjects.map(project => (
                            <div key={project.id} className="pt-3 border-t">
                                <Link href={`/projects/${project.id}`}>
                                    <div className="hover:underline mx-6">
                                        {project.name}
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>

    );
};

export default UserProfile;