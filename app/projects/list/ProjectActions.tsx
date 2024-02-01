import React from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {PlusIcon} from "@radix-ui/react-icons";

const ProjectActions = () => {
  return (
      <div className="flex justify-between">
          <Link href="/projects/new">
            <Button className="gap-2">New Project <PlusIcon /></Button>
          </Link>
      </div>
  );
};

export default ProjectActions;