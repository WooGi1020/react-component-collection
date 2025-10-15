import {
  autoUpdate,
  flip,
  shift,
  offset,
  useFloating,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  type Placement,
} from "@floating-ui/react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type TriggerRenderArgs = {
  open: boolean;
  ref: (node: HTMLElement | null) => void;
  props?: React.HTMLProps<HTMLElement>;
};

interface PopoverProps {
  trigger: React.ReactElement | ((args: TriggerRenderArgs) => React.ReactNode);
  children: React.ReactNode;
  placement?: Placement;
  customOffset?: number;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function Popover({
  trigger,
  children,
  placement = "bottom",
  customOffset = 8,
  isOpen: controlledOpen,
  onOpenChange,
}: PopoverProps) {
  const isControlled = controlledOpen !== undefined;
  const [unControlledOpen, setUncontrolledOpen] = useState(false);
  const open = isControlled ? !!controlledOpen : unControlledOpen;

  const setOpen = (next: boolean) => {
    if (isControlled) onOpenChange?.(next);
    else setUncontrolledOpen(next);
  };

  const { x, y, refs, strategy, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    middleware: [offset(customOffset), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context, { toggle: true });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "dialog" });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const referenceProps = getReferenceProps({
    "aria-haspopup": "dialog",
    "aria-expanded": open,
  });

  return (
    <>
      {typeof trigger === "function" ? (
        trigger({
          open,
          ref: refs.setReference,
          ...referenceProps,
        })
      ) : (
        <span
          ref={refs.setReference}
          style={{ display: "inline-flex" }}
          tabIndex={0}
          role="button"
          {...referenceProps}
        >
          {trigger}
        </span>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            ref={refs.setFloating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            }}
            {...getFloatingProps()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
