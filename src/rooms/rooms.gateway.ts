import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { RoomsService } from './rooms.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';

@WebSocketGateway({
  origin: '*',
})
export class RoomsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly roomsService: RoomsService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.headers.authorization; // Assuming token is in "Bearer <token>" format
      const decoded = this.jwtService.verify(token, { secret: 'SECRET' });

      // Assuming your user service has a method to find a user by their ID
      const user = await this.usersService.findOneById(decoded.sub);

      client['user'] = user; // Attach the user to the socket
    } catch (error) {
      // Handle authentication error
      console.log(error.message);

      client.disconnect();
    }
  }

  @SubscribeMessage('findAllRooms')
  async findAll() {
    return this.roomsService.findAll();
  }

  @SubscribeMessage('createRoom')
  async create(
    @MessageBody() createRoomDto: CreateRoomDto,
    @ConnectedSocket() client: Socket,
  ) {
    createRoomDto.users = [];
    createRoomDto.users.push(client['user']);

    const room = await this.roomsService.create(createRoomDto);

    this.server.emit('room', room);

    return room;
  }

  @SubscribeMessage('joinRoom')
  async join(
    @MessageBody('room') room: Room,
    @ConnectedSocket() client: Socket,
  ) {
    this.handleConnection;

    client.join(room.name);
    client.emit('roomJoined', `You have joined the room: ${room.name}`);
    const updates = new UpdateRoomDto();
    updates.users = [];
    updates.users.push(client['user']);
    await this.roomsService.update(room.id, updates);

    return client['user'].username;
  }
}
