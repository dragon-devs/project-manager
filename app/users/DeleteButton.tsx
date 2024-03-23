'use client';

import React, {useState} from 'react';
import CustomAlertDialog from "@/app/components/CustomDeleteDialog";
import {toast} from "sonner";
import axios from "axios";
import {useRouter} from "next/navigation";

const DeleteButton = ({id}: { id: string }) => {
    const [deleting, setDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        try {
            setDeleting(true)
            await axios.delete('/api/users/' + id);
            toast.success("User is successfully deleted.")
            router.push('/users');
            router.refresh()
        } catch (error) {
            setDeleting(false)
            toast.error("Unable to delete the user.")
        }
    }
    return (
        <CustomAlertDialog
            className="bg-destructive w-fit h-fit p-2.5 py-2.5 text-white hover:bg-destructive/90 rounded-md"
            isDeleting={deleting}
            description="This action cannot be undone. This will permanently delete this user?"
            onConfirm={handleDelete}
        />
    );
};

export default DeleteButton;