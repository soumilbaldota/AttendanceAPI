import { Controller, Get, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { UserDto } from './dtos/user.dto';
@Controller('attendance')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Body() body:UserDto): Promise<string> {
    return await this.appService.getAttendance(body);
  }
}
