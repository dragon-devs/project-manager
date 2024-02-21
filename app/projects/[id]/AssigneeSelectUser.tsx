import React, {useState} from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import prisma from "@/prisma/client";


const AssigneeSelectUser = async () => {
  const users = await prisma.user.findMany({
    orderBy: {name: 'asc'}
  });

  return (
      <Select>
        <SelectTrigger className="sm:w-[10rem]">
          <SelectValue placeholder="Assign..."/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Suggestions</SelectLabel>
            {users.map(user => (
              <SelectItem key={user.id} value={user.id}>
                {user.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
  );
};

export default AssigneeSelectUser;
