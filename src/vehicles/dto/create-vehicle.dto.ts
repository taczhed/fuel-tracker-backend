import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { FuelType } from '../schemas/vehicle.schema';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(FuelType)
  fuelType: FuelType;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
