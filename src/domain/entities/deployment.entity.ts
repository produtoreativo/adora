import { Column, Entity, ManyToOne } from "typeorm";

import { Application } from "./application.entity";
import { BaseEntity } from "./base.entity";

@Entity({ name: "deployments" })
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
