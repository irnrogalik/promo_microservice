import type { MigrationInterface, QueryRunner } from 'typeorm';

export class promocodeTable1651742798938 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS promocode
    (
        "id"        uuid              NOT NULL DEFAULT gen_random_uuid(),
        "name"      character varying NOT NULL,
        "percent"   INT               NOT NULL,
        "isUsed"    BOOLEAN           DEFAULT FALSE,
        "isOneTime" BOOLEAN           DEFAULT FALSE,
        "startDate" character varying DEFAULT '',
        "endDate"   character varying DEFAULT '',
        PRIMARY KEY(id),
        CONSTRAINT name_unique UNIQUE (name)
    );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE promocode;');
  }
}
