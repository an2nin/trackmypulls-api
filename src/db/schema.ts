import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

// Example table - customize this based on your needs
export const pulls = sqliteTable('pulls', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull(),
  pullData: text('pull_data').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
})

// Add more tables as needed
// export const users = sqliteTable('users', {
//   id: integer('id').primaryKey({ autoIncrement: true }),
//   name: text('name').notNull(),
//   email: text('email').notNull().unique(),
// })
