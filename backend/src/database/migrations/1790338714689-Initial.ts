import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1790338714689 implements MigrationInterface {
    name = 'Initial1790338714689'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vendors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying(20), "address" character varying(255), "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_1127015587ca66797a569381717" UNIQUE ("code"), CONSTRAINT "UQ_3fe1343dbf2a7d9b7be1c27725a" UNIQUE ("email"), CONSTRAINT "PK_9c956c9797edfae5c6ddacc4e6e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "vendors"`);
    }

}
