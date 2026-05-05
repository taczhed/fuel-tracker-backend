import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { RefuelsService } from './refuels.service';
import { CreateRefuelDto } from './dto/create-refuel.dto';
import { UpdateRefuelDto } from './dto/update-refuel.dto';

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRefuelDto) {
    return this.refuelsService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.refuelsService.delete(id);
  }
}
