
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingSkeletonsProps {
  isLoading: boolean;
  children: React.ReactNode;
  type?: "project" | "skill" | "experience" | "education" | "default";
}

const LoadingSkeletons = ({ isLoading, children, type = "default" }: LoadingSkeletonsProps) => {
  if (!isLoading) return <>{children}</>;
  
  switch (type) {
    case "project":
      return (
        <div className="w-full rounded-lg overflow-hidden">
          <Skeleton className="w-full h-56" />
          <div className="p-4 space-y-3">
            <Skeleton className="h-7 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex gap-2 mt-4">
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-8 w-20 rounded-full" />
            </div>
          </div>
        </div>
      );
    
    case "skill":
      return (
        <div className="space-y-4">
          <Skeleton className="h-7 w-1/3" />
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-2 w-full" />
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-2 w-full" />
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-2 w-full" />
          </div>
        </div>
      );
    
    case "experience":
      return (
        <div className="space-y-8">
          <Skeleton className="h-8 w-1/3" />
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-6 w-2/5" />
                  <Skeleton className="h-5 w-1/4" />
                </div>
                <Skeleton className="h-5 w-3/5" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            ))}
          </div>
        </div>
      );
    
    case "education":
      return (
        <div className="space-y-6">
          <Skeleton className="h-8 w-1/3" />
          <div className="space-y-5">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-6 w-3/5" />
                <Skeleton className="h-5 w-2/5" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            ))}
          </div>
        </div>
      );
      
    default:
      return (
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      );
  }
};

export default LoadingSkeletons;
