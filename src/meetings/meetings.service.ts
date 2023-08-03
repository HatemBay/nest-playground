import { Injectable } from '@nestjs/common';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { Meeting } from './entities/meeting.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MeetingsService {
  constructor(
    @InjectRepository(Meeting) private meetingRepository: Repository<Meeting>,
  ) {}

  async create(createMeetingDto: CreateMeetingDto): Promise<Meeting> {
    const newMeeting = this.meetingRepository.create(createMeetingDto);
    return await this.meetingRepository.save(newMeeting);
  }

  async findAll() {
    return await this.meetingRepository.find();
  }

  async findOne(id: number): Promise<Meeting> {
    try {
      return await this.meetingRepository.findOneByOrFail({ id: id });
    } catch (err) {
      throw err;
    }
  }

  async update(
    id: number,
    updateMeetingDto: UpdateMeetingDto,
  ): Promise<Meeting> {
    const meeting = await this.findOne(id);
    if (meeting) {
      meeting.zoomUrl = updateMeetingDto.zoomUrl;
    }
    return await this.meetingRepository.save(meeting);
  }

  async remove(id: number): Promise<Meeting> {
    const meeting = await this.findOne(id);

    return await this.meetingRepository.remove(meeting);
  }
}
