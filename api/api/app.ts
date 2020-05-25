import { use, settings, server } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'
import * as cors from 'cors'

use(prisma())

settings.change({
  server: {
    playground: process.env.PLAYGROUND === 'true',
  },
})

if (process.env.CORS_ORIGIN) {
  server.express.use(
    cors({
      origin: process.env.CORS_ORIGIN,
    }),
  )
}

console.log('PLAYGROUND:', process.env.PLAYGROUND)
console.log('DATABASE_URL:', process.env.DATABASE_URL)
console.log('CORS_ORIGIN:', process.env.CORS_ORIGIN)
