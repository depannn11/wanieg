'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy, Download, Eye, Code } from 'lucide-react'

interface CodeViewerProps {
  code: string
  language: string
  title: string
  showLanguageTag?: boolean
}

export function CodeViewer({
  code,
  language,
  title,
  showLanguageTag = true,
}: CodeViewerProps) {
  const [view, setView] = useState<'editor' | 'raw'>('editor')
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob([code], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `${title}.${getFileExtension(language)}`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const getFileExtension = (lang: string) => {
    const extensions: { [key: string]: string } = {
      javascript: 'js',
      typescript: 'ts',
      python: 'py',
      java: 'java',
      cpp: 'cpp',
      csharp: 'cs',
      php: 'php',
      ruby: 'rb',
      go: 'go',
      rust: 'rs',
      html: 'html',
      css: 'css',
      sql: 'sql',
      bash: 'sh',
      json: 'json',
      xml: 'xml',
      yaml: 'yaml',
    }
    return extensions[lang] || 'txt'
  }

  return (
    <div className="glass-lg space-y-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 dark:border-white/5">
        <div className="flex items-center gap-3">
          {showLanguageTag && (
            <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full">
              {language.toUpperCase()}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setView(view === 'editor' ? 'raw' : 'editor')}
            title={view === 'editor' ? 'Switch to Raw' : 'Switch to Editor'}
            className="hover:bg-white/20 dark:hover:bg-white/10"
          >
            {view === 'editor' ? (
              <Eye className="w-4 h-4" />
            ) : (
              <Code className="w-4 h-4" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            title="Copy to clipboard"
            className="hover:bg-white/20 dark:hover:bg-white/10"
          >
            <Copy className="w-4 h-4" />
            {copied && <span className="ml-1 text-xs">Copied!</span>}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleDownload}
            title="Download file"
            className="hover:bg-white/20 dark:hover:bg-white/10"
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Code Display */}
      <div className="p-4 bg-black/20 dark:bg-black/40 rounded-lg overflow-auto max-h-96">
        {view === 'raw' ? (
          <pre className="text-foreground/90 text-xs md:text-sm font-mono leading-relaxed whitespace-pre-wrap break-words">
            {code}
          </pre>
        ) : (
          <pre className="text-foreground/90 text-xs md:text-sm font-mono leading-relaxed overflow-x-auto">
            <code>{code}</code>
          </pre>
        )}
      </div>

      {/* Info */}
      <div className="px-4 pb-4 text-xs text-foreground/60 flex justify-between">
        <span>{code.split('\n').length} lines</span>
        <span>{(code.length / 1024).toFixed(2)} KB</span>
      </div>
    </div>
  )
}
