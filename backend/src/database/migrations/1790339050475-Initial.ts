import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1790339050475 implements MigrationInterface {
    name = 'Initial1790339050475'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a6b1305fa3dcef6630c37357345" FOREIGN KEY ("vendorId") REFERENCES "vendors"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a6b1305fa3dcef6630c37357345"`);
    }

}
