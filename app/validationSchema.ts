import { z } from "zod";

// Assume you have a set of allowed frameworks
export const allowedFrameworks = ["React", "Angular", "Vue", "Node", "Next", "Django", "ASP.Net", "Flutter", "React Native"];

export const projectSchema = z.object({
  name: z.string().min(5, 'Project Name must be more than 5 characters.').max(255),
  description: z.string().min(1, 'Project Description is required.').max(255),
  framework: z.string().min(1, 'Framework must be selected.').refine(value => allowedFrameworks.includes(value), {
    message: 'Invalid framework. Choose from: React, Angular, Vue, etc.'
  }),
  dueDate: z.coerce.date({
    required_error: "Due date is required.",
  })
});
