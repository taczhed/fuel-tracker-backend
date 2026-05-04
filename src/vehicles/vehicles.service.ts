import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Vehicle, VehicleDocument, FuelType } from './schemas/vehicle.schema';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class VehiclesService implements OnModuleInit {
  constructor(@InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>) {}

  static readonly DEFAULT_VEHICLE_ID = '000000000000000000000001';

  async onModuleInit() {
    const exists = await this.vehicleModel.findById(VehiclesService.DEFAULT_VEHICLE_ID);
    if (!exists) {
      await this.vehicleModel.create({
        _id: new Types.ObjectId(VehiclesService.DEFAULT_VEHICLE_ID),
        name: 'Default Car',
        fuelType: FuelType.GASOLINE,
        userId: new Types.ObjectId(UsersService.DEFAULT_USER_ID),
      });
    }
  }

  async findByUser(userId: string): Promise<VehicleDocument[]> {
    return this.vehicleModel.find({ userId: new Types.ObjectId(userId) }).exec();
  }

  async create(dto: CreateVehicleDto): Promise<VehicleDocument> {
    return this.vehicleModel.create({
      name: dto.name,
      fuelType: dto.fuelType,
      userId: new Types.ObjectId(dto.userId),
    });
  }
}
