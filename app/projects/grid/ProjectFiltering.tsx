'use client'
import React from 'react';
import {Priority, Status} from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {useRouter, useSearchParams} from "next/navigation";
import {Separator} from "@/components/ui/separator";


const statuses: {
  label: string,
  value?: Status
}[] = [
  {label: "Not Started", value: "NOT_STARTED"},
  {label: "In Progress", value: "IN_PROGRESS"},
  {label: "Pending", value: "PENDING"},
  {label: "Stuck", value: "STUCK"},
  {label: "Cancelled", value: "CANCELLED"},
  {label: "Reopened", value: "REOPENED"},
  {label: "Completed", value: "COMPLETED"},
  {label: "Overdue", value: "OVERDUE"},
]

const priorities: {
  label: string,
  value?: Priority
}[] = [
  {label: "Low", value: "LOW"},
  {label: "Normal", value: "NORMAL"},
  {label: "High", value: "HIGH"},
  {label: "Critical", value: "CRITICAL"},
]
const getLabelFromValue = (value: string, options: { label: string; value?: string }[]) => {
  const option = options.find((option) => option.value === value);
  return option ? option.label : undefined;
};

const ProjectFiltering = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterValue = searchParams.get('filter') || '';

  return (
    <Select
      onValueChange={(filter) => {
        const query = filter ? `?filter=${filter}` : 'default';
        router.push('/projects/grid' + query);
      }}
    >
      <SelectTrigger className="w-32">
        <SelectValue placeholder={getLabelFromValue(filterValue, [...statuses, ...priorities]) || 'filter by ...'} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="font-bold">
            Priorities
            <Separator />
          </SelectLabel>
          {priorities.map((priority, index) => (
            <SelectItem key={index} value={priority.value || 'default'}>
              {priority.label}
            </SelectItem>
          ))}
          <SelectLabel className="font-bold">
            Statuses
            <Separator />
          </SelectLabel>
          {statuses.map((status, index) => (
            <SelectItem key={index} value={status.value || 'default'}>
              {status.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ProjectFiltering;