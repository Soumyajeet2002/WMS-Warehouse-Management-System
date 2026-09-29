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
  
  @Entity('warehouses')
  export class Warehouse {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    @ManyToOne(
      () => Vendor,
      {
        nullable: false,
        onDelete: 'RESTRICT',
      },
    )
    @JoinColumn({ name: 'vendorId' })
    vendor!: Vendor;
  
    @Column('uuid')
    vendorId!: string;
  
    @Column({
      type: 'varchar',
      length: 50,
      unique: true,
    })
    code!: string;
  
    @Column({
      type: 'varchar',
      length: 150,
    })
    name!: string;
  
    @Column({
      type: 'varchar',
      length: 255,
      nullable: true,
    })
    address!: string | null;
  
    @Column({
      default: true,
    })
    isActive!: boolean;
  
    @CreateDateColumn()
    createdAt!: Date;
  
    @UpdateDateColumn()
    updatedAt!: Date;
  }