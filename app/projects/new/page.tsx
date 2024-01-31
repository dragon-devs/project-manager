import React from 'react';
import {ProjectForm} from "@/app/projects/_components/ProjectForm";
import delay from "delay";

const NewProjectPage = async () => {
  await delay(2000)
  return (
      <div>
        <ProjectForm/>
      </div>
  );
};
export default NewProjectPage;
