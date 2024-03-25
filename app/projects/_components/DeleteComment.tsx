'use client';
import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import axios from 'axios';
import {toast} from 'sonner';
import CustomAlertDialog from '@/app/components/CustomDeleteDialog';

const DeleteComment = ({commentId, replyId}: { commentId?: string; replyId?: string }) => {
    const router = useRouter();
    const [deleting, setDeleting] = useState(false);

    const deleteComment = async () => {
        try {
            setDeleting(true);
            const data = replyId ? {replyId} : {commentId};
            await axios.delete('/api/comments', {
                data,
            });
            toast.success('Comment is successfully deleted.');
            router.refresh();
        } catch (error) {
            setDeleting(false);
            toast.error('Unable to delete the Comment.');
        }
        setDeleting(false);
    };

    return (
        <CustomAlertDialog
            className="flex justify-between w-full h-full p-1.5 px-3 hover:text-white font-medium text-red-500"
            isDeleting={deleting}
            triggerButtonLabel="Delete"
            onConfirm={deleteComment}
        />
    );
};

export default DeleteComment;
