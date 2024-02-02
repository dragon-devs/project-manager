import {CardDemo} from "@/components/NotificationsCard";
import ProjectSorting from "@/app/projects/grid/ProjectSorting";


export default function Home() {
  return (
      <div className="flex justify-center items-center">
        <ProjectSorting />
        {/*<CardDemo />*/}
      </div>
  );
}
