import React from 'react';
import {differenceInDays, format, isToday, isTomorrow} from 'date-fns';
import {Badge} from "@/components/ui/badge";
import {FileWarningIcon} from "lucide-react";
import {CrossCircledIcon, QuestionMarkCircledIcon} from "@radix-ui/react-icons";

interface MyComponentProps {
  dueDate: Date;
}

function DueDate({dueDate}: MyComponentProps) {
  const currentDate = new Date();
  const remainingDays = differenceInDays(dueDate, currentDate);

  const formattedDueDate = format(dueDate, 'MMMM do, yyyy');

  let status: string;

  if (remainingDays === 1) {
    return <Badge className="gap-1 text-white bg-orange-500 dark:bg-orange-700 shadow hover:bg-orange-500/80 dark:hover:bg-orange-700/80" variant="outline"><QuestionMarkCircledIcon />Tomorrow</Badge>;
  } else if (remainingDays > 0) {
    return <Badge>{remainingDays} days remaining</Badge>;
  } else {
    return (
          <Badge variant="destructive" className="gap-1">
            <CrossCircledIcon />
            Project is Overdue
          </Badge>
    )
  }
}

export default DueDate;
