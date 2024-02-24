'use client';

import React from 'react';
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Pencil2Icon} from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {Project} from "@/types";
import axios from "axios";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {projectPriorities} from "@/app/projects/_components/PrioritySignals";
import {projectStatuses} from "@/app/projects/_components/Status";
import {Priority, Status} from "@prisma/client";

const UserProjectFeatures = ({project}: { project: Project }) => {
  const router = useRouter()
  const priorities = projectPriorities
  const statuses = projectStatuses
  const setPriority = (priority: Priority) => {
    console.log({priority})
    axios
        .patch('/api/projects/' + project.id, {priority})
        .catch(() => {
          toast.error('Changes could not be saved.')
        });
    router.refresh()
  };
  const setStatus = (status: Status) => {
    console.log({status})
    axios
        .patch('/api/projects/' + project.id, {status})
        .catch(() => {
          toast.error('Changes could not be saved.')
        });
    router.refresh()
  };

  return (
      <div>
        <Popover>
          <PopoverTrigger>
            <Pencil2Icon className="w-5 h-5"/>
          </PopoverTrigger>
          <PopoverContent className="w-60">
            <div className="flex flex-col gap-2">
              <Select
                  defaultValue={project.priority!}
                  onValueChange={setPriority}>
                <p className="text-sm text-muted-foreground">Set Priority</p>
                <SelectTrigger className="">
                  <SelectValue placeholder="Assign..."/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Priorities</SelectLabel>
                    {priorities?.map(priority => (
                        <SelectItem key={priority.value} value={priority.value}>
                          {priority.label}
                        </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                  defaultValue={project.status!}
                  onValueChange={setStatus}>
                <p className="text-sm text-muted-foreground">Set Status</p>
                <SelectTrigger className="">
                  <SelectValue placeholder="Assign..."/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Statuses</SelectLabel>
                    {statuses?.map(status => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </PopoverContent>
        </Popover>
      </div>
  );
};

export default UserProjectFeatures;
