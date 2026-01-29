'use client'

import React from "react"

import { useState } from 'react'
import { uploadSnippet } from '@/app/actions/snippets'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'

const LANGUAGES = [
  'javascript',
  'typescript',
  'python',
  'java',
  'cpp',
  'csharp',
  'php',
  'ruby',
  'go',
  'rust',
  'html',
  'css',
  'sql',
  'bash',
  'json',
  'xml',
  'yaml',
]

export function UploadForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    code: '',
    language: 'javascript',
    isPublic: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await uploadSnippet(
        formData.title,
        formData.description,
        formData.code,
        formData.language,
        formData.isPublic
      )

      if (result.error) {
        alert('Error: ' + result.error)
      } else {
        alert('Snippet uploaded successfully!')
        setFormData({
          title: '',
          description: '',
          code: '',
          language: 'javascript',
          isPublic: true,
        })
        router.push('/dashboard')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Judul Snippet</label>
        <Input
          className="glass-input"
          placeholder="Masukkan judul snippet"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Deskripsi</label>
        <Textarea
          className="glass-input"
          placeholder="Masukkan deskripsi (opsional)"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Bahasa</label>
          <select
            className="glass-input w-full"
            value={formData.language}
            onChange={(e) =>
              setFormData({ ...formData, language: e.target.value })
            }
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isPublic}
              onChange={(e) =>
                setFormData({ ...formData, isPublic: e.target.checked })
              }
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">Public</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Kode</label>
        <textarea
          className="glass-input w-full font-mono text-sm"
          placeholder="Paste your code here..."
          value={formData.code}
          onChange={(e) =>
            setFormData({ ...formData, code: e.target.value })
          }
          rows={12}
          required
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading ? 'Uploading...' : 'Upload Snippet'}
      </Button>
    </form>
  )
}
