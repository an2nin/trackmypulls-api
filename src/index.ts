import { Hono } from 'hono'
import { cors } from 'hono/cors'
import api from './routes'
import { initDB } from './db'
import type { Env, Variables } from './types'

const app = new Hono<{ Bindings: Env; Variables: Variables }>()

// Initialize DB middleware
app.use('*', async (c, next) => {
  c.set('db', initDB(c.env.TMP_DB))
  await next()
})

// Enable CORS
app.use('/*', cors({
  origin: (origin) => {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5551',
    ]

    // Allow all subdomains of wuwapal.com and trackmypulls.com
    if (origin.endsWith('.wuwapal.com') ||
        origin.endsWith('.trackmypulls.com') ||
        origin === 'https://wuwapal.com' ||
        origin === 'https://trackmypulls.com' ||
        allowedOrigins.includes(origin)) {
      return origin
    }

    return allowedOrigins[0]
  },
  credentials: true,
}))

app.get('/', (c) => {
  return c.text('Hello Hono!')
})// Mount API routes
app.route('/api', api)

export default app
