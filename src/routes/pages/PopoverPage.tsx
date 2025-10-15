import Button from "@/components/Button";
import Popover from "@/components/Popover";
import clsx from "clsx";

export default function PopoverPage() {
  return (
    <section>
      <h1 className="mb-2">공통 팝오버 컴포넌트</h1>
      <Popover
        placement="bottom-start"
        trigger={({ open, ref, ...props }) => (
          <Button
            ref={ref}
            variant="ghost"
            size="icon"
            className={clsx(
              "relative size-10 rounded-full transition",
              open && "ring-2 ring-blue-500"
            )}
            {...props}
          >
            <img
              src="https://i.pravatar.cc/100"
              alt="User Avatar"
              className="absolute inset-0 size-full rounded-full object-cover"
            />
          </Button>
        )}
      >
        <div className="min-w-[180px] max-w-[250px] rounded-lg bg-white p-2 shadow-md border border-gray-300">
          <div className="flex items-center gap-3 p-2">
            <img
              src="https://i.pravatar.cc/100"
              alt="User Avatar"
              className="size-10 rounded-full object-cover"
            />
            <div className="flex flex-col text-sm truncate">
              <span className="font-medium">우기 정</span>
              <p className="text-gray-500">dev@example.comddddddddddddddddd</p>
            </div>
          </div>

          <hr className="my-2 border-gray-200" />

          <ul className="flex flex-col text-sm">
            <li>
              <Button
                variant="ghost"
                className="w-full justify-start rounded-md px-3 py-2 hover:bg-gray-100"
              >
                내 프로필
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="w-full justify-start rounded-md px-3 py-2 hover:bg-gray-100"
              >
                설정
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="w-full justify-start rounded-md px-3 py-2 text-red-500 hover:bg-red-50 active:bg-red-50"
              >
                로그아웃
              </Button>
            </li>
          </ul>
        </div>
      </Popover>
    </section>
  );
}
