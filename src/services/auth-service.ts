import { UserRepository } from "../repositories/user-repository.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

export class AuthService {
    private userRepository = new UserRepository();

    async login(email: string, password: string) {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new Error('Invalid credentials');
        }

        if (user.password !== password) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign({ sub: user.id, email: user.email }, process.env.SECRET as string, { expiresIn: 3600 });

        return { token };
    }
}