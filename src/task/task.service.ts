import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task, TaskPriority, TaskStatus } from 'src/entity/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { AuthUser } from 'src/entity/authuser.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateTaskUserDto } from './dto/update-task-user.dto';

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
    async update(updateTaskDto: UpdateTaskDto, userId: number, taskId: number): Promise<any> {

        const task = await this.taskRepository.findOne({ where: { id: taskId } });
        if (!task) {
            throw new NotFoundException('Task not found');
        }

        // Update task properties
        Object.assign(task, updateTaskDto);

        // Save updated task
        return await this.taskRepository.save(task);
    }
    /*<========================================>
             🚩   Update Task End      🚩
    ===========================================>*/
    /*<========================================>
           🏳️   Update Task by User Start    🏳️
   ===========================================>*/

    async updatebyuser(updateTaskUserDto: UpdateTaskUserDto, userId: number, taskId: number): Promise<any> {

        const task = await this.taskRepository.findOne({ 
            where: { id: taskId }, 
            relations: ['assignedUser'] 
        });

        console.log(task);

        if (!task) {
        throw new NotFoundException('Task not found');
        }

    
        // শুধু assignedUser নিজের টাস্ক আপডেট করতে পারবে
        if (!task.assignedUser || task.assignedUser.id !== userId) {
            throw new ForbiddenException('আপনার অনুমতি নেই এই টাস্ক আপডেট করার');
        }

        // শুধু status আপডেট হবে
        task.status = updateTaskUserDto.status;

        return this.taskRepository.save(task);
    }
    
    /*<========================================>
            🚩   Update Task by User End      🚩
    ===========================================>*/





    






















}
