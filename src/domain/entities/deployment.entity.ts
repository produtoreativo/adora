import { Column, Entity, ManyToOne } from "typeorm";

import { Application } from "./application.entity";
import { BaseEntity } from "./base.entity";


import * as dotenv from "dotenv";
dotenv.config();
const dbMainSchema = process.env.DB_MAIN_SCHEMA;

@Entity({ name: "deployments", schema: dbMainSchema })
export class Deployment extends BaseEntity {
  @Column()
  name: string;

  @Column()
  state: string;

  @Column()
  applicationId: number;

  @Column({ type: "json", nullable: true })
  payload: JSON;

  @ManyToOne((type) => Application)
  application: Application;
}
