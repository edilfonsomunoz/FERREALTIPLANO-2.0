// backend/src/config/prisma.js
import { PrismaClient } from '@prisma/client';

// Singleton pattern: reuse a single PrismaClient instance across the app
// to avoid exhausting the database connection pool.
const prisma = new PrismaClient();

export default prisma;
