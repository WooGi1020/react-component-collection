import Button from "@/components/Button";
import useUiStore from "@/store/useUiStore";

export default function ToastPage() {
  const addToast = useUiStore((s) => s.addToast);

  return (
    <section>
      <h1 className="mb-2">커스텀 토스트 컴포넌트</h1>
      <div className="mt-4 flex flex-col gap-4 lg:flex-row">
        <Button
          className="max-w-20 bg-green-500 hover:bg-green-600 active:bg-green-700 "
          onClick={() =>
            addToast("버튼 클릭됨!", "success", "top-center", 1000)
          }
        >
          버튼
        </Button>
        <Button
          className="max-w-20 bg-red-500 hover:bg-red-600 active:bg-red-700 "
          onClick={() =>
            addToast("버튼 클릭됨!", "error", "bottom-right", 1000)
          }
        >
          버튼
        </Button>
        <Button
          className="max-w-20 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 "
          onClick={() => addToast("버튼 클릭됨!", "info", "bottom-left", 1000)}
        >
          넓고 회색인 버튼
        </Button>
      </div>
    </section>
  );
}
