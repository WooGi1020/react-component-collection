import Button from "@/components/Button";
import useUiStore from "@/store/useUiStore";
import { Menu, Loader2 } from "lucide-react";

export default function ButtonPage() {
  const addToast = useUiStore((s) => s.addToast);

  return (
    <section>
      <h1>공통 버튼 컴포넌트</h1>
      <div className="mt-4 flex flex-col gap-4 lg:flex-row">
        <Button
          className="max-w-20"
          onClick={() =>
            addToast("버튼 클릭됨!", "success", "top-center", 1000)
          }
        >
          버튼
        </Button>
        <Button
          variant="danger"
          onClick={() => addToast("버튼 클릭됨!", "error", "top-center", 1000)}
        >
          버튼
        </Button>
        <Button
          variant="secondary"
          className="whitespace-nowrap"
          onClick={() => addToast("버튼 클릭됨!", "info", "top-center", 1000)}
        >
          넓고 회색인 버튼
        </Button>
        <Button isLoading>
          <Loader2 className="animate-spin" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-fit"
          onClick={() => alert("아이콘 버튼 클릭됨!")}
        >
          <Menu className="size-6" />
        </Button>
      </div>
    </section>
  );
}
