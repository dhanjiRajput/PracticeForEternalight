import { IsEmail, IsString } from "class-validator";

export class createDto{

    @IsString()
    username:string;

    @IsEmail()
    email:string;

    @IsString()
    password:string;
}