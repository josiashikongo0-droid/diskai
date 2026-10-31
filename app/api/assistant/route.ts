import { generateText } from 'ai'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json().catch(() => null)
  const prompt = typeof body?.prompt === 'string' ? body.prompt.trim() : ''
  if (!prompt || prompt.length > 1000) return Response.json({ error: 'Enter a question under 1,000 characters.' }, { status: 400 })
  const result = await generateText({
    model: 'openai/gpt-4o-mini',
    system: 'You are DISKAI, a concise tour-management assistant. Give practical advice about routing, venues, bookings, marketing, and tour finances. If data is missing, say what you need rather than inventing specifics.',
    prompt,
  })
  return Response.json({ answer: result.text })
}
