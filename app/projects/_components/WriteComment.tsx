'use client';

import React, {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import CommentStatues, {commentStatuses} from "@/app/projects/_components/CommentStatus";
import axios from 'axios';
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {CommentStatus} from "@prisma/client";
import {PaperPlaneIcon} from "@radix-ui/react-icons";
import Spinner from "@/components/Spinner";

const WriteComment = ({projectId, commentId}: { projectId: string, commentId?: string }) => {
    const [content, setContent] = useState('');
    const [status, setStatus] = useState(commentStatuses[0].value);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleComment = () => {
        if (!content || !status) {
            toast.warning('Please fill in all fields.');
            return;
        }

        if (loading) {
            return;
        }
        setLoading(true);
        axios.post("/api/comments", {
            projectId: projectId,
            content: content,
            status: status
        })
            .then(response => {
                setLoading(false);
                setContent('');
                router.refresh()
            })
            .catch(error => {
                setLoading(false);
                toast.error('Failed to post comment. Please try again.');
            });
    };

    return (
        <Card>
            <CardHeader className="flex p-2 px-3 sm:p-3 sm:px-6 border-b bg-muted rounded-t-md">
                <CardTitle className="sm:flex items-center gap-3 text-sm sm:text-sm">
                    Write a comment
                </CardTitle>
            </CardHeader>
            <CardContent className="p-2 space-y-2">
                <Textarea
                    required
                    className="h-24"
                    placeholder="Add your comment here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <div className="flex items-center justify-between">
                    <Button disabled={loading} className="flex gap-2 h-8 w-32 transition-all duration-500"
                            onClick={handleComment}>
                        <p>
                            Comment
                        </p>
                        {loading ? <Spinner/> : <PaperPlaneIcon className="w-4 h-4"/>}
                    </Button>
                    <Select onValueChange={(value: CommentStatus) => setStatus(value)}>
                        <SelectTrigger className="w-32">
                            <SelectValue defaultValue={status} placeholder={<CommentStatues status={status}/>}>
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent className="w-40 capitalize" align="center" position="popper">
                            <SelectGroup>
                                <SelectLabel>Tags</SelectLabel>
                                {commentStatuses.map(status => (
                                    <SelectItem
                                        key={status.value}
                                        value={status.value}
                                        onClick={() => setStatus(status.value)}
                                    >
                                        <CommentStatues status={status.value}/>
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    );
};

export default WriteComment;
