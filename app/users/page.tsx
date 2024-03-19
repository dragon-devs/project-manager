import React from 'react';
import prisma from "@/prisma/client";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import moment from "moment";

const UsersPage = async () => {
    const users = await prisma.user.findMany(
        {
            include: {
                assignedProjects: true
            }
        }
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map(user => (
                <div key={user.id}>
                    <Card>
                        <CardHeader>
                            <CardTitle className="capitalize hover:underline">
                                <Link href={`/users/${user.id}`}>{user.name}</Link>
                            </CardTitle>
                            <CardDescription>{user.email}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <p className="text-sm text-muted-foreground">Registered on
                                    <span className="ml-2 font-bold text-primary">{formatTimeAgo(user.createdAt)}</span>
                                </p>
                                <p className="text-sm text-muted-foreground">Assigned Projects
                                    <span className="ml-2 font-bold text-primary">{user.assignedProjects.length}</span>
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
