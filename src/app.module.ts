import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUser } from './entity/authuser.entity';
import { TaskModule } from './task/task.module';
import { Task } from './entity/task.entity';
import { NotificationsModule } from './notifications/notifications.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CommentModule } from './comment/comment.module';
import { Comment } from './entity/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1943',
      database: 'taskmanagement',
      entities: [AuthUser,Task,Comment],
      synchronize: true,
    }),

    EventEmitterModule.forRoot(),
    AuthModule,
    TaskModule,
    NotificationsModule,
    CommentModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
