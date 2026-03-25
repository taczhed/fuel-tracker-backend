import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Vehicle, VehicleDocument } from './schemas/vehicle.schema';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@Injectable()
export class VehiclesService {
  constructor(@InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>) {}

  async findByUser(userId: string): Promise<VehicleDocument[]> {
    return this.vehicleModel.find({ userId: new Types.ObjectId(userId) }).exec();
  }

  async create(dto: CreateVehicleDto): Promise<VehicleDocument> {
    return this.vehicleModel.create({
      name: dto.name,
      userId: new Types.ObjectId(dto.userId),
    });
  }
}
