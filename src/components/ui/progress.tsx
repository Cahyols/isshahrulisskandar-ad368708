
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    indicatorColor?: string;
  }
>(({ className, value, indicatorColor, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-slate-800/50",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn("h-full w-full flex-1 transition-all", indicatorColor || "bg-blue-500")}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
    <div className="absolute top-0 h-full w-full opacity-30 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse-glow pointer-events-none"></div>
    <div className="absolute h-[1px] bottom-0 left-0 w-full bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent"></div>
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
