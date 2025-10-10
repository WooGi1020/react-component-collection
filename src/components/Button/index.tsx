// ...existing code...
import clsx from "clsx";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: "primary" | "secondary" | "icon";
  isLoading?: boolean;
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    className,
    variant = "primary",
    isLoading = false,
    disabled,
    type,
    onClick,
    ...props
  },
  ref
) {
  const isDisabled = disabled || isLoading;

  const base =
    "rounded cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 outline-none min-w-fit flex items-center justify-center";
  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary:
      "px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700",
    secondary:
      "px-4 py-2  bg-gray-500 text-white hover:bg-gray-600 active:bg-gray-700",
    icon: "p-2 rounded-full p-2 bg-transparent hover:bg-gray-100 active:bg-gray-200",
  };

  const classes = clsx(
    base,
    variants[variant],
    isDisabled && "opacity-60 cursor-not-allowed pointer-events-none",
    className
  );

  return (
    <button
      ref={ref}
      type={type ?? "button"}
      className={classes}
      aria-label="Button"
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      {...props}
      onClick={(e) => {
        if (isDisabled) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        onClick?.(e);
      }}
    >
      {children}
    </button>
  );
});

export default Button;
// ...existing code...
