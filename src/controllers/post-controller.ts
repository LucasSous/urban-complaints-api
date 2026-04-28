import type { Request, Response } from 'express';
import { PostService } from "../services/post-service.js";

const postService = new PostService();

export class PostController {

    async create(req: Request, res: Response) {
        try {
            const { title, description, imageBase64, mimeType, address } = req.body;

            if (!imageBase64 || !mimeType) {
                return res.status(400).json({ error: "Image and MIME type are required" });
            }

            if (!imageBase64.match(/^[A-Za-z0-9+/=]+$/)) {
                return res.status(400).json({ error: "Base64 invalid" });
            }

            const base64Clean = imageBase64.replace(/^data:.+;base64,/, "");

            const post = await postService.createPost({
                title,
                description,
                imageBase64: base64Clean,
                mimeType,
                address,
            });

            return res.status(201).json(post);
        } catch (error: any) {
            return res.status(500).json({
                message: error.message,
            });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const posts = await postService.getAllPosts();
            return res.status(200).json(posts);
        } catch (error: any) {
            return res.status(500).json({
                message: error.message,
            });
        }
    }

    async likePost(req: Request, res: Response) {
        try {
            const { postId } = req.params;
            if (!postId) {
                return res.status(400).json({ error: "Post ID is required" });
            }

            const result = await postService.likePost(postId as string);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({
                message: error.message,
            });
        }
    }
}

