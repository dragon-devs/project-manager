import React from 'react';
import {addDays, differenceInDays, differenceInHours, differenceInMinutes, format, isTomorrow} from 'date-fns';
import {Badge} from "@/components/ui/badge";
import {QuestionMarkCircledIcon, CrossCircledIcon, ExclamationTriangleIcon} from "@radix-ui/react-icons";

interface MyComponentProps {
  dueDate: Date | string; // Accept Date or string representation
}

function DueDate({dueDate}: MyComponentProps) {
  const currentDate = new Date();
  const parsedDueDate = typeof dueDate === 'string' ? new Date(dueDate) : dueDate; // Parse string representation if necessary
  const remainingDays = differenceInDays(parsedDueDate, currentDate);

  const formattedDueDate = format(parsedDueDate, 'MMMM do, yyyy HH:mm:ss');

// Get the end of the current day (beginning of the next day)
  const endOfDay = addDays(new Date(), 1);
  endOfDay.setHours(0, 0, 0, 0);

// Calculate the remaining hours and minutes
  const remainingHours = differenceInHours(endOfDay, currentDate);
  const remainingMinutes = differenceInMinutes(endOfDay, currentDate) % 60;

// Format the current date and time
  const formattedCurrentDateTime = format(currentDate, 'MMMM do, yyyy HH:mm:ss');

  let message =
      remainingHours > 1
          ? `${remainingHours} H & ${remainingMinutes} M remaining`
          : remainingHours === 1
              ? `${remainingHours} hour & ${remainingMinutes} minutes remaining`
              : remainingHours === 0 && remainingMinutes > 0
                  ? `${remainingMinutes} minutes remaining`
                  : `Less than a minute`;

  if (isTomorrow(parsedDueDate)) {
    return (<Badge
        variant="destructive"
        className="gap-1 text-white bg-rose-500 dark:bg-rose-700 shadow hover:bg-rose-500/80 dark:hover:bg-rose-700/80"
    >
      <ExclamationTriangleIcon/>
      {message}
    </Badge>)
  }
  if (remainingDays === 1) {
    return <Badge variant="destructive"
                  className="gap-1 text-white bg-orange-500 dark:bg-orange-700 shadow hover:bg-orange-500/80 dark:hover:bg-orange-700/80">
      <QuestionMarkCircledIcon/>
      Tomorrow is last day
    </Badge>
  } else if (remainingDays > 0) {
    return <Badge>{remainingDays} days remaining</Badge>;
  } else {
    return (
        <Badge variant="destructive" className="gap-1">
          <CrossCircledIcon/>
          Project is Overdue
        </Badge>
    );
  }
}

export default DueDate;
