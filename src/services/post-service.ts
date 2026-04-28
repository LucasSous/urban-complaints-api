import type { CreatePostDTO } from "../dtos/create-post-dto.js";
import { PostRepository } from "../repositories/post-repository.js";

export class PostService {
    private postRepository = new PostRepository();

    async createPost(data: CreatePostDTO) {
        return await this.postRepository.create(data);
    }

    async getAllPosts() {
        return await this.postRepository.getAll();
    }

    async likePost(postId: string) {
        const post = await this.postRepository.findById(postId);

        if (!post) {
            throw new Error("Post not found");
        }

        return await this.postRepository.likePost(postId);
    }
}