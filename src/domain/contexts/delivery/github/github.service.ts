import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../../../entities/task.entity';
import { Repository } from 'typeorm';
import StartCycle from '../../../dtos/StartCycle.dto';
import { Event, EventType } from '../../../entities/event.entity';
import { Deployment } from '../../../entities/deployment.entity';
import DeployDTO from '../../../dtos/Deploy.dto';

@Injectable()
export class GithubService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Deployment)
    private deploymentRepository: Repository<Deployment>,
  ) {}

  async saveTask(
    payload: StartCycle,
    applicationId: number,
    author: JSON,
  ): Promise<Task> {
    const { commit: hash } = payload;
    const { ref } = payload.data;
    return this.taskRepository.save({
      name: ref,
      ref,
      hash,
      applicationId,
      ...author,
      payload: payload as unknown as JSON,
    });
  }

  async createTask(applicationId: number, payload: StartCycle): Promise<Event> {
    const author = { createdBy: 'github', lastChangedBy: 'github' };
    const task: Task = await this.saveTask(
      payload,
      applicationId,
      author as unknown as JSON,
    );
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
      .createQueryBuilder('tasks')
      .where('tasks.ref = :ref', { ref })
      .andWhere('tasks.applicationId = :applicationId', { applicationId })
      .getOne();
  }

  async createEvent(
    applicationId: number,
    payload: StartCycle,
  ): Promise<Event> {
    const {
      data: { ref, name },
    } = payload;
    const task: Task = await this.findTask(applicationId, ref);

    const author = { createdBy: 'github', lastChangedBy: 'github' };
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

  async findMultipleTask(
    applicationId: number,
    ids: string[],
  ): Promise<Task[]> {
    return this.taskRepository
      .createQueryBuilder('tasks')
      .where('tasks.hash IN(:...ids)', { ids })
      .andWhere('tasks.applicationId = :applicationId', { applicationId })
      .getMany();
  }

  async createEventFromMerge(
    applicationId: number,
    payload: StartCycle,
  ): Promise<Event[]> {
    const {
      commits,
      data: { name },
    } = payload;

    const ids = commits.map((item) => item['id']);
    const tasks: Task[] = await this.findMultipleTask(applicationId, ids);

    const events: Event[] = tasks.map((task) => {
      const author = { createdBy: 'github', lastChangedBy: 'github' };
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
    return this.eventRepository.save(events);
  }

  async createDeploy(
    applicationId: number,
    payload: DeployDTO,
  ): Promise<Deployment> {
    const author = { createdBy: 'github', lastChangedBy: 'github' };
    return this.deploymentRepository.save({
      ...author,
      applicationId,
      name: 'Deploy',
      payload: payload as unknown as JSON,
    });
  }
}
