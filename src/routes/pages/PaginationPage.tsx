import Pagination from "@/components/Pagination";
import { useSearchParams } from "react-router";

export default function PaginationPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page");

  const currentPage = page ? Number(page) : 1;

  const goToPage = (newPage: number) => {
    searchParams.set("page", String(newPage));
    setSearchParams(searchParams);
  };

  return (
    <section className="relative min-h-full">
      <h1>커스텀 페이지네이션 컴포넌트 페이지 : {searchParams.get("page")}</h1>
      <div className="w-fit mx-auto absolute left-1/2 -translate-x-1/2 bottom-0">
        <Pagination
          totalPages={14}
          currentPage={currentPage}
          onPageChange={goToPage}
        />
      </div>
    </section>
  );
}
