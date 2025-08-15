// src/task/dto/update-task.dto.ts
import { IsString, IsEnum, IsOptional, IsDateString, IsInt, ValidateIf } from 'class-validator';
import { TaskPriority, TaskStatus } from 'src/entity/task.entity';

export class UpdateTaskDto {
  
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  @IsOptional()
  user?: string;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsDateString()
  @ValidateIf((obj) => !obj.deadline || new Date(obj.deadline) >= new Date())
  deadline?: string; 
}
