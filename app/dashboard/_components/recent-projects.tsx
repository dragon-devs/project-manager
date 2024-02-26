import {Project} from "@/types";
import prisma from "@/prisma/client";
import PopoverUserAvatar from "@/app/components/popover-user-avatar";
import Statues from "@/app/components/Status";
import PrioritySignals from "@/app/components/PrioritySignals";
import Link from "next/link";

export async function RecentProjects() {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      assignedToUser: true
    },
    take: 5
  });

  return (
      <div className="space-y-5">
        {projects.length === 0 ? ( // Check if there are no projects
            <div>No recent projects available.</div>
        ) : (
            projects.map((project: Project) => (
                <div key={project.id} className="flex items-center">
                  <div className="mr-2 space-y-1">
                    <Link href={`/projects/${project.id}`}>
                      <div
                          className="hover:underline text-sm font-medium w-40 leading-none truncate ...">{project.name}</div>
                    </Link>
                    <div className="text-sm text-muted-foreground"><Statues status={project.status}/></div>
                  </div>
                  <div className="ml-auto font-medium mr-3"><PrioritySignals priority={project.priority}/></div>
                  {project.assignedToUserId ? (
                      <div className="border rounded-full">
                        <PopoverUserAvatar project={project}/>
                      </div>
                  ) : (
                      <div className="mr-[42px]"></div>
                  )}
                </div>
            ))
        )}
      </div>
  );
}
