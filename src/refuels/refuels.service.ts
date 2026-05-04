import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Refuel, RefuelDocument } from './schemas/refuel.schema';
import { CreateRefuelDto } from './dto/create-refuel.dto';
import { UsersService } from '../users/users.service';
import { VehiclesService } from '../vehicles/vehicles.service';

@Injectable()
export class RefuelsService implements OnModuleInit {
  constructor(@InjectModel(Refuel.name) private refuelModel: Model<RefuelDocument>) {}

  async onModuleInit() {
    const userId = new Types.ObjectId(UsersService.DEFAULT_USER_ID);
    const vehicleId = new Types.ObjectId(VehiclesService.DEFAULT_VEHICLE_ID);
    const exists = await this.refuelModel.exists({ userId, vehicleId });
    if (!exists) {
      await this.refuelModel.create([
        { mileage: 12000, liters: 42.5, cost: 265.3, location: '52.2297,21.0122', userId, vehicleId },
        { mileage: 12450, liters: 40.1, cost: 252.8, location: '50.0647,19.9450', userId, vehicleId },
        { mileage: 12900, liters: 43.7, cost: 274.15, location: '54.3520,18.6466', userId, vehicleId },
      ]);
    }
  }

  async findByUserAndVehicle(userId: string, vehicleId: string): Promise<RefuelDocument[]> {
    return this.refuelModel
      .find({
        userId: new Types.ObjectId(userId),
        vehicleId: new Types.ObjectId(vehicleId),
      })
      .sort({ createdAt: -1 })
      .exec();
  }

  async create(dto: CreateRefuelDto): Promise<RefuelDocument> {
    return this.refuelModel.create({
      ...dto,
      userId: new Types.ObjectId(dto.userId),
      vehicleId: new Types.ObjectId(dto.vehicleId),
    });
  }
}
