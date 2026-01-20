'use client';

export default function SkeletonLoader() {
  return (
    <div className="h-64 rounded-lg bg-gray-700 animate-pulse" />
  );
}

export function MovieCardSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-64 rounded-lg bg-gray-700 animate-pulse" />
      <div className="h-4 rounded bg-gray-700 animate-pulse" />
      <div className="h-4 rounded bg-gray-700 animate-pulse w-2/3" />
    </div>
  );
}

export function BannerSkeleton() {
  return <div className="h-96 md:h-screen bg-gray-700 animate-pulse rounded-lg" />;
}
