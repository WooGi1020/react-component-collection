import clsx from "clsx";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "default" | "icon";
  isLoading?: boolean;
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    className,
    variant = "primary",
    size = "default",
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
    "inline-flex items-center justify-center font-medium select-none cursor-pointer transition-transform active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";

  const variants = {
    primary:
      "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 disabled:opacity-60",
    secondary:
      "bg-gray-500 text-white hover:bg-gray-600 active:bg-gray-700 disabled:opacity-60",
    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50",
    danger:
      "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 disabled:opacity-60",
  };

  const sizes = {
    default: "w-auto min-w-fit px-4 py-2 text-sm rounded-md",
    icon: "inline-flex w-auto aspect-square p-2 rounded-full items-center justify-center",
  };

  const classes = clsx(
    base,
    variants[variant],
    sizes[size],
    isDisabled && "cursor-not-allowed pointer-events-none opacity-60",
    className
  );

  return (
    <button
      ref={ref}
      type={type ?? "button"}
      className={classes}
      aria-label={props["aria-label"] ?? "button"}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      onClick={(e) => {
        if (isDisabled) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;
