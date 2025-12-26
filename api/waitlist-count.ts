import { Redis } from '@upstash/redis'

export const config = {
  runtime: 'edge',
}

const redis = Redis.fromEnv()

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'GET') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  try {
    const count = await redis.scard('waitlist:emails')
    return new Response(JSON.stringify({ ok: true, count }), {
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

