import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SnippetCard } from '@/components/snippet-card'
import { Upload, LogOut } from 'lucide-react'

async function getUserSnippets() {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/auth/login')
  }

  const { data: snippets, error } = await supabase
    .from('snippets')
    .select('id, title, description, language, is_public, created_at, profiles(username)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return { user, snippets: snippets || [], error }
}

export default async function DashboardPage() {
  const { user, snippets } = await getUserSnippets()

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      {/* Header */}
      <div className="glass-lg m-6 p-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Dashboard
            </h1>
            <p className="text-foreground/60 mt-2">
              Welcome back! You have {snippets.length} snippet{snippets.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-end">
            <Link href="/explore">
              <Button variant="outline" className="gap-2 bg-transparent">
                Explore
              </Button>
            </Link>
            <Link href="/upload">
              <Button className="gap-2">
                <Upload className="w-4 h-4" />
                Upload
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost" className="gap-2">
                Profile
              </Button>
            </Link>
            <form action="/auth/logout" method="POST">
              <Button variant="outline" className="gap-2 bg-transparent">
                <LogOut className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 mb-8">
        <div className="glass-lg p-6 text-center">
          <div className="text-3xl font-bold text-primary">
            {snippets.length}
          </div>
          <p className="text-foreground/60 text-sm mt-1">
            Your Snippets
          </p>
        </div>
        <div className="glass-lg p-6 text-center">
          <div className="text-3xl font-bold text-primary">
            {snippets.filter((s: any) => s.is_public).length}
          </div>
          <p className="text-foreground/60 text-sm mt-1">
            Public Snippets
          </p>
        </div>
        <div className="glass-lg p-6 text-center">
          <div className="text-3xl font-bold text-primary">
            {snippets.filter((s: any) => !s.is_public).length}
          </div>
          <p className="text-foreground/60 text-sm mt-1">
            Private Snippets
          </p>
        </div>
      </div>

      {/* Snippets Grid */}
      <div className="px-6 pb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Your Snippets
        </h2>

        {snippets.length === 0 ? (
          <div className="glass-lg p-12 text-center">
            <p className="text-foreground/60 mb-4">
              You haven't created any snippets yet
            </p>
            <Link href="/upload">
              <Button>Create Your First Snippet</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {snippets.map((snippet: any) => (
              <SnippetCard
                key={snippet.id}
                id={snippet.id}
                title={snippet.title}
                description={snippet.description}
                language={snippet.language}
                isPublic={snippet.is_public}
                createdAt={snippet.created_at}
                username={snippet.profiles?.username || 'Anonymous'}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
