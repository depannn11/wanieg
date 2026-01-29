import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, User, Mail, Calendar } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { id } from 'date-fns/locale'

async function getProfile() {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/auth/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return { user, profile }
}

export default async function ProfilePage() {
  const { user, profile } = await getProfile()

  const joinedDate = formatDistanceToNow(new Date(user.created_at || ''), {
    locale: id,
    addSuffix: true,
  })

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <Link href="/dashboard">
          <Button variant="ghost" className="gap-2 mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="space-y-8">
          {/* Profile Header */}
          <div className="glass-lg p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  My Profile
                </h1>
                <p className="text-foreground/60">
                  Manage your account settings
                </p>
              </div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
                <User className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/70">
                  Email
                </label>
                <div className="glass p-3 rounded-lg flex items-center gap-2">
                  <Mail className="w-4 h-4 text-foreground/50" />
                  <span className="text-foreground">{user.email}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/70">
                  Username
                </label>
                <Input
                  defaultValue={profile?.username || ''}
                  disabled
                  className="glass-input"
                  placeholder="No username set"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/70">
                  Joined
                </label>
                <div className="glass p-3 rounded-lg flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-foreground/50" />
                  <span className="text-foreground">{joinedDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Account Statistics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-lg p-6 text-center">
              <div className="text-2xl font-bold text-primary">
                {profile?.snippet_count || 0}
              </div>
              <p className="text-foreground/60 text-sm mt-1">
                Total Snippets
              </p>
            </div>
            <div className="glass-lg p-6 text-center">
              <div className="text-2xl font-bold text-primary">
                {profile?.public_count || 0}
              </div>
              <p className="text-foreground/60 text-sm mt-1">
                Public Snippets
              </p>
            </div>
          </div>

          {/* Account Actions */}
          <div className="glass-lg p-8 space-y-4">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Account Settings
            </h2>

            <form action="/auth/logout" method="POST">
              <Button
                variant="destructive"
                className="w-full"
              >
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
