'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast, Toaster } from 'sonner'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      toast.error(error.message)
      setIsLoading(false)
    } else {
      window.location.href = '/dashboard'
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Toaster richColors />
      <form onSubmit={handleLogin} className="w-80 space-y-4 p-6 border rounded-lg">
        <h1 className="text-xl font-bold">Login</h1>
        <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <Button className="w-full" disabled={isLoading}>{isLoading ? 'Loading...' : 'Masuk'}</Button>
      </form>
    </div>
  )
}
