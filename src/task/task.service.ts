import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task, TaskPriority, TaskStatus } from 'src/entity/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { AuthUser } from 'src/entity/authuser.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    @InjectRepository(AuthUser)
    private readonly userRepository: Repository<AuthUser>,
  ) {}


   /*<========================================>
           🏳️   Create Task Start    🏳️
   ===========================================>*/ 

    async create(createTaskDto: CreateTaskDto, userId: number): Promise<Task> {
        
        const { title, description, assignedUserId, priority, status, deadline } = createTaskDto;

        // Find the assigned user (optional)
        let assignedUser: AuthUser | null = null;
        if (assignedUserId) {
            assignedUser = await this.userRepository.findOne({ where: { id: assignedUserId } });
            if (!assignedUser) {
                throw new NotFoundException('Assigned user not found');
            }
        }

        // Create task entity
        const task = this.taskRepository.create({
        title,
        description,
        assignedUser: assignedUser ?? undefined,
        priority: priority || TaskPriority.MEDIUM,
        status: status || TaskStatus.TODO,
        deadline: deadline ?? undefined,
        });

        // Save to database
        return this.taskRepository.save(task);
    }

    /*<========================================>
             🚩   Create Task End      🚩
    ===========================================>*/
    /*<========================================>
           🏳️   Update Task Start    🏳️
    ===========================================>*/ 
    async update(updateTaskDto: Partial<CreateTaskDto>, userId: number, taskId: number): Promise<Task> {
        const task = await this.taskRepository.findOne({ where: { id: taskId } });
        if (!task) {
            throw new NotFoundException('Task not found');
        }

        // Update task properties
        Object.assign(task, updateTaskDto);

        // If assignedUserId is provided, find the user
        if (updateTaskDto.assignedUserId) {
            const assignedUser = await this.userRepository.findOne({ where: { id: updateTaskDto.assignedUserId } });
            if (!assignedUser) {
                throw new NotFoundException('Assigned user not found');
            }
            task.assignedUser = assignedUser;
        }

        // Save updated task
        return this.taskRepository.save(task);
    }
    /*<========================================>
             🚩   Update Task End      🚩
    ===========================================>*/





    






















}
