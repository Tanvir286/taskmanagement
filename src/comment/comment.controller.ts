import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/createcomment.dto';
import { JwtAuthGuard } from 'src/jwt-auth.guard';

@Controller('comment')
export class CommentController {

constructor(private readonly commentService: CommentService) {}


   /*<========================================>
          🏳️   Create Comment Start    🏳️
   ===========================================>*/
        
    @Post('create')
    createComment(@Body() createCommentDto: CreateCommentDto) {
        return this.commentService.createComment(createCommentDto);
    }
    /*<========================================>
            🚩   Create Comment End      🚩
    ===========================================>*/  
    /*<========================================>
          🏳️   Get All Comment Start    🏳️
   ===========================================>*/

   @Get('all')
   getAllComments() {
       return this.commentService.getAllComments();
   }
   /*<========================================>
          🚩   Get All Comment End    🚩
   ===========================================>*/
    /*<========================================>
          🏳️   Get Single Comment Start    🏳️
   ===========================================>*/

   @Get('singlecomment/:id')
   getCommentById(@Param('id') id: string) {
       return this.commentService.getCommentById(Number(id));
   }
   /*<========================================>
          🚩   Get Single Comment End    🚩
   ===========================================>*/
    /*<========================================>
          🏳️   Delete Comment Start    🏳️
   ===========================================>*/

   @Delete('delete/:id')
   deleteComment(@Param('id') id: string) {
       return this.commentService.deleteComment(Number(id));
   }

}
