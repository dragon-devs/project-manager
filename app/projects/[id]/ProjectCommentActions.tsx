import React from 'react';
import DeleteComment from "@/app/projects/_components/DeleteComment";

const ProjectCommentActions = ({commentId}: { commentId: string }) => {
    return (
        <div>
            <DeleteComment commentId={commentId}/>
        </div>
    );
};

export default ProjectCommentActions;