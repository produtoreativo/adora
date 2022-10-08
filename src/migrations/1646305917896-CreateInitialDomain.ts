import { MigrationInterface, QueryRunner } from 'typeorm';

import * as dotenv from 'dotenv';
dotenv.config();
const dbMainSchema = process.env.DB_MAIN_SCHEMA;

export class CreateInitialDomain1646305917896 implements MigrationInterface {
  name = 'CreateInitialDomain1646305917896';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "${dbMainSchema}"."tasks" ("id" SERIAL NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300) NOT NULL, "internalComment" character varying(300), "name" character varying NOT NULL, "ref" character varying NOT NULL, "hash" character varying NOT NULL, "applicationId" integer NOT NULL, "payload" json, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "events_eventtype_enum" AS ENUM('START_CYCLE', 'SHIP', 'PROMOTE', 'FAIL', 'RECOVERY', 'GENERIC')`,
    );
    await queryRunner.query(
      `CREATE TABLE "${dbMainSchema}"."events" ("id" SERIAL NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300) NOT NULL, "internalComment" character varying(300), "name" character varying NOT NULL, "applicationId" integer NOT NULL, "taskId" integer NOT NULL, "eventType" "events_eventtype_enum" NOT NULL DEFAULT 'START_CYCLE', "payload" json, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "${dbMainSchema}"."applications" ("id" SERIAL NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300) NOT NULL, "internalComment" character varying(300), "name" character varying NOT NULL, "configuration" json, CONSTRAINT "PK_938c0a27255637bde919591888f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "${dbMainSchema}"."tasks" ADD CONSTRAINT "FK_e6c7b5018b99bdedbd43a9ee549" FOREIGN KEY ("applicationId") REFERENCES "${dbMainSchema}"."applications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "${dbMainSchema}"."events" ADD CONSTRAINT "FK_65c4be4fef92d20ba9a85d41ee9" FOREIGN KEY ("applicationId") REFERENCES "${dbMainSchema}"."applications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "${dbMainSchema}"."events" ADD CONSTRAINT "FK_45e4d9c7121e534fb79a6150b74" FOREIGN KEY ("taskId") REFERENCES "${dbMainSchema}"."tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(

      `ALTER TABLE "${dbMainSchema}"."events" DROP CONSTRAINT "FK_45e4d9c7121e534fb79a6150b74"`,
    );
    await queryRunner.query(
      `ALTER TABLE "${dbMainSchema}"."events" DROP CONSTRAINT "FK_65c4be4fef92d20ba9a85d41ee9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "${dbMainSchema}"."tasks" DROP CONSTRAINT "FK_e6c7b5018b99bdedbd43a9ee549"`,
    );
    await queryRunner.query(`DROP TABLE "${dbMainSchema}"."applications"`);
    await queryRunner.query(`DROP TABLE "${dbMainSchema}"."events"`);
    await queryRunner.query(`DROP TYPE "events_eventtype_enum"`);
    await queryRunner.query(`DROP TABLE "${dbMainSchema}"."tasks"`);
  }
}
