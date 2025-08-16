import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/entity/task.entity';
import { Comment } from 'src/entity/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment,Task]),
  ],
  providers: [CommentService],
  controllers: [CommentController]
})
export class CommentModule {}
