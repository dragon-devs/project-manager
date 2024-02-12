// types/project.ts

import { Frameworks, Priority, Status, User } from "@prisma/client";

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

export interface Teams {
  id: string;
  name: string;
  description: string;
  industry: string;
  rating: string;
  members: User[];
  createAt: Date;
  updateAt: Date;
}

export interface Users {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  role: Role | null;
  // Add any additional properties if necessary
}

export type Role = string;
