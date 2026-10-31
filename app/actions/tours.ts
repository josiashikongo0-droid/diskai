'use server'

import { randomUUID } from 'crypto'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { and, desc, eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { tour } from '@/lib/db/schema'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function listTours() {
  const userId = await getUserId()
  return db.select().from(tour).where(eq(tour.userId, userId)).orderBy(desc(tour.createdAt))
}

export async function createTour(input: { name: string; artist: string; startDate?: string; endDate?: string }) {
  const userId = await getUserId()
  const name = input.name.trim()
  const artist = input.artist.trim()
  if (!name || !artist || name.length > 120 || artist.length > 120) throw new Error('Invalid tour details')
  await db.insert(tour).values({ id: randomUUID(), userId, name, artist, startDate: input.startDate ? new Date(input.startDate) : null, endDate: input.endDate ? new Date(input.endDate) : null })
  revalidatePath('/')
}

export async function deleteTour(id: string) {
  const userId = await getUserId()
  await db.delete(tour).where(and(eq(tour.id, id), eq(tour.userId, userId)))
  revalidatePath('/')
}
