import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { NotFoundException } from '@nestjs/common';
import { Project } from 'src/entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private projectRepo: Repository<Project>,
  ) {}

  async findAll() {
    return await this.projectRepo.find();
  }

  async findOne(id: number) {
    const project = await this.projectRepo.findOne({
      where: { id },
    });

    if (!project) throw new NotFoundException();
    return project;
  }

  async create(dto: CreateProjectDto) {
    return await this.projectRepo.save(dto);
  }

  async update(id: number, dto: UpdateProjectDto) {
    return await this.projectRepo.update({ id }, dto);
  }

  async delete(id: number) {
    return await this.projectRepo.delete({ id });
  }
}
