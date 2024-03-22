import React from 'react';
import prisma from "@/prisma/client";
import {notFound} from "next/navigation";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import ProjectDetailsActions from "@/app/projects/[id]/ProjectDetailsActions";
import Statues from "@/app/components/Status";
import {FrameworkDetailsList} from "@/app/projects/_components/FrameworkList";
import {PrioritiesText} from "@/app/components/PrioritySignals";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import moment from "moment/moment";
import Comments from "@/app/projects/_components/Comments";

interface Props {
    params: { id: string }
}

const ProjectDetailsPage = async ({params}: Props) => {
    const project = await prisma.project.findUnique({
        where: {id: params.id},
        include: {
            assignedToUser: true,
            Comment: true
        }
    });
    if (!project)
        return notFound();

    return (
        <div className="">
            <ProjectDetailsActions project={project}/>
            <Card className="md:grid grid-cols-3 ">
                <Card className="h-[12rem] m-5 md:w-full flex p-3 md:h-auto bg-muted">
                    {project.assignedToUserId && (
                        <Link href={`/users/${project.assignedToUser!.id}`}>
                            <div className="flex space-x-2 items-start justify-start hover:underline">
                                <Avatar className="">
                                    <AvatarImage src={project.assignedToUser?.image!}/>
                                    <AvatarFallback>DP</AvatarFallback>
                                </Avatar>
                                <div className="flex justify-center flex-col pt-0.5">
                                    <h4 className="text-sm font-semibold">{project.assignedToUser?.name}</h4>
                                    <div className="flex items-center ">
                                    <span className="text-xs text-muted-foreground">
                                        {project.assignedToUser?.email}
                                    </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )}
                </Card>
                <CardContent className="p-5 ml-0 pt-0 sm:pt-5 md:ml-5 col-span-2">
                    <div className="grid gap-3">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Project Name
                            </p>
                            <p className="text-sm font-medium">
                                {project.name}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Description
                            </p>
                            <p className="text-sm font-medium ">
                                {project.description}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Frameworks
                            </p>
                            <FrameworkDetailsList frameworks={project.frameworks}/>
                        </div>
                        <div className="flex gap-10">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Priority
                                </p>
                                <PrioritiesText priority={project.priority}/>
                            </div>
                            <div className=" sm:grid-cols-none">
                                <p className="text-sm text-muted-foreground">
                                    Due Date
                                </p>
                                <p className="text-sm font-medium">
                                    {`${project.dueDate.toDateString()}`}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row sm:gap-10">
                            <div className="flex gap-10">
                                <div className="">
                                    <p className="text-sm text-muted-foreground">
                                        Status
                                    </p>
                                    <Statues className="text-md" status={project.status}/>
                                </div>
                                <div className=" sm:grid-cols-none">
                                    <p className="text-sm text-muted-foreground">
                                        Budget
                                    </p>
                                    <div className="text-sm font-medium">
                                        {project.budget ?
                                            <p>${project.budget}</p> :
                                            <p>unset</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Created
                                </p>
                                <p className="text-sm font-medium">
                                    {formatTimeAgo(project.createdAt)}
                                </p>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Updated
                            </p>
                            <p className="text-sm font-medium">
                                {project.updatedAt ? formatTimeAgo(project.updatedAt) : "Not Updated"}
                            </p>
                        </div>
                    </div>

                </CardContent>
            </Card>
            <div className="mt-3 md:mt-5">
                <Card>
                    <CardHeader className="flex p-3 px-6 border-b bg-muted rounded-t-md">
                        <CardTitle className="flex items-center gap-3">
                            Comments
                            <div className="text-sm font-normal text-muted-foreground">
                                List of comments and issues related to this project.
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {project.Comment.length > 0 ?
                            <Comments projectId={project.id}/>
                            : <p className="text-lg font-semibold text-center p-5">No comments yet.</p>
                        }
                    </CardContent>
                </Card>

            </div>
        </div>

    );
};

const formatTimeAgo = (timestamp: Date) => {
    return moment(timestamp).fromNow();
};
export default ProjectDetailsPage;
