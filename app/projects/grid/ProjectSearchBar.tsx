'use client';
import React, {useState} from 'react';
import {Input} from "@/components/ui/input";
import {SearchIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import Spinner from "@/components/Spinner";
import delay from "delay";

const ProjectSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const handleSearch = async () => {
    try {
      setLoading(true);
      const query = searchQuery ? `?q=${searchQuery}` : '';
      router.push('/projects/grid' + query);

    } catch (e) {
      toast.error("Something went wrong...")
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setLoading(true);
      handleSearch();
    }
  };
  return (
      <div className="relative w-full">
        {loading ? (
            <Spinner
                className="absolute cursor-pointer hover:text-foreground w-5 h-5 top-0 bottom-0 my-auto text-gray-500 mx-2"/>
        ) : (
            <SearchIcon onClick={handleSearch}
                        className="absolute cursor-pointer hover:text-foreground top-0 bottom-0 w-6 h-6 my-auto text-gray-500 mx-2"/>
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