"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
const nexus_plugin_prisma_1 = require("nexus-plugin-prisma");
const cors = require("cors");
nexus_1.use(nexus_plugin_prisma_1.prisma());
nexus_1.settings.change({
    server: {
        playground: !!process.env.PLAYGROUND || false,
    },
});
if (process.env.CORS_ORIGIN) {
    nexus_1.server.express.use(cors({
        origin: process.env.CORS_ORIGIN,
    }));
}
console.log('PLAYGROUND:', process.env.PLAYGROUND);
console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('CORS_ORIGIN:', process.env.CORS_ORIGIN);
