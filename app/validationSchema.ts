import {z} from "zod";
import {Frameworks} from '@prisma/client';
// Assume you have a set of allowed frameworks
export const allowedFrameworks = Frameworks

// Assume you have a set of allowed frameworks

export const projectSchema = z.object({
  name: z.string().min(5, 'Project Name must be more than 5 characters.').max(255),
  description: z.string().min(1, 'Project Description is required.').max(255),
  frameworks: z.array(z.string()),
  dueDate: z.coerce.date({
    required_error: "Due date is required.",
  }),
  timeline: z.array(z.coerce.date()).optional(),
});

export const patchProjectSchema = z.object({
  name: z.string().min(5, 'Project Name must be more than 5 characters.').max(255).optional(),
  description: z.string().min(1, 'Project Description is required.').max(255).optional(),
  frameworks: z.array(z.string()).optional(),
  dueDate: z.coerce.date({
    required_error: "Due date is required.",
  }).optional(),
  timeline: z.array(z.coerce.date()).optional(),
  priority: z.string().min(1).optional(),
})