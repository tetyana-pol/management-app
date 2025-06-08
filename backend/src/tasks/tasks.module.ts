import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User]), UsersModule],
  controllers: [TasksController],
  providers: [TasksService, UsersService],
})
export class TasksModule {}
