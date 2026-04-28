import { prisma } from '../prisma/prisma-client.js';
import type { CreateUserDTO } from '../dtos/create-user-dto.js';

export class UserRepository {
  async create(data: CreateUserDTO) {
    return prisma.user.create({
      data,
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }
}