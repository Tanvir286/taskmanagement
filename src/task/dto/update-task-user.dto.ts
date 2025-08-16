
// src/task/dto/update-task.dto.ts
import { IsString, IsEnum, IsOptional, IsDateString, IsInt } from 'class-validator';
import { TaskPriority, TaskStatus } from 'src/entity/task.entity';

export class UpdateTaskUserDto {


  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;


}
