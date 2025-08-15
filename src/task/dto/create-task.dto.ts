// src/task/dto/create-task.dto.ts
import { IsString, IsEnum, IsOptional, IsDateString, IsInt, ValidateIf } from 'class-validator';
import { TaskPriority, TaskStatus } from 'src/entity/task.entity';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  user: string; 

  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsOptional()
  @IsDateString()
  @ValidateIf((obj) => new Date(obj.deadline) >= new Date())
  deadline?: string;
}

