import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entity/comment.entity';
import { Task } from 'src/entity/task.entity';
import {  Repository } from 'typeorm';
import { CreateCommentDto } from './dto/createcomment.dto';

@Injectable()
export class CommentService {


   constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
   ) {}


    /*<========================================>
          🏳️   Create Comment Start    🏳️
    ===========================================>*/

    async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {

        const { content, taskId } = createCommentDto;

        const task = await this.taskRepository.findOne({ where: { id: taskId } });

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        // Create the comment
        const comment = this.commentRepository.create({
            content,
            task,
        });

        return this.commentRepository.save(comment);
    }

    /*<========================================>
            🚩   Create Comment End      🚩
    ===========================================>*/
    /*<========================================>
          🏳️   Get Comment Start    🏳️
    ===========================================>*/
  
    async getAllComments(): Promise<Comment[]> {
        return this.commentRepository.find({
            relations: ['task'],  
            order: { createdAt: 'DESC' },
        });
    }

    /*<========================================>
          🚩   Get Comment End         🚩
    ===========================================>*/
     /*<========================================>
          🏳️   Single Comment Start    🏳️
    ===========================================>*/

    async getCommentById(id: number): Promise<Comment> {
        const comment = await this.commentRepository.findOne({
            where: { id },
            relations: ['task'],
        });

        if (!comment) {
            throw new NotFoundException('Comment not found');
        }

        return comment;
    }
     /*<========================================>
          🚩   Single Comment End         🚩
    ===========================================>*/
     /*<========================================>
          🏳️   Delete Comment Start    🏳️
    ===========================================>*/


   async deleteComment(id: number): Promise<{ message: string }> {
       const comment = await this.commentRepository.findOne({ where: { id } });

       if (!comment) {
           throw new NotFoundException('Comment not found');
       }

       await this.commentRepository.remove(comment);

       return { message: 'Comment deleted successfully' };
   }


}
