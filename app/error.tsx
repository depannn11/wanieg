'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Home } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-background flex items-center justify-center p-6">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/20">
          <AlertTriangle className="w-8 h-8 text-destructive" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Oops! Something went wrong
          </h1>
          <p className="text-foreground/60">
            An unexpected error occurred. Please try again.
          </p>
        </div>

        <div className="space-y-3">
          <Button onClick={reset} className="w-full">
            Try Again
          </Button>
          <Link href="/" className="block">
            <Button variant="outline" className="w-full gap-2 bg-transparent">
              <Home className="w-4 h-4" />
              Go to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
