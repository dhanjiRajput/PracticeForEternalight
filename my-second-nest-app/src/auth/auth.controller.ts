import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    constructor(private authservice:AuthService){}

    @UseGuards(AuthGuard('local'))
    @Post("/login")
    async loginuser(@Request() req:any){
        return this.authservice.login(req.user);
    };
};