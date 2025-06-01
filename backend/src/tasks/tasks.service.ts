import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { NotFoundException } from '@nestjs/common';
import { Task } from 'src/entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private taskRepo: Repository<Task>) {}

  async findAll() {
    return await this.taskRepo.find();
  }

  async findOne(id: number) {
    const task = await this.taskRepo.findOne({
      where: { id },
    });

    if (!task) throw new NotFoundException();
    return task;
  }

  async findByProject(projectId: number) {
    const task = await this.taskRepo.find({
      where: { project: { id: projectId } },
    });

    if (!task) throw new NotFoundException();
    return task;
  }

  async create({ projectId, ...createTaskDto }: CreateTaskDto) {
    const task = this.taskRepo.create({
      ...createTaskDto,
      project: { id: projectId },
    });
    await this.taskRepo.save(task);
    return task;
  }

  async update(id: number, dto: UpdateTaskDto) {
    return await this.taskRepo.update({ id }, dto);
  }

  async delete(id: number) {
    return await this.taskRepo.delete({ id });
  }
}
