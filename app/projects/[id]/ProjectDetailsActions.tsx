import React from 'react';
import {CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Project} from "@prisma/client";
import EditProjectButton from "@/app/projects/[id]/EditProjectButton";
import DeleteProjectButton from "@/app/projects/[id]/DeleteProjectButton";

const ProjectDetailsActions = ({projectId}: {projectId: string}) => {
  return (
      <div className="flex  justify-between ">
        <CardHeader className="p-0 mb-5">
          <CardTitle>Project Details</CardTitle>
          <CardDescription>Here is the full details page for each project.</CardDescription>
        </CardHeader>
        <div className="flex gap-3 ">
          <DeleteProjectButton projectId={projectId} />
          <EditProjectButton projectId={projectId} />
        </div>
      </div>
  );
};

export default ProjectDetailsActions;
