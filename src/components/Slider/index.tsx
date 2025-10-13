import { useEffect, useRef, useState } from "react";
import { MoveLeftIcon, MoveRightIcon } from "lucide-react";
import Button from "../Button";
import useEventKeeper from "@/hooks/useEventKeeper";

export default function Slider({
  arr,
  w,
  threshold,
}: {
  arr: { id: number; src: string; alt: string }[];
  w: number;
  threshold: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemWidthRef = useRef(w);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const isEventing = useEventKeeper(containerRef, "scroll");

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const observer = new ResizeObserver(([entry]) => {
      const newWidth = entry.contentRect.width;
      itemWidthRef.current = newWidth;
      container.scrollLeft = currentIndex * newWidth;
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [currentIndex]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    if (containerRef.current) {
      setScrollStart(containerRef.current.scrollLeft);
      containerRef.current.style.scrollBehavior = "auto";
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const walk = startX - e.clientX;
    containerRef.current.scrollLeft = scrollStart + walk;
  };

  const handleMouseUp = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const walk = scrollStart - container.scrollLeft;
    let newIndex = currentIndex;

    if (walk < -threshold) newIndex += 1;
    else if (walk > threshold) newIndex -= 1;

    newIndex = Math.max(0, Math.min(arr.length - 1, newIndex));
    setCurrentIndex(newIndex);

    container.style.scrollBehavior = "smooth";
    container.scrollTo({
      left: newIndex * itemWidthRef.current,
    });

    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (isDragging) handleMouseUp();
  };

  // 버튼 눌러서 이동
  const handleSlide = (direction: "left" | "right") => {
    if (!containerRef.current || isEventing) return;

    const newIndex =
      direction === "left"
        ? Math.max(0, currentIndex - 1)
        : Math.min(arr.length - 1, currentIndex + 1);

    setCurrentIndex(newIndex);
    containerRef.current.scrollTo({
      left: newIndex * itemWidthRef.current,
    });
  };

  return (
    <div className="relative w-fit">
      <Button
        size="icon"
        variant="ghost"
        className="shadow-md hover:shadow-lg cursor-pointer p-2 rounded-3xl absolute top-1/2 translate-y-[-50%] z-20 left-3 bg-white/80"
        onClick={() => handleSlide("left")}
      >
        <MoveLeftIcon size={15} />
      </Button>

      <div
        ref={containerRef}
        style={{ maxWidth: w }}
        className={`min-w-[300px] w-full flex overflow-x-auto rounded-3xl cursor-grab scroll-smooth scrollbar-hide`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {arr.map((picture) => (
          <img
            key={picture.id}
            src={picture.src}
            alt={`슬라이드 ${picture.alt}`}
            className="w-full select-none object-cover"
            draggable={false}
          />
        ))}
      </div>

      <Button
        size="icon"
        variant="ghost"
        className="shadow-md hover:shadow-lg cursor-pointer p-2 rounded-3xl absolute top-1/2 translate-y-[-50%] z-20 right-3 bg-white/80"
        onClick={() => handleSlide("right")}
      >
        <MoveRightIcon size={15} />
      </Button>
    </div>
  );
}
