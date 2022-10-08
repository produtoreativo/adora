import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DeliveryService } from "../delivery.service";
import { Task } from "../../../entities/task.entity";
import { Event, EventType } from "../../../entities/event.entity";
import { Deployment } from "../../../entities/deployment.entity";
import StartCycle from "../../../dtos/StartCycle.dto";
import HackDTO from "../../../dtos/Hack.dto";
import GithubDeploy from "../../../dtos/GithubDeploy.dto";

@Injectable()
export class GithubService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private readonly deliveryService: DeliveryService,
  ) {}

  async createTask(applicationId: number, payload: StartCycle): Promise<Event> {
    const hackDTO = new HackDTO();
    hackDTO.data = {
      ref: payload.data.ref,
      name: payload.data.name,
      hash: payload.commit,
      origin: "github",
    };
    return this.deliveryService.createTask(applicationId, hackDTO);
  }

  async findTask(applicationId: number, ref: string): Promise<Task> {
    return this.taskRepository
      .createQueryBuilder("tasks")
      .where("tasks.ref = :ref", { ref })
      .andWhere("tasks.applicationId = :applicationId", { applicationId })
      .getOne();
  }

  async createEvent(applicationId: number, payload: StartCycle): Promise<Event> {
    const {
      data: { ref, name },
    } = payload;
    const task: Task = await this.findTask(applicationId, ref);

    const author = { createdBy: "github", lastChangedBy: "github" };
    const eventType: EventType = EventType.START_CYCLE;

    return this.eventRepository.save({
      applicationId,
      taskId: task.id,
      name,
      eventType,
      payload: payload as unknown as JSON,
      ...author,
    });
  }

  async findMultipleTask(applicationId: number, ids: string[]): Promise<Task[]> {
    return this.taskRepository
      .createQueryBuilder("tasks")
      .where("tasks.hash IN(:...ids)", { ids })
      .andWhere("tasks.applicationId = :applicationId", { applicationId })
      .getMany();
  }

  async createEventFromMerge(applicationId: number, payload: StartCycle): Promise<Event[]> {
    const {
      commits,
      data: { name },
    } = payload;

    const ids = commits.map((item) => item["id"]);
    const tasks: Task[] = await this.findMultipleTask(applicationId, ids);

    const events: Event[] = tasks.map((task) => {
      const author = { createdBy: "github", lastChangedBy: "github" };
      const eventType: EventType = EventType.START_CYCLE;
      const event: Event = new Event();
      this.eventRepository.merge(event, {
        applicationId,
        taskId: task.id,
        name,
        eventType,
        payload: payload as unknown as JSON,
        ...author,
      });
      return event;
    });
    await this.eventRepository.save(events);

    return Promise.all(
      tasks.map((task) => {
        return this.deliveryService.finishTask(applicationId, {
          data: {
            name,
            origin: "github",
            ref: task.ref,
          },
        });
      }),
    );
  }

  async createDeploy(applicationId: number, payload: GithubDeploy): Promise<Deployment> {
    const {
      deployment_status: { state },
      data: { name },
    } = payload;
    return this.deliveryService.ship(applicationId, {
      data: { name, state, origin: "github" },
    });
  }
}
