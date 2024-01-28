// types/project.ts

import {Priority, Status} from "@prisma/client";

export interface Project {
  id: string;
  name: string;
  description: string;
  framework: string;
  status: Status;
  priority: Priority;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
