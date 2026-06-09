// backend/src/config/prisma.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development'
    ? ['query', 'info', 'warn', 'error']
    : ['warn', 'error'],
});

export const connectDatabase = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Base de datos PostgreSQL conectada');
    return true;
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error.message);
    return false;
  }
};

export const disconnectDatabase = async () => {
  try {
    await prisma.$disconnect();
    console.log('🔌 Base de datos desconectada');
  } catch (error) {
    console.error('❌ Error al desconectar la base de datos:', error.message);
  }
};

export default prisma;
