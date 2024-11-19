import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface BlogCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const BlogCard = forwardRef<HTMLDivElement, BlogCardProps>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge(
        "relative overflow-hidden rounded-3xl bg-gray-800",
        "after:absolute after:inset-0 after:outline-2 after:outline after:-outline-offset-2 after:rounded-3xl after:outline-white/20 after:pointer-events-none",
        "before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/[0.08] before:to-transparent before:pointer-events-none",
        "hover:bg-gray-700 hover:after:outline-white/30 hover:-translate-y-1 transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
