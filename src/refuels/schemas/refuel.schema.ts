import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RefuelDocument = HydratedDocument<Refuel>;

@Schema({ timestamps: true })
export class Refuel {
  @Prop({ required: true })
  mileage: number;

  @Prop({ required: true })
  liters: number;

  @Prop({ required: true })
  cost: number;

  @Prop()
  location?: string;

  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  vehicleId: Types.ObjectId;
}

export const RefuelSchema = SchemaFactory.createForClass(Refuel);
