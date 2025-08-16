
// comment.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Task } from './task.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string; 

  @ManyToOne(() => Task, (task) => task.comments, { onDelete: 'CASCADE' })
   task: Task;

  @CreateDateColumn()
  createdAt: Date; 
}

