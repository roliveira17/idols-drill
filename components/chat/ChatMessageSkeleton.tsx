'use client'

export function ChatMessageSkeleton() {
  return (
    <div className="flex gap-3 animate-pulse">
      {/* Avatar skeleton */}
      <div className="w-8 h-8 rounded-full bg-muted shrink-0" />

      {/* Content skeleton */}
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-5/6" />
      </div>
    </div>
  )
}
