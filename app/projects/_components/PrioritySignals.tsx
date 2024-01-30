import React, {ReactNode} from 'react';
import {Priority} from "@prisma/client";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {SignalHighIcon, SignalLowIcon, SignalMediumIcon} from "lucide-react";

interface ProjectPriority
{
  value: Priority;
  label: string;
  icon ? : ReactNode;
  className: string;
}


const projectPriorities: ProjectPriority[] = [
  {
    value: 'LOW',
    label: 'Low Priority',
    icon: <SignalLowIcon className="text-blue-600 dark:text-blue-500" strokeWidth={3}/>,
    className: ""
  },
  {
    value: 'NORMAL',
    label: 'Normal Priority',
    icon: <SignalMediumIcon className="text-green-600 dark:text-green-500" strokeWidth={3}/>,
    className: ""
  },
  {
    value: 'HIGH',
    label: 'High Priority',
    icon: <SignalHighIcon className="text-amber-600 dark:text-amber-500" strokeWidth={3}/>,
    className: ""
  },
  {
    value: 'CRITICAL',
    label: 'Critical Priority',
    icon: <SignalHighIcon className="text-red-600 dark:text-red-500" strokeWidth={3}/>,
    className: ""
  },

];

interface PriorityProps {
  priority: Priority; // Assuming that the 'status' prop is of type Status
  className ? : string;
}
const Priorities: React.FC<PriorityProps> = ({className, priority}) => {
  // Find the corresponding project status based on the 'status' prop
  const currentPriority = projectPriorities.find((projectPriority) => projectPriority.value === priority);

  if (!currentPriority) {
    return <p className="text-red-500">Invalid priority</p>;
  }

  return (
      <Popover>
        <PopoverTrigger
            className={` ${className} ${currentPriority.className} flex gap-1 border-none items-center font-medium`}>
          {currentPriority.icon}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2 text-xs">
          <div>{currentPriority.label}</div>
        </PopoverContent>
      </Popover>
  );
};

export default Priorities;