import fs from "fs";
import path from "path";
import { faker } from "@faker-js/faker";
import { projectStatuses } from "@/app/projects/_components/Status";
import { projectPriorities } from "@/app/projects/_components/PrioritySignals";
import { allFrameworks } from "@/app/projects/_components/FrameworkList";
import {randomUUID} from "crypto";

const tasks = Array.from({ length: 10 }, () => ({
  id: randomUUID(),
  name: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
  frameworks: faker.helpers.arrayElements(allFrameworks, 3).map((value) => value), // Limit the number of elements to 2
  status: faker.helpers.arrayElement(projectStatuses).value,
  priority: faker.helpers.arrayElement(projectPriorities).value,
  dueDate: faker.date.future()
}));

fs.writeFileSync(
  path.join(__dirname, "projects.json"),
  JSON.stringify(tasks, null, 2)
);

console.log("✅ Tasks data generated.");
