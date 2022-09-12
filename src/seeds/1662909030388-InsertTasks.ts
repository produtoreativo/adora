import { MigrationInterface, QueryRunner } from 'typeorm';

import * as dotenv from 'dotenv';
dotenv.config();
const dbMainSchema = process.env.DB_MAIN_SCHEMA;

export class InsertTasks1662909030388 implements MigrationInterface {
  name = 'InsertTasks1662909030388';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "${dbMainSchema}"."applications" ("createdBy", "lastChangedBy","name") values ('ADMIN', 'ADMIN', 'app 1')`,
    );
    await queryRunner.query(
      `INSERT INTO "${dbMainSchema}"."tasks" ("createdBy", "lastChangedBy", "name", "hash","ref", "applicationId", "payload") values ('ADMIN', 'ADMIN', 'task 1', '1234','ref', 1, '{"foo":"bar"}')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
