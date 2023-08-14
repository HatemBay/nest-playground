import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import _ from 'lodash';

// @UseGuards(WsGuard)
@WebSocketGateway({
  cors: {
    origin: '*',
    // origin: 'http://localhost:3000',
    // credentials: true,
  },
})
export class MessagesGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly messagesService: MessagesService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.headers.authorization; // Assuming token is in "Bearer <token>" format
      const decoded = this.jwtService.verify(token, { secret: 'SECRET' });

      // Assuming your user service has a method to find a user by their ID
      const user = await this.usersService.findOneById(decoded.sub);

      client['user'] = user; // Attach the user to the socket
      console.log(client['user']);
    } catch (error) {
      // Handle authentication error
      console.log(error.message);

      client.disconnect();
    }
  }

  @SubscribeMessage('createMessage')
  async create(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    createMessageDto.user = _.cloneDeep(client['user']);

    const message = await this.messagesService.create(createMessageDto);

    this.server.emit('message', message);

    return message;
  }

  @SubscribeMessage('findAllMessages')
  findAll() {
    return this.messagesService.findAll();
  }

  @SubscribeMessage('join')
  joinRoom(
    @MessageBody('name') name: string,
    @ConnectedSocket() client: Socket,
  ) {
    return this.messagesService.identify(name, client.id);
  }

  @SubscribeMessage('typing')
  async typing(
    @MessageBody('isTyping') isTyping: boolean,
    @ConnectedSocket() client: Socket,
  ) {
    const name = await this.messagesService.getClientName(client.id);
    // const name = client['user'].username;

    client.broadcast.emit('typing', { name, isTyping });
    // this.server.emit('typing', { name, isTyping });
  }
}
