import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

// Wuthering Waves pulls table
export const wutheringWavesPulls = sqliteTable('wuthering_waves_pulls', {
  id: text('id').primaryKey().notNull(), // UUID v4 as string
  player_id: text('player_id').notNull(),
  server_id: text('server_id'),
  banner_1: text('banner_1'),
  banner_2: text('banner_2'),
  banner_3: text('banner_3'),
  banner_4: text('banner_4'),
  banner_5: text('banner_5'),
  banner_6: text('banner_6'),
  banner_7: text('banner_7'),
  created_at: integer('created_at', { mode: 'timestamp' }).notNull(),
  updated_at: integer('updated_at', { mode: 'timestamp' }),
})
