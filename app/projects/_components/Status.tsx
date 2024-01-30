import React, {ReactNode} from 'react';
import {Status} from "@prisma/client";
import {
  CheckCircledIcon,
  CircleBackslashIcon,
  CrumpledPaperIcon,
  FileMinusIcon,
  LinkBreak2Icon,
  ReloadIcon,
  ResumeIcon,
  SymbolIcon
} from "@radix-ui/react-icons";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

interface ProjectStatus {
  value: Status;
  label: string;
  description: string;
  icon?: ReactNode;
  className: string;
}


const projectStatuses: ProjectStatus[] = [
  {
    value: 'NOT_STARTED',
    label: 'Not Started',
    description: 'The task or project has been created but has not yet begun.',
    icon: <ResumeIcon />,
    className: "text-slate-600 dark:text-slate-400"
  },
  {
    value: 'IN_PROGRESS',
    label: 'In Progress',
    description: 'Work on the task or project has started and is currently ongoing.',
    icon: <SymbolIcon />,
    className: "text-slate-600 dark:text-slate-400"
  },
  {
    value: 'STUCK',
    label: 'Stuck',
    description: 'Progress on the task or project is impeded due to an issue or dependency.',
    icon: <LinkBreak2Icon />,
    className: "text-slate-600 dark:text-slate-400"

  },
  {
    value: 'COMPLETED',
    label: 'Completed',
    description: 'The task or project has been finished successfully.',
    icon: <CheckCircledIcon />,
    className: "text-slate-600 dark:text-slate-400"
  },
  {
    value: 'CANCELLED',
    label: 'Cancelled',
    description: 'The task or project has been abandoned or terminated before completion.',
    icon: <FileMinusIcon />,
    className: "text-slate-600 dark:text-slate-400"
  },
  {
    value: 'PENDING',
    label: 'Pending',
    description: 'The task or project has been completed and is awaiting review or approval.',
    icon: <CircleBackslashIcon />,
    className: "text-slate-600 dark:text-slate-400"
  },
  {
    value: 'OVERDUE',
    label: 'Overdue',
    description: 'The task or project has passed its due date without completion.',
    icon: <CrumpledPaperIcon />,
    className: "text-slate-600 dark:text-slate-400"
  },
  {
    value: 'REOPENED',
    label: 'Reopened',
    description: 'A previously completed task or project has been reopened for additional work or revisions.',
    icon: <ReloadIcon />,
    className: "text-slate-600 dark:text-slate-400"
  },
];

interface StatuesProps {
  status: Status; // Assuming that the 'status' prop is of type Status
  className?: string;
}
const Statues: React.FC<StatuesProps> = ({ className, status }) => {
  // Find the corresponding project status based on the 'status' prop
  const currentStatus = projectStatuses.find((projectStatus) => projectStatus.value === status);

  if (!currentStatus) {
    return <p className="text-red-500">Invalid status</p>;
  }

  return (
      <Popover>
        <PopoverTrigger className={` ${className} ${currentStatus.className} flex gap-1 border-none items-center font-medium`}>
          {currentStatus.label}
          {currentStatus.icon}
        </PopoverTrigger>
        <PopoverContent className="w-[70%] mx-3 sm:w-auto p-2  text-xs">
          <p>{currentStatus.description}</p>
        </PopoverContent>
      </Popover>
  );
};

export default Statues;