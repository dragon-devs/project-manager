// types/project.ts

import {Languages, Priority, Status} from "@prisma/client";

export interface Project {
  id: string;
  name: string;
  description: string;
  frameworks: Languages[];
  timeline: Date[];
  status: Status;
  priority: Priority;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
