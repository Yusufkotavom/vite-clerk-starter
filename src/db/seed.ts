import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'
import { users } from './schema'

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql, { schema })

async function seed() {
  console.log('Seeding database...')

  await db.insert(users).values({
    firstName: 'Admin',
    lastName: 'User',
    username: 'admin',
    email: 'admin@example.com',
    password: 'password123', // REMEMBER: Use hashing in real apps!
    role: 'superadmin',
    status: 'active',
  })

  console.log('Seed completed!')
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
