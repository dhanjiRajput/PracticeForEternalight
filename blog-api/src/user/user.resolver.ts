import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(()=>User)
export class UserResolver {
    constructor(private userservice:UserService){}

    @Query(()=>[User])
    findAll():Promise<User[]>{
        return this.userservice.findAll();
    }

    @Mutation(()=>User)
    createUser(@Args('name') name:string):Promise<User>{
        return this.userservice.create({name});
    }
}
