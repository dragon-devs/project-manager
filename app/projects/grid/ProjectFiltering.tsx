'use client'
import React, {useTransition} from 'react';
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
import {DotsHorizontalIcon} from "@radix-ui/react-icons";
import Spinner from "@/components/Spinner";


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
  const filterValue = searchParams.get('filter') ?? '';
  const [loading, startTransition] = useTransition();


  return (
      <Select
          onValueChange={(filter) => {
            const query = filter ? `?filter=${filter}` : 'default';
            startTransition(() => {
              router.push('/projects/grid' + query);
            })
          }}
      >
        <SelectTrigger
            className="sm:flex sm:relative sm:right-0 sm:border-solid absolute right-[4rem] sm:w-36 sm:px-3 w-10 border-none focus:ring-0 p-0 m-0">
          {loading ? <Spinner className="absolute right-2 w-5 h-5"/> :
              <div>
                <DotsHorizontalIcon
                    className="w-5 h-5  absolute bottom-1.5 right-2 hover:text-foreground/80 sm:hidden"/>
                <div className="hidden sm:block">
                  <SelectValue
                      placeholder={getLabelFromValue(filterValue, [...statuses, ...priorities]) ?? 'filter by ...'}/>
                </div>
              </div>}
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="font-bold">
              Priorities
              <Separator/>
            </SelectLabel>
            {priorities.map((priority) => (
                <SelectItem key={priority.label} value={priority.value ?? 'default'}>
                  {priority.label}
                </SelectItem>
            ))}
            <SelectLabel className="font-bold">
              Statuses
              <Separator/>
            </SelectLabel>
            {statuses.map((status ) => (
                <SelectItem key={status.label} value={status.value ?? 'default'}>
                  {status.label}
                </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
  );
};

export default ProjectFiltering;