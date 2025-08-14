// src/task/dto/update-task.dto.ts
import { IsString, IsEnum, IsOptional, IsDateString, IsInt } from 'class-validator';
import { TaskPriority, TaskStatus } from 'src/entity/task.entity';

export class UpdateTaskDto {


  @IsInt()
  id: number;  // Task ID to identify which task to update

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  assignedUserId?: number;  

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsDateString()
  deadline?: string;

}
