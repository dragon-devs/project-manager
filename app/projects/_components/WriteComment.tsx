'use client';

import React, {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {commentStatuses} from "@/app/projects/_components/CommentStatus";
import axios from 'axios';
import {useRouter} from "next/navigation";
import {toast} from "sonner";

const WriteComment = ({projectId}: { projectId: string }) => {
    const [content, setContent] = useState('');
    const [status, setStatus] = useState('');
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
                // console.log('Comment posted successfully:', response.data);
                setContent('');
                setStatus('');
                router.refresh()
            })
            .catch(error => {
                setLoading(false);
                // console.error('Error posting comment:', error);
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
                    <Button className="h-8 w-32 transition-all duration-500" onClick={handleComment}>
                        {loading ? 'Posting...' : 'Post Comment'}
                    </Button>
                    <Select onValueChange={(value) => setStatus(value)}>
                        <SelectTrigger className="w-32">
                            <SelectValue defaultValue={status} placeholder="Select a tag">
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent className="w-40 capitalize" align="center" position="popper">
                            <SelectGroup>
                                {commentStatuses.map(status => (
                                    <SelectItem
                                        key={status.value}
                                        value={status.value}
                                        onClick={() => setStatus(status.value)}
                                    >
                                        <span className="capitalize">{status.label}</span>
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
