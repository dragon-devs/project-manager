'use client';

import React from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Project, Users} from "@/types";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {Skeleton} from "@/components/ui/skeleton";
import {useRouter} from "next/navigation";
import {toast} from "sonner";


const AssigneeSelectUser = ({project}: { project: Project }) => {
  const router = useRouter();
  const {data: users, error, isLoading} = useUsers();

  if (isLoading) return <Skeleton className="w-[10rem]"/>

  if (error) return null;

  const assignProject = (userId: string) => {
    const assignedToUserId = userId === "unassigned" ? null : userId;
    const status = assignedToUserId ? "IN_PROGRESS" : "CANCELLED";
      const name = project.name
      axios
          .patch('/api/projects/' + project.id, {assignedToUserId, status, name})
        .then(() => {
          router.refresh();
        })
        .catch(() => {
          toast.error('Changes could not be saved.');
        });
  };

  return (
      <Select
          defaultValue={project.assignedToUserId ?? "unassigned"}
          onValueChange={assignProject}>
        <SelectTrigger className="sm:w-[10rem]">
          <SelectValue placeholder="Assign..."/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Suggestions</SelectLabel>
            <SelectItem value="unassigned">Unassigned</SelectItem>
            {users?.map(user => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name}
                </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
  );
};

const useUsers = () =>
    useQuery<Users[]>({
      queryKey: ['users'],
      queryFn: () => axios.get('/api/users').then(res => res.data),
      staleTime: 60 * 1000,
      retry: 3
    });

export default AssigneeSelectUser;
