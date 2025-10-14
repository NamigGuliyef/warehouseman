import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateWarehousemanDTO {
    @ApiProperty()
    @IsNotEmpty()
    firstName: string
    @ApiProperty()
    @IsNotEmpty()
    lastName: string
    @ApiProperty()
    @IsNotEmpty()
    email: string
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


export class UpdateSkillDTO {
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


export class UpdateWorkExperienceDTO {
    @ApiProperty()
    @IsNotEmpty()
    company: string
    @ApiProperty()
    @IsNotEmpty()
    position: string
    @ApiProperty()
    @IsNotEmpty()
    period: string
    @ApiProperty()
    @IsNotEmpty()
    description: string
    @ApiProperty()
    @IsNotEmpty()
    location: string
    @ApiProperty()
    warehousemanId: string
}


export class UpdateCertificateDTO {
    @ApiProperty()
    @IsNotEmpty()
    name: string;
    @ApiProperty()
    @IsNotEmpty()
    date: string;
    @ApiProperty()
    @IsNotEmpty()
    issuer: string;
    @ApiProperty()
    @IsNotEmpty()
    image: string;
    @ApiProperty()
    warehousemanId: string
}


export class UpdateBlogPostDTO {

    @ApiProperty()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    date: Date;

    @ApiProperty()
    @IsNotEmpty()
    readTime: string;

    @ApiProperty()
    @IsNotEmpty()
    category: string;

    @ApiProperty()
    @IsNotEmpty()
    image: string;

    @ApiProperty()
    @IsNotEmpty()
    content: string;
    @ApiProperty()
    @IsNotEmpty()
    author?: string;
}


export class UpdateJobDTO {
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
    deadline: string;

    @ApiProperty()
    @IsNotEmpty()
    type: string;

    @ApiProperty()
    @IsNotEmpty()
    salary: string;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    requirements: string;

    @ApiProperty()
    @IsNotEmpty()
    link: string;

    @ApiProperty()
    @IsNotEmpty()
    postedDate: string;

    @ApiProperty()
    @IsNotEmpty()
    status: string;

    @ApiProperty()
    @IsNotEmpty()
    urgent: boolean;
}