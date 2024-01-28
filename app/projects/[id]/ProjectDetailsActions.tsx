import React from 'react';
import {CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

const ProjectDetailsActions = () => {
  return (
      <div className="md:flex justify-between ">
        <CardHeader className="p-0 mb-5">
          <CardTitle>Project Details</CardTitle>
          <CardDescription>Here is the full details page for each project.</CardDescription>
        </CardHeader>
        <div className="flex gap-3 ">
          <Button variant="outline">Edit</Button>
          <Button variant="destructive">Delete</Button>
        </div>
      </div>
  );
};

export default ProjectDetailsActions;
