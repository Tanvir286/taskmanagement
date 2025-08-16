import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Check, OneToMany } from 'typeorm';
import { AuthUser } from './authuser.entity';
import { Comment } from './comment.entity';

export enum TaskPriority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'progress',
  DONE = 'done',
}

@Entity()
@Check(`"deadline" IS NULL OR "deadline" >= CURRENT_DATE`)
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: TaskPriority, default: TaskPriority.MEDIUM })
  priority: TaskPriority;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.TODO })
  status: TaskStatus;

  @Column({ type: 'date', nullable: true })
  deadline: string;

  @ManyToOne(() => AuthUser, (user) => user.tasks)
  assignedUser: AuthUser;

  @OneToMany(() => Comment, (comment) => comment.task)
  comments: Comment[];

}