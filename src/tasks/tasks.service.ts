import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TaskCreatedEvent } from './dto/task-created.event';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = this.taskRepository.create(createTaskDto);
    return await this.taskRepository.save(newTask);
  }

  async findAll() {
    this.emitEvent();
    return await this.taskRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    try {
      return await this.taskRepository.findOneByOrFail({ id: id });
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    if (task) {
      task.name = updateTaskDto.name;
    }
    return await this.taskRepository.save(task);
  }

  async remove(id: number): Promise<Task> {
    const task = await this.findOne(id);

    return await this.taskRepository.remove(task);
  }

  async emitEvent() {
    const res = await this.eventEmitter
      .emitAsync('task.launched', new TaskCreatedEvent('hatem'))
      .then((res) => console.log(res));
    return res;
  }
}
