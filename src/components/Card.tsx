import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge("bg-gray-800 rounded-3xl relative z-0 overflow-hidden after:z-10 after:content-[''] " +
        "after:absolute after:inset-0 after:outline-2 after:outline after:-outline-offset-2 after:rounded-3xl " +
        "after:outline-white/20 after:pointer-events-none", className)
      }
      {...props}
    >
      {children}
    </div>
  );
});