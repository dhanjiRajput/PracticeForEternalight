import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from './post.entity';

@ObjectType()
@Entity()    
export class User {
  @Field(() => Int) 
  @PrimaryGeneratedColumn() 
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Post], { nullable: true }) 
  @OneToMany(() => Post, post => post.author)
  posts: Post[];
}
