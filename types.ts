// types/project.ts

import {Frameworks, Priority, Status} from "@prisma/client";

export interface Project {
  id: string;
  name: string;
  description: string;
  frameworks: Frameworks[];
  timeline: Date[];
  status: Status;
  priority: Priority;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
