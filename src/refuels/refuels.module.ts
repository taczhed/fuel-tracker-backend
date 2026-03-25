import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RefuelsController } from './refuels.controller';
import { RefuelsService } from './refuels.service';
import { Refuel, RefuelSchema } from './schemas/refuel.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Refuel.name, schema: RefuelSchema }])],
  controllers: [RefuelsController],
  providers: [RefuelsService],
})
export class RefuelsModule {}
