import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export enum FuelType {
  GASOLINE = 'gasoline',
  DIESEL = 'diesel',
}

export type VehicleDocument = HydratedDocument<Vehicle>;

@Schema()
export class Vehicle {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: FuelType })
  fuelType: FuelType;

  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
