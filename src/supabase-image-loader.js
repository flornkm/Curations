const projectId = 'kgegnkneswpseuejfbit' // your supabase project id

export default function supabaseLoader({ src, width, quality }) {
  return `https://${projectId}.supabase.co/storage/v1/object/public/images/${src}?width=${width}&quality=${quality || 75}`
}
