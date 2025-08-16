import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/entity/task.entity';
import { AuthUser } from 'src/entity/authuser.entity';
import { Comment } from 'src/entity/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, AuthUser,Comment]) 
  ],
  providers: [TaskService],
  controllers: [TaskController]
})
export class TaskModule {}
