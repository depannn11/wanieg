'use server'

import { createClient } from '@/lib/supabase/server'

export async function uploadSnippet(
  title: string,
  description: string,
  code: string,
  language: string,
  isPublic: boolean
) {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: 'Unauthorized' }
  }

  const { data, error } = await supabase
    .from('snippets')
    .insert({
      user_id: user.id,
      title,
      description,
      code,
      language,
      is_public: isPublic,
    })
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  return { data }
}

export async function getSnippets(limit = 10, offset = 0) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  let query = supabase
    .from('snippets')
    .select(
      'id, title, description, language, is_public, user_id, created_at, profiles(username)'
    )
    .order('created_at', { ascending: false })

  if (user) {
    query = query.or(
      `is_public.eq.true,user_id.eq.${user.id}`,
      { foreignTable: 'snippets' }
    )
  } else {
    query = query.eq('is_public', true)
  }

  const { data, error, count } = await query
    .range(offset, offset + limit - 1)
    .select()

  if (error) {
    return { error: error.message }
  }

  return { data, count }
}

export async function getSnippetById(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('snippets')
    .select('*, profiles(username)')
    .eq('id', id)
    .single()

  if (error) {
    return { error: error.message }
  }

  return { data }
}

export async function deleteSnippet(id: string) {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: 'Unauthorized' }
  }

  const { error: deleteError } = await supabase
    .from('snippets')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (deleteError) {
    return { error: deleteError.message }
  }

  return { success: true }
}

export async function updateSnippet(
  id: string,
  updates: {
    title?: string
    description?: string
    is_public?: boolean
  }
) {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: 'Unauthorized' }
  }

  const { data, error } = await supabase
    .from('snippets')
    .update(updates)
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  return { data }
}
