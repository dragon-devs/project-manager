import React from 'react';
import prisma from "@/prisma/client";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import moment from "moment";
import authOptions from "@/app/auth/authOptions";
import {getServerSession} from "next-auth";
import DeleteButton from "@/app/users/DeleteButton";
import AssigneeSelectRole from "@/app/users/AssigneeSelectRole";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";


const UsersPage = async () => {
    const session = await getServerSession(authOptions)
    const user = await prisma.user.findUnique({
        where: {
            id: session!.user!.id,
        },
        include: {
            assignedProjects: true
        }
    })

    if (!(user!.role === "ADMIN"))
        return <div className="text-center text-destructive">You are forbidden to access this page.</div>
    const users = await prisma.user.findMany(
        {
            include: {
                assignedProjects: true
            }
        }
    );


    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 sm:gap-5 gap-3">
            {users.map(user => (
                <div key={user.id}>
                    <Card>
                        <CardHeader className="relative">
                            <CardTitle className="truncate sm:w-full w-3/4 capitalize hover:underline">
                                <Link href={`/users/${user.id}`}>{user.name}</Link>
                            </CardTitle>
                            <CardDescription className="truncate sm:w-full w-3/4">{user.email}</CardDescription>
                            <Avatar className="absolute w-12 h-12 top-4 right-5">
                                <AvatarImage src={user.image!}/>
                                <AvatarFallback>{user.name!.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                        </CardHeader>
                        <CardContent className="flex justify-between flex-row-reverse">
                            <div className="flex gap-2">
                                <AssigneeSelectRole id={user.id} role={user.role!}/>
                                <DeleteButton id={user.id}/>
                            </div>
                            <div className="flex flex-col text-[10px]">
                                <p className="sm:text-sm text-muted-foreground">Assigned Projects
                                    <span
                                        className="ml-1.5 font-bold text-primary">{user.assignedProjects.length}</span>
                                </p>
                                <p className="sm:text-sm text-muted-foreground ">Registered
                                    <span
                                        className="ml-1.5 font-bold text-primary">{formatTimeAgo(user.createdAt)}</span>
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </div>
    );
};

const formatTimeAgo = (timestamp: Date) => {
    return moment(timestamp).fromNow();
};
export default UsersPage;
