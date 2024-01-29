import React from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {TrashIcon} from "@radix-ui/react-icons";

const DeleteProjectButton = ({projectId}: {projectId: string}) => {
  return (
      <Link href={`/projects`}>
        <Button variant="destructive" className="gap-1">
          Delete
          <TrashIcon />
        </Button>
      </Link>
  );
};

export default DeleteProjectButton;
