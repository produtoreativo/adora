import {MigrationInterface, QueryRunner} from "typeorm";

export class AddGenericToType1646170151612 implements MigrationInterface {
    name = 'AddGenericToType1646170151612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_65c4be4fef92d20ba9a85d41ee9"`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "applicationId" SET NOT NULL`);
        await queryRunner.query(`ALTER TYPE "public"."events_eventtype_enum" RENAME TO "events_eventtype_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."events_eventtype_enum" AS ENUM('START_CYCLE', 'SHIP', 'PROMOTE', 'FAIL', 'RECOVERY', 'GENERIC')`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "eventType" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "eventType" TYPE "public"."events_eventtype_enum" USING "eventType"::"text"::"public"."events_eventtype_enum"`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "eventType" SET DEFAULT 'START_CYCLE'`);
        await queryRunner.query(`DROP TYPE "public"."events_eventtype_enum_old"`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "applicationId" SET NOT NULL`);
        await queryRunner.query(`ALTER TYPE "public"."events_eventtype_enum" RENAME TO "events_eventtype_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."events_eventtype_enum" AS ENUM('START_CYCLE', 'SHIP', 'PROMOTE', 'FAIL', 'RECOVERY', 'GENERIC')`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "eventType" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "eventType" TYPE "public"."events_eventtype_enum" USING "eventType"::"text"::"public"."events_eventtype_enum"`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "eventType" SET DEFAULT 'START_CYCLE'`);
        await queryRunner.query(`DROP TYPE "public"."events_eventtype_enum_old"`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_65c4be4fef92d20ba9a85d41ee9" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_65c4be4fef92d20ba9a85d41ee9"`);
        await queryRunner.query(`CREATE TYPE "public"."events_eventtype_enum_old" AS ENUM('START_CYCLE', 'SHIP', 'PROMOTE', 'FAIL', 'RECOVERY')`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "eventType" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "eventType" TYPE "public"."events_eventtype_enum_old" USING "eventType"::"text"::"public"."events_eventtype_enum_old"`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "eventType" SET DEFAULT 'START_CYCLE'`);
        await queryRunner.query(`DROP TYPE "public"."events_eventtype_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."events_eventtype_enum_old" RENAME TO "events_eventtype_enum"`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "applicationId" DROP NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."events_eventtype_enum_old" AS ENUM('START_CYCLE', 'SHIP', 'PROMOTE', 'FAIL', 'RECOVERY')`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "eventType" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "eventType" TYPE "public"."events_eventtype_enum_old" USING "eventType"::"text"::"public"."events_eventtype_enum_old"`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "eventType" SET DEFAULT 'START_CYCLE'`);
        await queryRunner.query(`DROP TYPE "public"."events_eventtype_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."events_eventtype_enum_old" RENAME TO "events_eventtype_enum"`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "applicationId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_65c4be4fef92d20ba9a85d41ee9" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
