import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { createDto } from './DTO/createdto';
import { updateDto } from './DTO/updatedto';

@Controller('user')
export class UserController {
    constructor(private userservice:UserService){}

    @Get()
    getUser(){
        return this.userservice.getUser();
    };

    @Get("/:userId")
    getuserById(@Param("userId",ParseIntPipe)userId:number){
        return this.userservice.getUserById(userId);
    };

    @Post()
    createUser(@Body() createdto:createDto){
        return this.userservice.createUser(createdto);
    };

    @Patch("/:userId")
    updateUser(@Body() updatedto:updateDto,@Param("userId",ParseIntPipe)userId:number){
        return this.userservice.updateUser(updatedto,userId);
    };

    @Delete("/:userId")
    deleteUser(@Param("userId",ParseIntPipe)userId:number){
        return this.userservice.deleteUser(userId);
    }
}
