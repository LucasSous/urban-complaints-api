import type { CreatePostDTO } from "../dtos/create-post-dto.js";
import { prisma } from '../prisma/prisma-client.js';

export class PostRepository {
    async create(data: CreatePostDTO) {
        return prisma.post.create({
            data,
        });
    }

    async findById(id: string) {
        return prisma.post.findUnique({
            where: { id },
        });
    }

    async getAll() {
        return prisma.post.findMany({
            orderBy: {
                likes: 'desc',
            },
        });
    }

    async likePost(postId: string) {
        return prisma.post.update({
            where: { id: postId },
            data: { likes: { increment: 1 } },
        });
    }
}