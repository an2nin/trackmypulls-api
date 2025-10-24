import { Hono } from 'hono'
import pulls from './pulls'
import type { Env, Variables } from '../types'

const api = new Hono<{ Bindings: Env; Variables: Variables }>()

// Mount the pulls routes
api.route('/pulls', pulls)

export default api
