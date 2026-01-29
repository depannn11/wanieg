import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { UploadForm } from '@/components/upload-form'
import { ArrowLeft } from 'lucide-react'

export default async function UploadPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/auth/login')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" className="gap-2 mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Upload New Snippet
          </h1>
          <p className="text-foreground/60">
            Share your code with the world
          </p>
        </div>

        {/* Form */}
        <div className="glass-lg p-8">
          <UploadForm />
        </div>

        {/* Tips */}
        <div className="glass p-6 mt-8 rounded-xl space-y-3">
          <h3 className="font-semibold text-foreground">💡 Tips:</h3>
          <ul className="text-sm text-foreground/70 space-y-2">
            <li>• Keep your snippet title short and descriptive</li>
            <li>• Choose the correct language for syntax highlighting</li>
            <li>• Mark as Public to share with others, Private to keep it personal</li>
            <li>• You can always edit or delete your snippets later</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
