import { Hono } from 'hono'
import type { Env, Variables } from '../types'
import { PullServiceFactory } from '../services/pulls/factory'

const pulls = new Hono<{ Bindings: Env; Variables: Variables }>()

// POST /api/pulls/global/:game
pulls.post('/global/:game', async (c) => {
  const game = c.req.param('game')
  const db = c.get('db')

  // Validate game is supported
  if (!PullServiceFactory.isGameSupported(game)) {
    return c.json(
      {
        success: false,
        error: `Unsupported game: ${game}`,
        supportedGames: PullServiceFactory.getSupportedGames(),
      },
      400
    )
  }

  try {
    // Get the appropriate service for the game
    const service = PullServiceFactory.createService(game, db)

    // Parse request body
    const body = await c.req.json()

    // Process the pull request
    const result = await service.processGlobalPull(body)

    return c.json(result, result.success ? 200 : 400)
  } catch (error) {
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      500
    )
  }
})

export default pulls
