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
