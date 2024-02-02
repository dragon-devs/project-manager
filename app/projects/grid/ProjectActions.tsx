import React from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {PlusIcon} from "@radix-ui/react-icons";
import ProjectFiltering from "@/app/projects/grid/ProjectFiltering";
import ProjectSearchBar from "@/app/projects/grid/ProjectSearchBar";

const ProjectActions = () => {
  return (
      <div className="flex gap-3 justify-between">
        <ProjectSearchBar />
        <ProjectFiltering />
        <Link href="/projects/new">
          <Button className="hidden sm:flex gap-2">New Project <PlusIcon/></Button>
          <Button className="p-3 block sm:hidden"><PlusIcon/></Button>
        </Link>
      </div>
  );
};

export default ProjectActions;
