import {
  forwardRef,
  useState,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  type ReactNode,
} from "react";
import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";
import Button from "../Button";

type CommonProps = {
  label?: string;
  helpText?: string;
  error?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  as?: "input" | "textarea";
  hideLabel?: boolean;
};

type InputProps = CommonProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "size"> &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size">;

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (
    {
      id,
      label,
      hideLabel = false,
      helpText,
      error,
      startIcon,
      endIcon,
      as = "input",
      type = "text",
      required,
      className,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const describedBy =
      [error ? `${id}-error` : null, helpText ? `${id}-help` : null]
        .filter(Boolean)
        .join(" ") || undefined;

    const base =
      "block w-full rounded-md border transition-all placeholder:text-gray-400 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-50 read-only:bg-gray-50 resize-none px-3 py-2 text-sm";

    const borderState = error
      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500";

    const withIconsPadding = clsx(startIcon && "pl-8", endIcon && "pr-8");

    const inputClass = clsx(base, borderState, withIconsPadding, className);

    const isPassword = type === "password";
    const actualType = isPassword ? (showPassword ? "text" : "password") : type;

    const FieldTag = as === "textarea" ? "textarea" : "input";

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className={clsx(
              "mb-1 inline-flex items-center gap-1 font-medium text-gray-700",
              hideLabel && "sr-only"
            )}
          >
            {label}
            {required && (
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative">
          {startIcon && (
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              {startIcon}
            </span>
          )}

          <FieldTag
            id={id}
            ref={ref as any}
            type={FieldTag === "input" ? actualType : undefined}
            required={required}
            aria-invalid={!!error || undefined}
            aria-describedby={describedBy}
            className={inputClass}
            {...props}
          />

          {/* password toggle */}
          {isPassword && (
            <Button
              variant="ghost"
              size="icon"
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-1 top-1/2 -translate-y-1/2 group"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4 stroke-gray-500 group-hover:stroke-gray-800" />
              ) : (
                <Eye className="w-4 h-4 stroke-gray-500 group-hover:stroke-gray-800" />
              )}
            </Button>
          )}

          {/* endIcon */}
          {!isPassword && endIcon && (
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              {endIcon}
            </span>
          )}
        </div>

        {error ? (
          <p id={`${id}-error`} className="mt-1 text-xs text-red-600">
            {error}
          </p>
        ) : helpText ? (
          <p id={`${id}-help`} className="mt-1 text-xs text-gray-500">
            {helpText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
