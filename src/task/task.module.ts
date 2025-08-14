import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/entity/task.entity';
import { AuthUser } from 'src/entity/authuser.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, AuthUser]) // Import Task and AuthUser entities for dependency injection
  ],
  providers: [TaskService],
  controllers: [TaskController]
})
export class TaskModule {}
