import React from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";

const ProjectActions = () => {
  return (
      <div className="flex justify-between">
          <Link href="/projects/new">
            <Button>New Issue</Button>
          </Link>
      </div>
  );
};

export default ProjectActions;
