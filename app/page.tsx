import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SnippetCard } from '@/components/snippet-card'
import { Code2, Share2, Lock, Zap, Github, LogIn } from 'lucide-react'

async function getPublicSnippets() {
  const supabase = await createClient()

  const { data: snippets } = await supabase
    .from('snippets')
    .select('id, title, description, language, is_public, created_at, profiles(username)')
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .limit(6)

  return snippets || []
}

async function getUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export default async function HomePage() {
  const snippets = await getPublicSnippets()
  const user = await getUser()

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 glass border-b border-white/10 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <Code2 className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">CodeShare</h1>
          </Link>

          <nav className="flex items-center gap-3">
            <Link href="/explore">
              <Button variant="ghost" size="sm">
                Explore
              </Button>
            </Link>
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="ghost" size="sm">
                    Profile
                  </Button>
                </Link>
                <Link href="/upload">
                  <Button size="sm" className="gap-2">
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="outline" size="sm">
                    <LogIn className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/auth/sign-up">
                  <Button size="sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Welcome to CodeShare</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
            Share Your Code,
            <span className="text-primary"> Collaborate Better</span>
          </h2>

          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Upload, manage, and share code snippets with beautiful syntax highlighting.
            Keep your collection organized and easily accessible.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {user ? (
              <Link href="/upload">
                <Button size="lg" className="gap-2">
                  <Code2 className="w-5 h-5" />
                  Upload Snippet
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/auth/sign-up">
                  <Button size="lg" className="gap-2">
                    <Share2 className="w-5 h-5" />
                    Get Started
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Features */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">
          {[
            {
              icon: Code2,
              title: 'Multi-Language Support',
              description: 'Support untuk JavaScript, Python, Java, dan 15+ bahasa pemrograman lainnya',
            },
            {
              icon: Share2,
              title: 'Easy Sharing',
              description: 'Bagikan snippet publik dengan teman atau simpan sebagai private',
            },
            {
              icon: Lock,
              title: 'Secure & Private',
              description: 'Semua data tersimpan aman dengan enkripsi end-to-end di database',
            },
          ].map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="glass-lg p-6 space-y-3">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-foreground/60 text-sm">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Popular Snippets Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-foreground mb-2">
            Popular Snippets
          </h3>
          <p className="text-foreground/60">
            Browse code shared by our community
          </p>
        </div>

        {snippets.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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

            <div className="text-center">
              <Link href="/dashboard">
                <Button variant="outline" size="lg">
                  View All Snippets
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="glass-lg p-12 text-center">
            <p className="text-foreground/60 mb-4">
              No public snippets yet. Be the first to upload!
            </p>
            {!user && (
              <Link href="/auth/sign-up">
                <Button>Create Account</Button>
              </Link>
            )}
          </div>
        )}
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="glass-lg p-12 md:p-16 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Ready to share your code?
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Join CodeShare today and start managing your code snippets effortlessly
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/auth/sign-up">
                <Button size="lg">Sign Up Now</Button>
              </Link>
              <Link href="/auth/login">
                <Button size="lg" variant="outline">
                  Already have an account? Login
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 dark:border-white/5 mt-20 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-foreground/60">
          <p>© 2025 CodeShare. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-foreground transition">
              Terms
            </a>
            <a href="#" className="hover:text-foreground transition">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
