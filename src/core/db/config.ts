import dotenv from 'dotenv'
dotenv.config({
  path: '.env.development',
  override: true,   // 🔥 关键
})

import { defineConfig } from 'drizzle-kit'

console.log('DRIZZLE DATABASE_URL =', JSON.stringify(process.env.DATABASE_URL))

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing for drizzle-kit')
}

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/config/db/schema.ts',
  out: './src/config/db/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
})
