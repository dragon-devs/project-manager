'use client'
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {useRouter, useSearchParams} from "next/navigation";
import {IconButton} from "@radix-ui/themes";
import {Button} from "@/components/ui/button";
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from "@radix-ui/react-icons";
import {ArrowLeft} from "lucide-react";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}


const PaginationPage = ({itemCount, pageSize, currentPage}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize)
  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push("?" + params.toString());
  }

  return (
      <div>
        <Pagination>
          <PaginationContent className="flex justify-between gap-5">
            <PaginationItem>Page {currentPage} of {pageCount}</PaginationItem>
            <PaginationItem className="flex gap-1">
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
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
  );
};

export default PaginationPage;
