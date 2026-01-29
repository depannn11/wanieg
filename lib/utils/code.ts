// Language to file extension mapping
export const LANGUAGE_EXTENSIONS: Record<string, string> = {
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

// Get file extension for language
export function getFileExtension(language: string): string {
  return LANGUAGE_EXTENSIONS[language.toLowerCase()] || 'txt'
}

// Validate code snippet
export function validateSnippet(
  title: string,
  code: string,
  language: string
): { valid: boolean; error?: string } {
  if (!title || title.trim().length === 0) {
    return { valid: false, error: 'Title is required' }
  }

  if (title.length > 255) {
    return { valid: false, error: 'Title must be less than 255 characters' }
  }

  if (!code || code.trim().length === 0) {
    return { valid: false, error: 'Code is required' }
  }

  if (code.length > 1_000_000) {
    return { valid: false, error: 'Code is too large (max 1MB)' }
  }

  if (!Object.keys(LANGUAGE_EXTENSIONS).includes(language.toLowerCase())) {
    return { valid: false, error: 'Invalid programming language' }
  }

  return { valid: true }
}

// Sanitize snippet title for filename
export function sanitizeFilename(filename: string): string {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 100)
}

// Format file size
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

// Count lines in code
export function countLines(code: string): number {
  return code.split('\n').length
}

// Get code preview (first N lines)
export function getCodePreview(code: string, lines: number = 5): string {
  return code.split('\n').slice(0, lines).join('\n')
}
