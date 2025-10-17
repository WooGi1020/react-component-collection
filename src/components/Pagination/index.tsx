import { useMemo } from "react";
import Button from "../Button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import clsx from "clsx";

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  isLoading,
}: {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}) {
  const PAGES_PER_GROUP = 5;

  const groupPages = useMemo(() => {
    const pagesArr = Array.from({ length: totalPages }, (_, i) => i + 1);
    return Array.from(
      { length: Math.ceil(totalPages / PAGES_PER_GROUP) },
      (_, i) => pagesArr.slice(i * PAGES_PER_GROUP, (i + 1) * PAGES_PER_GROUP)
    );
  }, [totalPages]);

  const currentGroupIndex = Math.floor((currentPage - 1) / PAGES_PER_GROUP);
  const currentGroup = groupPages[currentGroupIndex];

  const prevGroupFirst = groupPages[currentGroupIndex - 1]?.[0] ?? 1;
  const nextGroupFirst = groupPages[currentGroupIndex + 1]?.[0] ?? totalPages;

  const pageButtonClass = (p: number) =>
    clsx("rounded-full size-8", currentPage === p && "bg-blue-600");

  return (
    <div
      className={clsx(
        "flex items-center justify-between w-fit gap-3",
        isLoading && "opacity-70 pointer-events-none"
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onPageChange(prevGroupFirst)}
        disabled={currentGroupIndex === 0}
      >
        <ChevronsLeft className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="size-4" />
      </Button>

      {currentGroup.map((p) => (
        <Button
          key={p}
          onClick={() => onPageChange(p)}
          variant="primary"
          size="icon"
          className={pageButtonClass(p)}
        >
          {p}
        </Button>
      ))}

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onPageChange(nextGroupFirst)}
        disabled={currentGroupIndex === groupPages.length - 1}
      >
        <ChevronsRight className="size-4" />
      </Button>
    </div>
  );
}
