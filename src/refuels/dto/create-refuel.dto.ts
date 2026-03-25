import { IsNumber, IsString, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class CreateRefuelDto {
  @IsNumber()
  @Min(0)
  mileage: number;

  @IsNumber()
  @Min(0)
  liters: number;

  @IsNumber()
  @Min(0)
  cost: number;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  vehicleId: string;
}
