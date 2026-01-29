'use client'

import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { id } from 'date-fns/locale'
import { Globe, Lock } from 'lucide-react'

interface SnippetCardProps {
  id: string
  title: string
  description: string
  language: string
  isPublic: boolean
  createdAt: string
  username: string
}

export function SnippetCard({
  id,
  title,
  description,
  language,
  isPublic,
  createdAt,
  username,
}: SnippetCardProps) {
  const timeAgo = formatDistanceToNow(new Date(createdAt), { locale: id, addSuffix: true })

  return (
    <Link href={`/snippets/${id}`}>
      <div className="glass-lg p-6 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 cursor-pointer h-full">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground truncate">
              {title}
            </h3>
            <p className="text-sm text-foreground/60 truncate">
              by {username}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-semibold rounded">
              {language}
            </span>
            {isPublic ? (
              <Globe className="w-4 h-4 text-foreground/60" />
            ) : (
              <Lock className="w-4 h-4 text-foreground/60" />
            )}
          </div>
        </div>

        <p className="text-sm text-foreground/70 line-clamp-2 mb-4">
          {description || 'No description'}
        </p>

        <div className="text-xs text-foreground/50">
          {timeAgo}
        </div>
      </div>
    </Link>
  )
}
