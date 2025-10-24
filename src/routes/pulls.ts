import { Hono } from 'hono'
import type { Env, Variables } from '../types'

const pulls = new Hono<{ Bindings: Env; Variables: Variables }>()

// POST /api/pulls/global
pulls.post('/global', async (c) => {
  // Access the database via c.get('db')
  // const db = c.get('db')

  // TODO: Implement logic here
  return c.json({ message: 'Global pulls endpoint' })
})

export default pulls
