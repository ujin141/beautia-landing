import { Redis } from '@upstash/redis'

export const config = {
  runtime: 'edge',
}

const redis = Redis.fromEnv()

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'GET') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  const adminKey = process.env.ADMIN_KEY
  const supplied = req.headers.get('x-admin-key')
  if (!adminKey || supplied !== adminKey) {
    return new Response('Unauthorized', { status: 401 })
  }

  try {
    const emails = await redis.smembers<string>('waitlist:emails')
    emails.sort()
    return new Response(JSON.stringify({ ok: true, emails }), {
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

