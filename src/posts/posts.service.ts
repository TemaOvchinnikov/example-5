import { Post, Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  async findAll(): Promise<Post[]> {
    return this.prisma.post.findMany({
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        images: {
          select: {
            id: true,
            imagePuth: true,
          },
        },
        likes: {
          take: 5,
          select: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
        },
        _count: {
          select: {
            likes: true,
            images: true,
            share: true,
            comments: true,
          },
        },
      },
    });
  }

  async findOne(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput,
  ): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  async remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
