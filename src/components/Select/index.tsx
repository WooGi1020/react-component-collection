import { useState } from "react";
import Popover from "@/components/Popover";
import Button from "@/components/Button";
import clsx from "clsx";

type SelectOption = {
  label: string;
  value: string | number;
};

type SelectProps = {
  options: SelectOption[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
};

export default function Select({
  options,
  value,
  onChange,
  placeholder = "Select...",
}: SelectProps) {
  const selected = options.find((o) => o.value === value);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      placement="bottom-start"
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      trigger={({ open, ref, ...props }) => (
        <Button
          ref={ref}
          variant="ghost"
          className={clsx(
            "w-full max-w-[180px] flex border border-gray-200 ",
            open && "!bg-gray-200"
          )}
          {...props}
        >
          <span>{selected?.label ?? placeholder}</span>
        </Button>
      )}
    >
      <div className="min-w-[180px] rounded-lg bg-white shadow-md border border-gray-300 p-2 flex flex-col gap-2">
        {options.map((option) => (
          <Button
            variant="ghost"
            key={option.value}
            className={`w-full text-left px-4 py-2 hover:bg-gray-100 justify-start ${
              option.value === value ? "font-medium bg-gray-100" : ""
            }`}
            onClick={() => {
              onChange?.(option.value);
              setIsOpen(false);
            }}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </Popover>
  );
}
