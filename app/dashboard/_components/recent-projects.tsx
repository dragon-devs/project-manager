import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import axios from "axios";
import {notFound} from "next/navigation";
import {Project} from "@/types";

export async function RecentProjects() {
  try {
    const {data} = await axios.get('/api/projectsData/recent-projects');
    if (!data) return notFound();

    return (
        <div className="space-y-6">
          {data.map((project: Project) => (
              <div key={project.id} className="flex items-center">
                <div className="mr-4 space-y-1">
                  <div className="text-sm font-medium leading-none">{project.name}</div>
                  <div className="text-sm text-muted-foreground">{project.status}</div>
                </div>
                <div className="ml-auto font-medium mr-4">{project.priority}</div>
                {project.assignedToUserId ? (
                    <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                      <AvatarImage src={project.assignedToUser?.image!} alt="Avatar"/>
                      <AvatarFallback>{project.assignedToUser?.name}</AvatarFallback>
                    </Avatar>
                ) : (
                    <div className="mr-9"></div>
                )}
              </div>
          ))}
        </div>
    );
  } catch (error) {
    console.error('Error fetching recent projects:', error);
    return notFound();
  }
}