import { UserRepository } from "../repositories/user-repository.js";
import type { CreateUserDTO } from '../dtos/create-user-dto.js';

export class UserService {
  private userRepository = new UserRepository();

  async createUser(data: CreateUserDTO) {
    const userExists = await this.userRepository.findByEmail(data.email);

    if (userExists) {
      throw new Error('User already exists');
    }

    const user = await this.userRepository.create(data);

    return user;
  }
}