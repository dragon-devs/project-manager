'use client';

import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import axios from "axios";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {TrashIcon} from "@radix-ui/react-icons";
import Spinner from "@/components/Spinner";

const DeleteTeamButton = ({teamId}: { teamId: string }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await axios.delete('/api/teams/' + teamId)
      toast.success('Team is successfully deleted.');

      router.refresh()
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error('Unable to delete this team.');
    }
    router.refresh()

  }

  return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
              disabled={loading}
              variant="ghost"
              className="p-3 text-red-500 hover:text-red-600 hover:bg-red-500/10"
          >
            {loading ? <Spinner/> : <TrashIcon/>}
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
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-white hover:bg-destructive/80">
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
  );
};

export default DeleteTeamButton;
