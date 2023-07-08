import {IsEmail, IsString} from 'class-validator';
export class UserDto{

    @IsEmail()
    @IsString()
    email:string;

    @IsString()
    password:string;
}