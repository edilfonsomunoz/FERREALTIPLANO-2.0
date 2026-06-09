import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('123456', 10);
  
  const user = await prisma.user.upsert({
    where: { email: 'admin@colegio.edu' },
    update: {},
    create: {
      nombre: 'Admin Colegio',
      email: 'admin@colegio.edu',
      password: hash,
      rol: 'ADMIN',
      telefono: '999999999'
    }
  });

  console.log('✅ Admin creado exitosamente:', user.email);
}

main()
  .catch(e => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
