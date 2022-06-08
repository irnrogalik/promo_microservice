import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertPromocode1654536797515 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE UNIQUE INDEX IF NOT EXISTS name_index ON promocode (name)
      `);
    await queryRunner.query(`
        INSERT INTO promocode (id, name, percent, "startDate", "endDate")
        VALUES
          ('6ff628b0-7dd1-40fd-9d00-1298d5037eb3', 'promo10', 10, now(), now() + interval '1' year);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
