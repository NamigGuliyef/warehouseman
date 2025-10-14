import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

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
    @IsNotEmpty()
    warehousemanId: string;
}