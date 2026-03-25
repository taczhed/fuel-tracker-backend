import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type VehicleDocument = HydratedDocument<Vehicle>;

@Schema()
export class Vehicle {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
