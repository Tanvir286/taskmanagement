// task.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { AuthUser } from './authuser.entity';

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
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => AuthUser, (user) => user.tasks, { nullable: true })
  assignedUser: AuthUser;

  @Column({type: 'enum',enum: TaskPriority,default: TaskPriority.MEDIUM,})
  priority: TaskPriority;

  @Column({type: 'enum',enum: TaskStatus,default: TaskStatus.TODO,})
  status: TaskStatus;

  @Column({ type: 'date', nullable: true })
  deadline: string;
}
