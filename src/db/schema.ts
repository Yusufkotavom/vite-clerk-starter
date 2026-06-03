import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(), // In production, this should be hashed
  phoneNumber: text('phone_number'),
  status: text('status').default('active'),
  role: text('role').default('user'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
