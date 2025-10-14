import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateSkillDTO {
    @ApiProperty()
    @IsNotEmpty()
    name: string;
    @ApiProperty()
    @IsNotEmpty()
    level: string;
    @ApiProperty()
    @IsNotEmpty()
    category: string;
}