import { use, server } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'
import * as cors from 'cors'

use(prisma())

const cors_origin = process.env.CORS_ORIGIN || 'http://localhost:3000'
server.express.use(
  cors({
    origin: cors_origin,
  }),
)

console.log('DATABASE_URL:', process.env.DATABASE_URL)
console.log('CORS_ORIGIN:', process.env.CORS_ORIGIN)
