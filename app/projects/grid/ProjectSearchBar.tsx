'use client';
import React, {useState} from 'react';
import {Input} from "@/components/ui/input";
import {SearchIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import Spinner from "@/components/Spinner";

const ProjectSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);  // New loading state
  const router = useRouter();

  const handleSearch = async () => {
    try {
      setLoading(true);  // Set loading to true before starting the query
      const query = searchQuery ? `?q=${searchQuery}` : '';
      await router.push('/projects/grid' + query);
    } catch (e) {
      setLoading(false);
      toast.error("Something went wrong...")
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
      <div className="relative w-full">
        {loading ? <Spinner className="absolute cursor-pointer hover:text-foreground w-5 h-5 top-0 bottom-0 my-auto text-gray-500 mx-2"/> :
            <SearchIcon onClick={handleSearch}
                        className="absolute cursor-pointer hover:text-foreground top-0 bottom-0 w-6 h-6 my-auto text-gray-500 mx-2"/>}
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
