import clsx from "clsx";
import { motion } from "motion/react";
import { useEffect, type JSX } from "react";
import Button from "../Button";
import { X, CheckCircle, Info, AlertTriangle } from "lucide-react";

const TOAST_TYPE_CONFIG: Record<string, { base: string; icon: JSX.Element }> = {
  info: {
    base: "text-gray-500 border-2 border-blue-300",
    icon: <Info className="w-5 h-5 mr-2 stroke-blue-500" />,
  },
  success: {
    base: "text-gray-500 border-2 border-green-300",
    icon: <CheckCircle className="w-5 h-5 mr-2 stroke-green-500" />,
  },
  error: {
    base: "text-gray-500 border-2 border-red-300",
    icon: <AlertTriangle className="w-5 h-5 mr-2 stroke-red-500" />,
  },
};

const TOAST_COMMON =
  "min-w-[260px] w-full rounded-lg px-4 py-3 shadow-lg font-medium flex items-center justify-between bg-white";

export default function ToastItem({
  id,
  message,
  type = "info",
  duration = 3000,
  onClose,
}: {
  id: string;
  message: string;
  type?: keyof typeof TOAST_TYPE_CONFIG;
  duration?: number;
  onClose: (id: string) => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), duration);
    return () => clearTimeout(timer);
  }, [duration, onClose, id]);

  const config = TOAST_TYPE_CONFIG[type];

  return (
    <motion.div
      layout
      key={id}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{
        type: "spring",
        damping: 18,
        stiffness: 200,
        layout: { duration: 0.2, delay: 0 },
      }}
      className={clsx(TOAST_COMMON, config.base)}
    >
      <div className="flex items-center">
        {config.icon}
        <p className="select-none">{message}</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="p-1"
        onClick={() => onClose(id)}
      >
        <X className="w-4 h-4" />
      </Button>
    </motion.div>
  );
}
