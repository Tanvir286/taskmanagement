import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task, TaskPriority, TaskStatus } from 'src/entity/task.entity';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
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

     private eventEmitter: EventEmitter2,
  ) {}


   /*<========================================>
           🏳️   Create Task Start    🏳️
   ===========================================>*/ 

   // task.service.ts
   async createtask(createTaskDto: CreateTaskDto): Promise<{ message: string; task: Task }> {

        const { title, description, user, priority, status, deadline } = createTaskDto;

        const userEntity = await this.userRepository.findOne({ where: { username: user } });

        console.log("Assigned User Entity:", userEntity);

        if (!userEntity) {
            throw new NotFoundException('User not found');
        }

        // Create the task
        const task = this.taskRepository.create({
            title,
            description,
            priority: priority || TaskPriority.MEDIUM,
            status: status || TaskStatus.TODO,
            deadline: deadline,
            assignedUser: userEntity, 
        });

        const savedTask = await this.taskRepository.save(task);
        console.log("Saved Task:", savedTask);

        // this.eventEmitter.emit('task.created', savedTask);
        this.eventEmitter.emit('task.created', savedTask);

        return {
            message: 'Task created successfully',
            task: savedTask,
        };
    
    }


    /*<========================================>
             🚩   Create Task End      🚩
    ===========================================>*/
     /*<========================================>
           🏳️   Get All Task Start    🏳️
   ===========================================>*/ 
    async findAll(): Promise<Task[]> {
    return this.taskRepository.find({
        relations: ['assignedUser'],
        order: {
        id: 'DESC', // Sort by id descending (latest first)
        },
    });
    }

   /*<========================================>
             🚩   Get All Task End      🚩
    ===========================================>*/
    /*<========================================>
           🏳️   Update Task Start    🏳️
    ===========================================>*/ 
   async update(updateTaskDto: UpdateTaskDto,userId: number,taskId: number): Promise<{ message: string; task: Task }> {
       
       const task = await this.taskRepository.findOne({ where: { id: taskId } });
       
       if (!task) {
            throw new NotFoundException('Task not found');
        }


        if(updateTaskDto.user){

             const userEntity = await this.userRepository.findOne({ where: { username: updateTaskDto.user } });

             if (!userEntity) {
                 throw new NotFoundException('User not found');
             }

             task.assignedUser = userEntity;
        }


        // Update task properties
        Object.assign(task, updateTaskDto);

        // Save updated task
        await this.taskRepository.save(task);

        // Socket emit
        this.eventEmitter.emit('task.updated', task);

        return {
            message: 'Task updated successfully',
            task: task
        };
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
    /*<========================================>
           🏳️   Delete Task  Start    🏳️
    ===========================================>*/
   async delete(taskId: number): Promise<any> {

       const task = await this.taskRepository.findOne({ where: { id: taskId } });
       if (!task) {
           throw new NotFoundException('Task not found');
       }

       await this.taskRepository.remove(task);

       // Socket emit
       this.eventEmitter.emit('task.deleted', taskId);

       return { message: 'Task deleted successfully' };
   }
   /*<========================================>
            🚩   Delete Task End      🚩
   ===========================================>*/























}
