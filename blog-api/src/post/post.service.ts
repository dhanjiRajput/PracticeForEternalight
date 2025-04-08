import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/user/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
  private userRepository: Repository<User>
  ) {}

  findAll(): Promise<Post[]> {
    return this.postRepository.find({ relations: ['author'] });
  }

  findOne(id: number): Promise<Post | null> {
    return this.postRepository.findOne({ where: { id }, relations: ['author'] });
  }

  async create(postData: Partial<Post>): Promise<Post> {
    const post = this.postRepository.create(postData);
    
    if (postData.author && typeof postData.author === 'object' && 'id' in postData.author) {
      const author = await this.userRepository.findOne({
        where: { id: postData.author.id },
      });

      if (!author) {
        throw new NotFoundException('Author not found');
      }

      post.author = author;
    }

    return this.postRepository.save(post);
  }
}
