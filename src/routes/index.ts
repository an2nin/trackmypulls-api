import { Hono } from 'hono'
import pulls from './pulls'

const api = new Hono()

// Mount the pulls routes
api.route('/pulls', pulls)

export default api
