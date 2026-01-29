import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-background flex items-center justify-center p-6">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted">
          <Search className="w-8 h-8 text-muted-foreground" />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            404
          </h1>
          <p className="text-foreground/60">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-3">
          <Link href="/" className="block">
            <Button className="w-full gap-2">
              <Home className="w-4 h-4" />
              Go to Homepage
            </Button>
          </Link>
          <Link href="/explore" className="block">
            <Button variant="outline" className="w-full bg-transparent">
              Browse Snippets
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
