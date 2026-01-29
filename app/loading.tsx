export default function Loading() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Skeleton */}
        <div className="glass-lg p-8 mb-8 animate-pulse">
          <div className="space-y-4">
            <div className="h-8 bg-white/10 dark:bg-white/5 rounded w-1/3" />
            <div className="h-4 bg-white/10 dark:bg-white/5 rounded w-1/4" />
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="glass-lg p-6 animate-pulse space-y-4">
              <div className="h-6 bg-white/10 dark:bg-white/5 rounded w-2/3" />
              <div className="h-4 bg-white/10 dark:bg-white/5 rounded" />
              <div className="h-4 bg-white/10 dark:bg-white/5 rounded w-5/6" />
              <div className="flex gap-2">
                <div className="h-6 bg-white/10 dark:bg-white/5 rounded px-3 w-20" />
                <div className="h-6 bg-white/10 dark:bg-white/5 rounded-full w-5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
