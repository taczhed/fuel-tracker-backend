import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Refuel, RefuelDocument } from './schemas/refuel.schema';
import { CreateRefuelDto } from './dto/create-refuel.dto';

@Injectable()
export class RefuelsService {
  constructor(@InjectModel(Refuel.name) private refuelModel: Model<RefuelDocument>) {}

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
