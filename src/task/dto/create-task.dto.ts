// src/task/dto/create-task.dto.ts
import { IsString, IsEnum, IsOptional, IsDateString, IsInt } from 'class-validator';
import { TaskPriority, TaskStatus } from 'src/entity/task.entity';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsInt()
  assignedUserId?: number;  

  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsDateString()
  deadline: string;
}

