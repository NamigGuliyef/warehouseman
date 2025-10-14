import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class WarehousemanDTO {
  @ApiProperty()
  @IsNotEmpty()
  fullName: string;
  @ApiProperty()
  @IsNotEmpty()
  position: string;
  @ApiProperty()
  @IsNotEmpty()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  phone: string;
  @ApiProperty()
  @IsOptional()
  profBackground?: string;
  @ApiProperty()
  @IsOptional()
  technologyFocus?: string;
  @ApiProperty()
  @IsOptional()
  experienceYears?: string;
  @ApiProperty()
  @IsOptional()
  managedProducts?: string;
  @ApiProperty()
  @IsOptional()
  solvedLogistics?: string;
  @ApiProperty()
  @IsOptional()
  efficiencyRate?: string;
}

export class SkillDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  level: string;
  @ApiProperty()
  @IsNotEmpty()
  category: string;
  @ApiProperty()
  warehousemanId: string;
}

export class WorkExperienceDTO {
  @ApiProperty()
  @IsNotEmpty()
  company: string;
  @ApiProperty()
  @IsNotEmpty()
  position: string;
  @ApiProperty()
  @IsNotEmpty()
  period: string;
  @ApiProperty()
  @IsNotEmpty()
  description: string;
  @ApiProperty()
  @IsNotEmpty()
  location: string;
  @ApiProperty()
  warehousemanId: string;
}

export class CertificateDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  date: string;
  @ApiProperty()
  @IsNotEmpty()
  organization: string;
  @ApiProperty()
  @IsNotEmpty()
  image: string;
}

export class BlogPostDTO {
  @ApiProperty()
  @IsNotEmpty()
  author?: string;

  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  category: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  readTime: string;

  @ApiProperty()
  @IsOptional()
  image: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  @Transform(({ value }) => value === true || value === 'true')
  active: boolean;
}

export class JobDTO { 

  @ApiProperty()
  @IsNotEmpty()
  company: string;

  @ApiProperty()
  @IsNotEmpty()
  position: string;

  @ApiProperty()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  salary: string;

  @ApiProperty()
  @IsNotEmpty()
  deadline: string;

  @ApiProperty()
  @IsNotEmpty()
  link: string;

  @ApiProperty()
  @IsNotEmpty()
  work_schedule: string;
  
  @ApiProperty()
  @IsNotEmpty()
  priority : string

  @ApiProperty()
  @IsNotEmpty()
  description : string

  @ApiProperty()
  @IsNotEmpty()
  requirements : string

  @ApiProperty()
  @IsNotEmpty()
  status: string;
}
