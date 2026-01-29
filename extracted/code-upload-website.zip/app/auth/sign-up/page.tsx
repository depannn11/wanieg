'use client'

import React, { useState } from "react"
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { Code2 } from 'lucide-react'
import { toast, Toaster } from 'sonner' // Pakai sonner untuk pop-up

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (password !== repeatPassword) {
      toast.error('Password tidak cocok!')
      setIsLoading(false)
      return
    }

    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Ini link yang akan diklik user di email mereka
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    setIsLoading(false)

    if (error) {
      toast.error(error.message)
      return
    }

    // Jika konfirmasi email NYALA di Supabase:
    if (data.user && data.session === null) {
      toast.success('Cek email kamu untuk aktivasi akun!', {
        duration: 5000,
      })
    } else {
      // Jika konfirmasi email MATI:
      toast.success('Pendaftaran berhasil!')
      window.location.href = '/dashboard'
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-background">
      <Toaster richColors position="top-center" /> 
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <Code2 className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold">CodeShare</span>
          </Link>
          <h1 className="text-2xl font-bold">Buat Akun</h1>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4 p-6 border rounded-xl bg-card">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Konfirmasi Password</Label>
            <Input type="password" required value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Mengirim email...' : 'Daftar'}
          </Button>
        </form>
      </div>
    </main>
  )
}
