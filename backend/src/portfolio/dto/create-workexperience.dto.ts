import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateWorkExperienceDTO {
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
}