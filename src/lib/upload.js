
import { supabase } from './supabase'

export async function uploadToBucket(bucket, path, file) {
  const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true })
  if (error) throw error
  const { data } = await supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}
