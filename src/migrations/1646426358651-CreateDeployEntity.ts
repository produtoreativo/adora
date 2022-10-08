
import { MigrationInterface, QueryRunner } from 'typeorm';

import * as dotenv from 'dotenv';
dotenv.config();
const dbMainSchema = process.env.DB_MAIN_SCHEMA;

export class CreateDeployEntity1646426358651 implements MigrationInterface {
  name = 'CreateDeployEntity1646426358651';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "${dbMainSchema}"."deployments" ("id" SERIAL NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300) NOT NULL, "internalComment" character varying(300), "name" character varying NOT NULL, "applicationId" integer NOT NULL, "payload" json, CONSTRAINT "PK_1e5627acb3c950deb83fe98fc48" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "${dbMainSchema}"."deployments" ADD CONSTRAINT "FK_dca3b4d49c7df1e3a6a93b74fd7" FOREIGN KEY ("applicationId") REFERENCES "${dbMainSchema}"."applications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(

      `ALTER TABLE "${dbMainSchema}"."deployments" DROP CONSTRAINT "FK_dca3b4d49c7df1e3a6a93b74fd7"`,
    );
    await queryRunner.query(`DROP TABLE "${dbMainSchema}"."deployments"`);
  }
}
