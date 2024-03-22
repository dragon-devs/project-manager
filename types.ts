import {Frameworks, Priority, Role, Status, User} from "@prisma/client";

export interface Project {
  id: string;
  name: string;
  description: string;
  frameworks: Frameworks[];
  timeline: Date[];
  status: Status;
  priority: Priority;
  assignedToUserId?: string | null;
  assignedToUser?: Users | null;
  dueDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Teams {
  id: string;
  name: string;
  description: string;
  industry: string | null;
  rating: string | null;
  members?: User[];
  createAt?: Date;
  updateAt?: Date;
}

export interface Users {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  role: Role | null;
  createdAt?: Date;
}

export interface Like {
  id: string;
  user: Users;
  userId: string;
  comment: Comment;
  commentId: string;
  createdAt?: Date;
}

export interface Comment {
  id: string;
  content: string;
  user: Users;
  userId: string;
  project: Project;
  projectId: string;
  createdAt?: Date;
}


