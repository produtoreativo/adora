import { Controller, Get, Body, Post } from '@nestjs/common';
import { EventDto } from './event.dto';
import { GithubService } from './github.service';

@Controller('events')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}


  @Post()
  createEvent(@Body() eventDto: EventDto) {
    return this.githubService.createEvent(eventDto);
  }

}
