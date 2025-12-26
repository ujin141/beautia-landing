import { Redis } from '@upstash/redis'

export const config = {
  runtime: 'edge',
}

const redis = Redis.fromEnv()

function normalizeEmail(input: unknown): string | null {
  if (typeof input !== 'string') return null
  const value = input.trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return null
  return value
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  let email: string | null = null
  try {
    const body = (await req.json()) as { email?: unknown }
    email = normalizeEmail(body?.email)
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (!email) {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid email' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const added = await redis.sadd('waitlist:emails', email)
    if (added === 1) {
      await redis.hset(`waitlist:meta:${email}`, { createdAt: Date.now() })
    }
    return new Response(JSON.stringify({ ok: true, alreadyJoined: added === 0 }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ ok: false, error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

