# Database Setup Guide

## Overview
This project uses **Drizzle ORM** with **Cloudflare D1** (SQLite) database.

## Database Structure

- **Schema**: `src/db/schema.ts` - Define your database tables here
- **DB Init**: `src/db/index.ts` - Database initialization and connection
- **Migrations**: `drizzle/migrations/` - Generated migration files
- **Config**: `drizzle.config.ts` - Drizzle configuration

## Available Commands

### Generate Migrations
After modifying `src/db/schema.ts`, generate migration files:
```bash
npm run db:generate
```

### Apply Migrations

**Local Development:**
```bash
npm run db:migrate:local
# Replace <migration-file> with the actual migration file name
```

**Production:**
```bash
npm run db:migrate:remote
# Replace <migration-file> with the actual migration file name
```

### Database Studio
Open Drizzle Studio to view and manage your database:
```bash
npm run db:studio
```

### Regenerate Types
After changing `wrangler.jsonc`:
```bash
npm run cf-typegen
```

## Usage in Routes

The database is automatically initialized and available in all routes via context:

```typescript
import { Hono } from 'hono'
import type { Env, Variables } from '../types'

const router = new Hono<{ Bindings: Env; Variables: Variables }>()

router.post('/example', async (c) => {
  const db = c.get('db')

  // Use Drizzle ORM queries
  const result = await db.select().from(pulls).all()

  return c.json(result)
})
```

## Example Schema Modifications

Edit `src/db/schema.ts` to add or modify tables:

```typescript
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})
```

## Workflow

1. **Modify schema** in `src/db/schema.ts`
2. **Generate migration**: `npm run db:generate`
3. **Apply migration locally**: `npm run db:migrate:local`
4. **Test your changes** with `npm run dev`
5. **Deploy**: `npm run deploy`
6. **Apply migration to production**: `npm run db:migrate:remote`

## Notes

- The D1 database binding is named `TMP_DB` (configured in `wrangler.jsonc`)
- Database instance is available via `c.get('db')` in all routes
- TypeScript types are auto-generated from Cloudflare bindings
