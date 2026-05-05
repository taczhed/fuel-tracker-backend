import { IsNumber, IsString, IsOptional, Min } from 'class-validator';

export class UpdateRefuelDto {
  @IsNumber()
  @Min(0)
  @IsOptional()
  mileage?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  liters?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  cost?: number;

  @IsString()
  @IsOptional()
  location?: string;
}
