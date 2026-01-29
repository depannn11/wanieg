'use client';

import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CodeViewer } from '@/components/code-viewer'
import { ArrowLeft, Edit2, Trash2, Globe, Lock } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { id } from 'date-fns/locale'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

async function getSnippet(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('snippets')
    .select('*, profiles(username)')
    .eq('id', id)
    .single()

  if (error || !data) {
    return null
  }

  return data
}

export default async function SnippetPage({ params }: PageProps) {
  const { id } = await params
  const snippet = await getSnippet(id)

  if (!snippet) {
    notFound()
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isOwner = user?.id === snippet.user_id
  const timeAgo = formatDistanceToNow(new Date(snippet.created_at), {
    locale: id,
    addSuffix: true,
  })

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <Link href="/dashboard" className="inline-block mb-6">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </Link>

        {/* Snippet Info */}
        <div className="glass-lg p-8 mb-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {snippet.title}
              </h1>
              <p className="text-foreground/60 mb-4">
                by <span className="font-semibold text-foreground">
                  {snippet.profiles?.username || 'Anonymous'}
                </span> • {timeAgo}
              </p>
              {snippet.description && (
                <p className="text-foreground/70 mb-4">
                  {snippet.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-semibold rounded-full">
                  {snippet.language.toUpperCase()}
                </span>
                <span className="flex items-center gap-1 text-sm text-foreground/60">
                  {snippet.is_public ? (
                    <>
                      <Globe className="w-4 h-4" />
                      Public
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Private
                    </>
                  )}
                </span>
              </div>
            </div>

            {isOwner && (
              <div className="flex items-center gap-2">
                <Link href={`/snippets/${snippet.id}/edit`}>
                  <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                </Link>
                <form action={`/api/snippets/${snippet.id}/delete`} method="POST">
                  <Button
                    size="sm"
                    variant="destructive"
                    className="gap-2"
                    onClick={(e) => {
                      if (!confirm('Are you sure?')) {
                        e.preventDefault()
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Code Viewer */}
        <CodeViewer
          code={snippet.code}
          language={snippet.language}
          title={snippet.title}
          showLanguageTag={true}
        />
      </div>
    </main>
  )
}
