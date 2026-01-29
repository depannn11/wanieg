import { createClient } from '@/lib/supabase/server'
import { Header } from '@/components/header'
import { SnippetCard } from '@/components/snippet-card'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

interface SearchParams {
  search?: string
  language?: string
}

async function getSnippets(searchParams: SearchParams) {
  const supabase = await createClient()
  const { search = '', language = '' } = searchParams

  let query = supabase
    .from('snippets')
    .select(
      'id, title, description, language, is_public, created_at, profiles(username)'
    )
    .eq('is_public', true)
    .order('created_at', { ascending: false })

  if (search) {
    query = query.ilike('title', `%${search}%`)
  }

  if (language) {
    query = query.eq('language', language)
  }

  const { data = [] } = await query.limit(50)

  return data
}

const LANGUAGES = [
  'all',
  'javascript',
  'typescript',
  'python',
  'java',
  'cpp',
  'html',
  'css',
  'sql',
  'bash',
]

export default async function ExplorePage({
  searchParams: rawSearchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const searchParams = await rawSearchParams
  const snippets = await getSnippets(searchParams)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-background">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-3">
              Explore Snippets
            </h1>
            <p className="text-foreground/60">
              Discover code shared by our community
            </p>
          </div>

          {/* Search and Filters */}
          <div className="glass-lg p-6 mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/50" />
              <Input
                type="search"
                placeholder="Search snippets..."
                defaultValue={searchParams.search}
                className="glass-input pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {LANGUAGES.map((lang) => (
                <a
                  key={lang}
                  href={
                    lang === 'all'
                      ? '/explore'
                      : `/explore?language=${lang}`
                  }
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    (lang === 'all' && !searchParams.language) ||
                    searchParams.language === lang
                      ? 'bg-primary text-primary-foreground'
                      : 'glass hover:bg-white/20 dark:hover:bg-white/10'
                  }`}
                >
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </a>
              ))}
            </div>
          </div>

          {/* Snippets Grid */}
          {snippets.length > 0 ? (
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
          ) : (
            <div className="glass-lg p-12 text-center">
              <p className="text-foreground/60 mb-4">
                No snippets found. Try a different search.
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
