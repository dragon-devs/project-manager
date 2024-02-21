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


const AssigneeSelectUser = ({project}: { project: Project }) => {
  const router = useRouter();

  const {data: users, error, isLoading} = useQuery<Users[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(res => res.data),
    staleTime: 60 * 1000,
    retry: 3
  });

  if (isLoading) return <Skeleton className="w-[10rem]"/>

  if (error) return null;

  return (
      <Select
          defaultValue={project.assignedToUserId ?? "unassigned"}
          onValueChange={(userId) => {
        const assignedToUserId = userId === "unassigned" ? null : userId;
        axios.patch('/api/projects/' + project.id, {assignedToUserId});
        router.refresh()
      }}>
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

export default AssigneeSelectUser;
