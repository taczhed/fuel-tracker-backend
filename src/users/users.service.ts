import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  static readonly DEFAULT_USER_ID = '000000000000000000000001';

  async onModuleInit() {
    const exists = await this.userModel.findById(UsersService.DEFAULT_USER_ID);
    if (!exists) {
      await this.userModel.create({
        _id: new Types.ObjectId(UsersService.DEFAULT_USER_ID),
        username: 'Jan Kowalski',
      });
    }
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(new Types.ObjectId(id)).exec();
  }

  async create(dto: CreateUserDto): Promise<UserDocument> {
    return this.userModel.create(dto);
  }
}
