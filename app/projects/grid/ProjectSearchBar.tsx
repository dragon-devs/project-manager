'use client';
import React, {useState, useTransition} from 'react';
import {Input} from "@/components/ui/input";
import {SearchIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import Spinner from "@/components/Spinner";

const ProjectSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const handleSearch = () => {
    try {
      const query = searchQuery ? `?q=${searchQuery}` : '';
      startTransition(() => {
        router.push('/projects/grid' + query);
      })
    } catch (e) {
      toast.error("Something went wrong...")
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
      <div className="relative w-full">
        {isPending ? (
            <Spinner
                className="absolute cursor-pointer hover:text-foreground top-0 w-5 h-5 bottom-0 my-auto mx-2"/>
        ) : (
            <SearchIcon onClick={handleSearch}
                        className="absolute cursor-pointer hover:text-foreground top-0 bottom-0 w-5 h-5 my-auto mx-2"/>
        )}
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