import { prismaClient } from "../lib/db";
import {createHmac,randomBytes} from "node:crypto";
import jwt from "jsonwebtoken";

const secret="dkrajput"

export interface CreateUserPayload{
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
};

export interface getUserTokenPayload{
    email: string;
    password: string;
};

class userService{

    private static generateHash(salt:string,password:string){  
        const hashedPassword=createHmac('sha256',salt).update(password).digest('hex');
        return hashedPassword;
    }

    public static createUser(payload:CreateUserPayload){
        const {firstName,lastName,email,password} = payload;

        const salt=randomBytes(32).toString('hex');
        const hashedPassword=userService.generateHash(salt,password);

        return prismaClient.user.create({
            data:{
                firstName,
                lastName:lastName ?? "",
                email,
                salt,
                password:hashedPassword,
                profileImageURL:"",
            }
        });
    }

   
    private static getUserByEmail(email:string){
        return prismaClient.user.findUnique({where:{email}});
    }

    public static async getUserToken(payload:getUserTokenPayload){
        const {email, password} = payload;
        const user= await userService.getUserByEmail(email);

        if(!user) throw new Error("User not found");

        const userSalt=user.salt
        const userHashedPassword=userService.generateHash(userSalt,password);

        if(userHashedPassword!==user.password) throw new Error("Invalid password");

        const token=jwt.sign({
            email:user.email,
            userId:user.id
        },secret);

        return token;
    }
}

export default  userService;