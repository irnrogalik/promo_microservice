import type { MigrationInterface, QueryRunner } from 'typeorm';

export class promocodeTable1651742798938 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS promocode
    (
        "id"              uuid                NOT NULL DEFAULT gen_random_uuid(),
        "createdAt"       TIMESTAMP           NOT NULL DEFAULT now(),
        "name"            CHARACTER VARYING   NOT NULL,
        "percent"         INT                 NOT NULL,
        "isOneTime"       BOOLEAN             DEFAULT FALSE,
        "usedDate"        TIMESTAMP           DEFAULT NULL,
        "startDate"       TIMESTAMP           DEFAULT NULL,
        "endDate"         TIMESTAMP           DEFAULT NULL,
        "deletedAt"       TIMESTAMP           DEFAULT NULL,
        "deletedReason"   CHARACTER VARYING   DEFAULT NULL, 
        PRIMARY KEY(id),
        CONSTRAINT name_unique UNIQUE (name)
    );
    `);
    await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS name_index ON promocode (name)
    `);
    await queryRunner.query(`
      INSERT INTO promocode (id, name, percent, "startDate", "endDate")
      VALUES
        ('6ff628b0-7dd1-40fd-9d00-1298d5037eb3', 'promo10', 10, now(), now() + interval '1' year);
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE promocode;');
    await queryRunner.query('DROP INDEX name_index;');
  }
}
