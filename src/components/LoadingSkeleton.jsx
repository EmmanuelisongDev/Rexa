import Skeleton from "react-loading-skeleton";

export const LoadingSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((_, i) => (
      <div key={i} className="w-full h-full">
        <div className="h-full rounded-sm mb-2">
          <Skeleton className="h-full rounded-sm" />
        </div>
        <div>
          <Skeleton />
        </div>
      </div>
    ));
};

export default LoadingSkeleton;
