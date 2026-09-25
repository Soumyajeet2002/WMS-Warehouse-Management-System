import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Vendor } from '../../vendors/entities/vendor.entity';

export enum UserRole {
  ADMIN = 'ADMIN',
  VENDOR = 'VENDOR',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  passwordHash!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.VENDOR,
  })
  role!: UserRole;

  @ManyToOne(() => Vendor, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'vendorId' })
  vendor!: Vendor | null;

  @Column({ type: 'uuid', nullable: true })
  vendorId!: string | null;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
