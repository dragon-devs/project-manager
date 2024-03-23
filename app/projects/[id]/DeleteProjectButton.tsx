'use client';

import React, {useState} from 'react';
import {useRouter} from "next/navigation";
import axios from "axios";
import {toast} from "sonner";
import CustomAlertDialog from "@/app/components/CustomDeleteDialog";

const DeleteProjectButton = ({projectId}: { projectId: string }) => {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const deleteProject = async () => {
    try {
      setDeleting(true)
      await axios.delete('/api/projects/' + projectId);
      toast.success("Project is successfully deleted.")
      router.push('/projects/grid');
      router.refresh()
    } catch (error) {
      setDeleting(false)
      toast.error("Unable to delete the project.")
    }
  }

  return (
      <CustomAlertDialog
          isDeleting={deleting}
          className="sm:w-fit px-2 justify-center hover:bg-destructive/90 text-white rounded-md p-1.5 font-medium bg-destructive"
          triggerButtonLabel="Delete"
          onConfirm={deleteProject}
      />

  );
};

export default DeleteProjectButton;
