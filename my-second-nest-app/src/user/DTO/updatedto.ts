import { IsEmail, IsString } from "class-validator";

export class updateDto{

    @IsString()
    username:string;

    @IsEmail()
    email:string;

    @IsString()
    password:string;
}