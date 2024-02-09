'use client'
import React, {useTransition} from 'react';
import {PaginationContent,} from "@/components/ui/pagination"
import {useRouter, useSearchParams} from "next/navigation";
import {Button} from "@/components/ui/button";
import {ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon} from "@radix-ui/react-icons";
import Spinner from "@/components/Spinner";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}


const Pagination = ({itemCount, pageSize, currentPage}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, startTransition] = useTransition();

  const pageCount = Math.ceil(itemCount / pageSize)
  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    startTransition(() => {
      router.push("?" + params.toString());
    })
  }

  return (
      <div>
          <PaginationContent className="flex justify-between text-sm gap-5">
            <div className="flex gap-3 ">Page {currentPage} of {pageCount}
            </div>
            <div className="flex justify-center items-center gap-1 text-sm">
            {loading && <div className="pr-2">
              <Spinner className="h-5 w-5" />
            </div>}

              <Button
                  variant={"outline"}
                  disabled={currentPage === 1}
                  onClick={() => changePage(1)}
              ><DoubleArrowLeftIcon/></Button>
              <Button
                  variant={"outline"}
                  disabled={currentPage === 1}
                  onClick={() => changePage(currentPage - 1)}
              ><ChevronLeftIcon/></Button>
              <Button
                  variant={"outline"}
                  disabled={currentPage === pageCount}
                  onClick={() => changePage(currentPage + 1)}
              ><ChevronRightIcon/></Button>
              <Button
                  variant={"outline"}
                  disabled={currentPage === pageCount}
                  onClick={() => changePage(pageCount)}
              ><DoubleArrowRightIcon/>
              </Button>
            </div>
          </PaginationContent>
      </div>
  );
};

export default Pagination;
