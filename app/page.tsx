'use client';

import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import DueDate from "@/app/projects/_components/DueDate";
import DateTimeCounter from "@/components/DateTimeCounter";
import TimeElapsedComponent from "@/components/DateTimeCounter";
import Spinner from "@/components/Spinner";

export default function Home() {
  return (
    <div>
      <Spinner />
    </div>
  );
}
