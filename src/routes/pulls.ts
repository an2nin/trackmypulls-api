import { Hono } from 'hono'

const pulls = new Hono()

// POST /api/pulls/global
pulls.post('/global', async (c) => {
  // TODO: Implement logic here
  return c.json({ message: 'Global pulls endpoint' })
})

export default pulls
