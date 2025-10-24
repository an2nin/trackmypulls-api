import type { Database } from './db'

type Env = CloudflareBindings

interface Variables {
  db: Database
}

export type { Env, Variables }
