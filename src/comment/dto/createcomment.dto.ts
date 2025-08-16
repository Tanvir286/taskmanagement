// create-comment.dto.ts
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  content: string; // Comment text

  @IsNumber()
  taskId: number; // Kon task er comment
}
