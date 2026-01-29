import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { error: deleteError } = await supabase
    .from('snippets')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (deleteError) {
    return Response.json({ error: deleteError.message }, { status: 400 })
  }

  redirect('/dashboard')
}
