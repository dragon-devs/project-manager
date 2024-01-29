import React from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Pencil2Icon} from "@radix-ui/react-icons";

const EditProjectButton = ({projectId}: { projectId: string }) => {
  return (
      <Link href={`/projects/edit/${projectId}`}>
        <Button variant="outline" className="gap-1 w-full">
          Edit
          <Pencil2Icon/>
        </Button>
      </Link>
  );
};

export default EditProjectButton;
