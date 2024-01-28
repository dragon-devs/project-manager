import React from 'react';
import {addDays, differenceInDays, differenceInHours, differenceInMinutes, isTomorrow} from 'date-fns';
import {
  CountdownTimerIcon,
  CrossCircledIcon,
  ExclamationTriangleIcon,
  QuestionMarkCircledIcon
} from "@radix-ui/react-icons";
import {Label} from "@/components/ui/label";

interface MyComponentProps {
  dueDate: Date | string; // Accept Date or string representation
}

function DueDate({dueDate}: MyComponentProps) {
  const currentDate = new Date();
  const parsedDueDate = typeof dueDate === 'string' ? new Date(dueDate) : dueDate; // Parse string representation if necessary
  const remainingDays = differenceInDays(parsedDueDate, currentDate);


// Get the end of the current day (beginning of the next day)
  const endOfDay = addDays(new Date(), 1);
  endOfDay.setHours(0, 0, 0, 0);

// Calculate the remaining hours and minutes
  const remainingHours = differenceInHours(endOfDay, currentDate);
  const remainingMinutes = differenceInMinutes(endOfDay, currentDate) % 60;

// Format the current date and time

  let message =
      remainingHours > 1
          ? `${remainingHours} hours remaining`
          : remainingHours === 1
              ? `${remainingHours} hour`
              : remainingHours === 0 && remainingMinutes > 0
                  ? `${remainingMinutes} minutes remaining`
                  : `Less than a minute`;

  if (isTomorrow(parsedDueDate)) {
    return (<Label
        className="gap-2 text-xs font-medium flex items-center  text-orange-600 dark:text-orange-500 hover:text-orange-600/80 dark:hover:text-orange-500/80"
    >
      {message}
      <ExclamationTriangleIcon/>
    </Label>)
  }
  if (remainingDays === 1) {
    return <Label
        className="gap-2 text-xs font-medium flex items-center  text-yellow-600 dark:text-yellow-500 hover:text-yellow-600/80 dark:hover:text-yellow-500/80">
      Tomorrow is the last day
      <QuestionMarkCircledIcon/>
    </Label>
  } else if (remainingDays > 0) {
    return <Label
        className="gap-2 text-xs font-medium flex items-center "
    >
      {remainingDays} days remaining
      <CountdownTimerIcon/>
    </Label>;
  } else {
    return (
        <Label
            className="gap-2 text-xs font-medium flex items-center text-red-600 dark:text-red-700 hover:text-red-500/80 dark:hover:text-red-700/80"
        >
          Overdue Cancel
          <CrossCircledIcon/>
        </Label>
    );
  }
}

export default DueDate;
