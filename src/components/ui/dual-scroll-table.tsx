import * as React from "react";
import { cn } from "@/lib/utils";

interface DualScrollTableProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const DualScrollTable = React.forwardRef<HTMLDivElement, DualScrollTableProps>(
  ({ className, children, ...props }, ref) => {
    const topScrollRef = React.useRef<HTMLDivElement>(null);
    const bottomScrollRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [contentWidth, setContentWidth] = React.useState(0);

    React.useEffect(() => {
      const updateWidth = () => {
        if (contentRef.current) {
          setContentWidth(contentRef.current.scrollWidth);
        }
      };

      updateWidth();

      const resizeObserver = new ResizeObserver(updateWidth);
      if (contentRef.current) {
        resizeObserver.observe(contentRef.current);
      }

      return () => resizeObserver.disconnect();
    }, [children]);

    const handleTopScroll = () => {
      if (topScrollRef.current && bottomScrollRef.current) {
        bottomScrollRef.current.scrollLeft = topScrollRef.current.scrollLeft;
      }
    };

    const handleBottomScroll = () => {
      if (topScrollRef.current && bottomScrollRef.current) {
        topScrollRef.current.scrollLeft = bottomScrollRef.current.scrollLeft;
      }
    };

    return (
      <div className={cn("relative", className)} ref={ref} {...props}>
        {/* Top scroll bar */}
        <div
          ref={topScrollRef}
          onScroll={handleTopScroll}
          className="overflow-x-auto overflow-y-hidden h-[18px] border-b border-border"
        >
          <div style={{ width: contentWidth, height: 1 }} />
        </div>

        {/* Content with bottom scroll bar */}
        <div
          ref={bottomScrollRef}
          onScroll={handleBottomScroll}
          className="overflow-x-auto"
        >
          <div ref={contentRef}>{children}</div>
        </div>
      </div>
    );
  }
);

DualScrollTable.displayName = "DualScrollTable";
