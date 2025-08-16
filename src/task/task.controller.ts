import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateTaskUserDto } from './dto/update-task-user.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

    /*<========================================>
             🏳️   Create Task Start    🏳️
    ===========================================>*/

    @Post('create')
    @UseGuards(JwtAuthGuard)
    @Roles('admin') 
    createtask(@Body() createTaskDto: CreateTaskDto, ) {
        
        return this.taskService.createtask(createTaskDto);
    }
   /*<========================================>
       🚩   Create Task End      🚩
   ===========================================>*/
   /*<========================================>
         🏳️   Get All Task Start    🏳️
   ===========================================>*/

   @Get('getall')
   async getAll() {
       return this.taskService.findAll();
   }
   
   /*<========================================>
       🚩  Get All Task  End      🚩
   ===========================================>*/
    /*<========================================>
         🏳️   Get User Task Start    🏳️
   ===========================================>*/

   @Get('getuser/:userId')
   async getUserTasks(@Param('userId') userId: number) {
       return this.taskService.findByUserId(userId);
   }
    /*<========================================>
       🚩  Get User Task  End      🚩
   ===========================================>*/

   /*<========================================>
         🏳️   Update Task Start    🏳️
   ===========================================>*/
    @Put('update/:taskId')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    update(@Param('taskId') taskId: number, @Body() updateTaskDto: UpdateTaskDto, @Req() req: any) {
        const userId = req.user.id;
        return this.taskService.update(updateTaskDto, userId, taskId);
    }
   /*<========================================>
       🚩   Update Task End      🚩
   ===========================================>*/
   /*<========================================>
         🏳️   Update Task by Us Start    🏳️
   ===========================================>*/

   @Put('updatebyuser/:taskId')
   @UseGuards(JwtAuthGuard)
   updatebyuser(@Param('taskId') taskId: number, @Body() updateTaskUserDto: UpdateTaskUserDto, @Req() req: any) {
       const userId = req.user.id;
       return this.taskService.updatebyuser(updateTaskUserDto, userId, taskId);
   }
   /*<========================================>
        🚩   Update Task by User Start    🚩
   ===========================================>*/
   /*<========================================>
         🏳️   Delete Task Start    🏳️
   ===========================================>*/

   @Delete('delete/:taskId')
   @UseGuards(JwtAuthGuard, RolesGuard)
   @Roles('admin')
   delete(@Param('taskId') taskId: number) {
       return this.taskService.delete(taskId);
   }
   /*<========================================>
        🚩   Delete Task End    🚩
   ===========================================>*/

}
