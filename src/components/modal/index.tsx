import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import useUiStore from "@/store/useUiStore";
import clsx from "clsx";
import Button from "../Button";
import { X } from "lucide-react";
import { useEffect, type KeyboardEvent } from "react";

export function ModalRoot() {
  const modals = useUiStore((s) => s.modals);
  const close = useUiStore((s) => s.closeModal);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };

    window.addEventListener("keydown", handleKeydown as any);
    return () => {
      window.removeEventListener("keydown", handleKeydown as any);
    };
  }, [close]);

  return createPortal(
    <AnimatePresence>
      {modals.map(({ id, component: Component, props }) => (
        <ModalWrapper key={id} id={id}>
          <Component {...props} />
        </ModalWrapper>
      ))}
    </AnimatePresence>,
    document.getElementById("modal-root")!
  );
}

function ModalWrapper({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const closeModal = useUiStore((s) => s.closeModal);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      key={id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={clsx(
        "fixed inset-0 z-[100] flex items-center justify-center px-2",
        "bg-black/40 backdrop-blur-sm",
        "pointer-events-none"
      )}
    >
      {/* 오버레이 */}
      <motion.div
        className="absolute inset-0 pointer-events-auto"
        onClick={(e) => {
          e.stopPropagation();
          closeModal(id);
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* 모달 콘텐츠 */}
      <motion.div
        className={clsx(
          "relative z-10 bg-white rounded-2xl shadow-xl pointer-events-auto",
          "min-w-sm w-full max-w-lg p-6",
          "border border-gray-100"
        )}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function ModalHeader({
  children,
  className,
  hasClose = true,
}: {
  children: React.ReactNode;
  className?: string;
  hasClose?: boolean;
}) {
  const close = useUiStore((s) => s.closeModal);

  return (
    <div className={clsx("flex items-center justify-between mb-7", className)}>
      <h2 className="text-lg font-semibold text-gray-900">{children}</h2>
      {hasClose && (
        <Button
          variant="icon"
          className="text-gray-500 hover:text-gray-700 relative bottom-4 left-4"
          onClick={() => close()}
        >
          <X className="size-5" />
        </Button>
      )}
    </div>
  );
}

export function ModalBody({ children }: { children: React.ReactNode }) {
  return <div className="overflow-y-auto max-h-60">{children}</div>;
}

export function ModalFooter({ children }: { children: React.ReactNode }) {
  return <div className="mt-6 flex justify-end gap-2 pt-4">{children}</div>;
}
