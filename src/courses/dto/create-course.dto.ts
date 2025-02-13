import { IsOptional, IsString } from "class-validator";

export class CreateCourseDto {
    @IsString()
    title: string;
    @IsString()
    description: string;
    @IsOptional()
    createdAt: Date;
}
