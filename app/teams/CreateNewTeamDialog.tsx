import React from 'react';
import TeamForm from "@/app/teams/_components/TeamForm";
import prisma from "@/prisma/client";
import {User} from "@prisma/client";

const CreateNewTeam = async () => {
  const users = await prisma.user.findMany();

  return (
      <div>
        <TeamForm users={users}/>
      </div>
  );
};

export default CreateNewTeam;
