import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './Entity/user.entity';
import { Repository } from 'typeorm';
import { createDto } from './DTO/createdto';
import { updateDto } from './DTO/updatedto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository:Repository<User>
    ){}

    getUser(){
        return this.userRepository.find();
    };

    getUserById(userId:number){
        return this.userRepository.findOne({where:{id:userId}});
    };

    createUser(createdto:createDto){
        return this.userRepository.save(createdto);
    };

    updateUser(updatedto:updateDto,userId:number){
        return this.userRepository.update(userId,updatedto);
    };

    deleteUser(userId:number){
        return this.userRepository.delete(userId);
    };

    getuserByEmail(email:string){
        return this.userRepository.findOne({where:{email}});
    }
}