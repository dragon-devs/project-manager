'use client';

import React, {useState} from 'react';
import {useRouter} from "next/navigation";
import axios from "axios";
import {toast} from "sonner";
import CustomAlertDialog from "@/app/components/CustomDeleteDialog";


const DeleteComment = ({commentId}: { commentId: string }) => {
    const router = useRouter();
    const [deleting, setDeleting] = useState(false);

    const deleteComment = async () => {
        try {
            setDeleting(true)
            await axios.delete('/api/comments', {
                data: {commentId},
            });
            toast.success("Comment is successfully deleted.")
            router.refresh()
        } catch (error) {
            setDeleting(false)
            toast.error("Unable to delete the Comment.")
        }
        setDeleting(false)
    }

    return (
        <CustomAlertDialog className="bg-background  p-2 text-red-500" isDeleting={deleting} btnSize="icon"
                           onConfirm={deleteComment}/>

    );
};

export default DeleteComment;