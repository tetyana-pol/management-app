import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { UsersService } from '../users/users.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ChangeTaskUserDto } from './dto/change-taskuser.dto';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly userService: UsersService,
  ) {}

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id) {
    return this.tasksService.findOne(id);
  }

  @Get('project/:projectId')
  findByProject(@Param('projectId', ParseIntPipe) projectId) {
    return this.tasksService.findByProject(projectId);
  }

  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id, @Body() body: UpdateTaskDto) {
    return this.tasksService.update(id, body);
  }

  @Patch(':id/user')
  async changeUser(id: number, @Body() body: ChangeTaskUserDto) {
    const user = await this.userService.findOne(body.userId);
    if (!user) {
      throw new Error(' User not found');
    }
    return this.tasksService.changeUser(id, user);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id) {
    return this.tasksService.delete(id);
  }
}
