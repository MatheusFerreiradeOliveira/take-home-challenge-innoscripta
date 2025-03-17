import { cn } from "@/lib/utils";

function Skeleton({
  className,
  testId,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { testId?: string }) {
  return (
    <div
      data-testid={testId || ""}
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    />
  );
}

export { Skeleton };
