import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RefuelsService } from './refuels.service';
import { CreateRefuelDto } from './dto/create-refuel.dto';

@Controller('refuels')
export class RefuelsController {
  constructor(private readonly refuelsService: RefuelsService) {}

  @Get()
  findAll(@Query('userId') userId: string, @Query('vehicleId') vehicleId: string) {
    return this.refuelsService.findByUserAndVehicle(userId, vehicleId);
  }

  @Post()
  create(@Body() dto: CreateRefuelDto) {
    return this.refuelsService.create(dto);
  }
}
