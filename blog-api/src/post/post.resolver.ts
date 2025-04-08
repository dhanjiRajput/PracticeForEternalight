import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from 'src/user/entities/post.entity';

@Resolver(() => Post)
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query(() => [Post])
  posts() {
    return this.postService.findAll();
  }

  @Query(() => Post)
  post(@Args('id', { type: () => Int }) id: number) {
    return this.postService.findOne(id);
  }

  @Mutation(() => Post)
  createPost(
    @Args('title') title: string,
    @Args('content') content: string,
    @Args('authorId', { type: () => Int }) authorId: number,
  ) {
    return this.postService.create({ title, content, author: { id: authorId } as any });
  }
}