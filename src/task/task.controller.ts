import { Body, Controller, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

    /*<========================================>
             🏳️   Create Task Start    🏳️
    ===========================================>*/
    @Post('create')
    @UseGuards(JwtAuthGuard, RolesGuard)   
    @Roles('admin')           
    create(@Body() createTaskDto: CreateTaskDto, @Req() req: any) {
        const userId = req.user.id;
        return this.taskService.create(createTaskDto, userId);
    }
   /*<========================================>
       🚩   Create Task End      🚩
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

}
