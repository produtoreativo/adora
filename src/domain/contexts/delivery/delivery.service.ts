import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "../../entities/task.entity";
import { Repository } from "typeorm";
import { Event, EventType } from "../../entities/event.entity";
import { Deployment } from "../../entities/deployment.entity";
import DeployDTO from "../../dtos/Deploy.dto";
import HackDTO from "../../dtos/Hack.dto";
import FinishDTO from "../../dtos/Finish.dto";

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Deployment)
    private deploymentRepository: Repository<Deployment>,
  ) {}

  buildAuthor(origin: string): JSON {
    return {
      createdBy: origin,
      lastChangedBy: origin,
    } as unknown as JSON;
  }

  async saveTask(payload: HackDTO, applicationId: number, author: JSON): Promise<Task> {
    const { ref, name, hash } = payload.data;
    return this.taskRepository.save({
      name,
      ref,
      hash,
      applicationId,
      ...author,
      payload: payload as unknown as JSON,
    });
  }

  async createTask(applicationId: number, payload: HackDTO): Promise<Event> {
    const { origin } = payload.data;
    const author = this.buildAuthor(origin);
    const task: Task = await this.saveTask(payload, applicationId, author as unknown as JSON);
    return this.eventRepository.save({
      applicationId,
      taskId: task.id,
      name: payload.data.name,
      eventType: EventType.START_CYCLE,
      payload: payload as unknown as JSON,
      ...author,
    });
  }

  async findTask(applicationId: number, ref: string): Promise<Task> {
    return this.taskRepository
      .createQueryBuilder("tasks")
      .where("tasks.ref = :ref", { ref })
      .andWhere("tasks.applicationId = :applicationId", { applicationId })
      .getOne();
  }

  async finishTask(applicationId: number, payload: FinishDTO): Promise<Event> {
    const {
      data: { ref, name, origin },
    } = payload;
    const task: Task = await this.findTask(applicationId, ref);
    task.finishedAt = new Date();
    await this.taskRepository.save(task);
    const author = this.buildAuthor(origin);
    return this.eventRepository.save({
      applicationId,
      taskId: task.id,
      name,
      eventType: EventType.FINISH,
      payload: payload as unknown as JSON,
      ...author,
    });
  }

  async findFineshedTasks(applicationId: number): Promise<Task[]> {
    return this.taskRepository
      .createQueryBuilder("tasks")
      .where("tasks.finishedAt is not null")
      .andWhere("tasks.applicationId = :applicationId", { applicationId })
      .getMany();
  }

  async updateTaskAndCreateEvent(
    applicationId: number,
    task: Task,
    payload: DeployDTO,
    author: JSON,
  ) {
    const {
      data: { name },
    } = payload;
    task.deployedAt = new Date();
    await this.taskRepository.save(task);
    return this.eventRepository.save({
      applicationId,
      taskId: task.id,
      name,
      eventType: EventType.SHIP,
      payload: payload as unknown as JSON,
      ...author,
    });
  }

  async ship(applicationId: number, payload: DeployDTO): Promise<Deployment> {
    const {
      data: { origin, state, name },
    } = payload;
    const author = this.buildAuthor(origin);

    if (state === "pending") {
      // throw new Error('Ignore here?');
      return null;
    }

    if (state === "success") {
      const tasks: Task[] = await this.findFineshedTasks(applicationId);
      await Promise.all(
        tasks.map((task) => {
          return this.updateTaskAndCreateEvent(applicationId, task, payload, author);
        }),
      );
    }

    return this.deploymentRepository.save({
      ...author,
      applicationId,
      name,
      state,
      payload: payload as unknown as JSON,
    });
  }
}
