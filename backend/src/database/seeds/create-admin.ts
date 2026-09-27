import 'dotenv/config';

import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';

import { User, UserRole } from '../../modules/users/entities/user.entity';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['src/modules/**/*.entity.ts'],
});

async function createAdmin() {
  await dataSource.initialize();

  const userRepository = dataSource.getRepository(User);

  const adminEmail = 'admin@wms.local';
  const adminPassword = 'Admin@12345';

  const existingAdmin = await userRepository.findOne({
    where: {
      email: adminEmail,
    },
  });

  if (existingAdmin) {
    console.log('Admin account already exists.');
    await dataSource.destroy();
    return;
  }

  const passwordHash = await bcrypt.hash(adminPassword, 12);

  const admin = userRepository.create({
    email: adminEmail,
    passwordHash,
    role: UserRole.ADMIN,
    vendorId: null,
    isActive: true,
  });

  await userRepository.save(admin);

  console.log('Admin account created successfully.');
  console.log(`Email: ${adminEmail}`);
  console.log(`Password: ${adminPassword}`);

  await dataSource.destroy();
}

createAdmin().catch(async (error) => {
  console.error('Failed to create admin:', error);

  if (dataSource.isInitialized) {
    await dataSource.destroy();
  }

  process.exit(1);
});