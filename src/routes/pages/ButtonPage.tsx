import Button from "@/components/Button";
import { Menu, Loader2 } from "lucide-react";

export default function ButtonPage() {
  return (
    <section>
      <h1>공통 버튼 컴포넌트</h1>
      <div className="mt-4 flex gap-4">
        <Button onClick={() => alert("버튼 클릭됨!")}>버튼</Button>
        <Button
          variant="secondary"
          className="w-64"
          onClick={() => alert("버튼 클릭됨!")}
        >
          넓고 회색인 버튼
        </Button>
        <Button isLoading className="w-64">
          <Loader2 className="animate-spin" />
        </Button>
        <Button variant="icon" onClick={() => alert("아이콘 버튼 클릭됨!")}>
          <Menu />
        </Button>
      </div>
    </section>
  );
}
