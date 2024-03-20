import React from 'react';
import prisma from "@/prisma/client";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import moment from "moment";
import authOptions from "@/app/auth/authOptions";
import {getServerSession} from "next-auth";
import DeleteButton from "@/app/users/DeleteButton";
import AssigneeSelectRole from "@/app/users/AssigneeSelectRole";


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
                        <CardHeader>
                            <CardTitle className="capitalize hover:underline">
                                <Link href={`/users/${user.id}`}>{user.name}</Link>
                            </CardTitle>
                            <CardDescription>
                                {user.email}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-between flex-row-reverse">
                            <div className="flex gap-3">
                                <AssigneeSelectRole id={user.id} role={user.role!}/>
                                <DeleteButton id={user.id}/>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Assigned Projects
                                    <span className="ml-2 font-bold text-primary">{user.assignedProjects.length}</span>
                                </p>
                                <p className="text-sm text-muted-foreground ">Registered
                                    <span className="ml-2 font-bold text-primary">{formatTimeAgo(user.createdAt)}</span>
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
