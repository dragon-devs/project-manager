import {Project} from "@/types";
import prisma from "@/prisma/client";
import PopoverUserAvatar from "@/app/components/popover-user-avatar";
import {getProjectCountLastDays} from "@/app/dashboard/projectsData";

export async function RecentProjects() {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      assignedToUser: true
    },
    take: 6
  })

  return (
      <div className="space-y-5">
        {projects.map((project: Project) => (
            <div key={project.id} className="flex items-center">
              <div className="mr-2 space-y-1">
                <div className="text-sm font-medium w-40 leading-none truncate ...">{project.name}</div>
                <div className="text-sm text-muted-foreground">{project.status}</div>
              </div>
              <div className="ml-auto font-medium mr-3">{project.priority}</div>
              {project.assignedToUserId ? (
                  <div className="border rounded-full">
                    <PopoverUserAvatar project={project}/>
                  </div>
              ) : (
                  <div className="mr-[42px]"></div>
              )}
            </div>
        ))}
      </div>
  );
}