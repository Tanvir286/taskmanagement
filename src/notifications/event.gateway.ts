import { WebSocketGateway, WebSocketServer, SubscribeMessage, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OnEvent } from '@nestjs/event-emitter';

@WebSocketGateway({ cors: true })
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  // Join room
  @SubscribeMessage('join-board')
  handleJoinBoard(@ConnectedSocket() client: Socket, @MessageBody() boardId: string) {
    client.join(boardId);
    console.log(`Client ${client.id} joined board ${boardId}`);
  }

  // Task created
  @OnEvent('task.created')
  handleTaskCreated(task: any) {
    this.server.emit('task.created', task);
  }

  // Task updated
  @OnEvent('task.updated')
  handleTaskUpdated(task: any) {
    this.server.emit('task.updated', task);
  }

  // Task deleted
  @OnEvent('task.deleted')
  handleTaskDeleted(payload: { id: number }) {
    this.server.emit('task.deleted', payload); 
  }


  // Task updated by user
  @OnEvent('task.updatedbyuser')
  handleTaskUpdatedByUser(task: any) {
    this.server.emit('task.updatedbyuser', task);
  }








}


  
  



