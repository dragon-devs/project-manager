'use client';

import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {TrashIcon} from "@radix-ui/react-icons";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {useRouter} from "next/navigation";
import axios from "axios";
import Spinner from "@/components/Spinner";
import {toast} from "sonner";

const DeleteProjectButton = ({projectId}: { projectId: string }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const deleteProject = async () => {
    try {
      setDeleting(true)
      await axios.delete('/api/projects/list/' + projectId);
      toast.success("Project is deleted successfully.")
      router.push('/projects/list');
      router.refresh()
    } catch (error) {
      setDeleting(false)
      toast.error("Unable to delete the project.")
    }
  }

  return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
              disabled={deleting}
              variant="destructive"
              className="gap-1 w-full"
          >
            Delete <TrashIcon/>
            {deleting && <Spinner />}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this project
              and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteProject} className="bg-destructive text-white hover:bg-destructive/80">
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

  );
};

export default DeleteProjectButton;
