'use client';
import React, {useState} from 'react';
import {Input} from "@/components/ui/input";
import {SearchIcon} from "lucide-react";

const ProjectSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative w-full">
      <SearchIcon onClick={handleSearch} className="absolute cursor-pointer hover:text-foreground top-0 bottom-0 w-6 h-6 my-auto text-gray-500 mx-2" />
      <Input
        type="text"
        className="pl-10 pr-4"
        placeholder="Search projects..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default ProjectSearchBar;
