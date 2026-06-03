import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { db } from '../src/db'
import { users } from '../src/db/schema'
import { eq } from 'drizzle-orm'

export const config = {
  runtime: 'edge',
}

const app = new Hono().basePath('/api')

app.get('/hello', (c) => {
  return c.json({
    message: 'Hello from Hono!',
  })
})

app.post('/auth/login', async (c) => {
  try {
    const { email, password } = await c.req.json()

    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    if (user.length === 0 || user[0].password !== password) {
      return c.json({ message: 'Invalid email or password' }, 401)
    }

    // Return user data (excluding password)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user[0]

    return c.json({
      message: 'Login successful',
      user: userWithoutPassword,
      accessToken: 'mock-jwt-token-replace-this-later',
    })
  } catch (error) {
    return c.json({ message: 'Internal Server Error', error: String(error) }, 500)
  }
})

app.get('/users', async (c) => {
  try {
    const allUsers = await db.select().from(users)
    return c.json(allUsers)
  } catch (error) {
    return c.json({ message: 'Internal Server Error', error: String(error) }, 500)
  }
})

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)
export const PATCH = handle(app)
