import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  return (
    <Pagination>
      <PaginationPrevious
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        &lt;
      </PaginationPrevious>
      <PaginationContent>
        {getPages().map((page, index) =>
          typeof page === "number" ? (
            <PaginationItem key={index} isActive={page === currentPage}>
              <PaginationLink onClick={() => onPageChange(page)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ) : (
            <PaginationEllipsis key={index}>&hellip;</PaginationEllipsis>
          )
        )}
      </PaginationContent>
      <PaginationNext
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        &gt;
      </PaginationNext>
    </Pagination>
  );
};

export default CustomPagination;
