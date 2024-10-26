import { prisma } from "../prisma/client";
import { Prisma, User } from "@prisma/client";

class UserService {
  async createUser(
    data: Omit<User, "id" | "createdAt" | "updatedAt" | "lastSendAt">
  ): Promise<User> {
    return prisma.user.create({ data });
  }

  async getUserById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async getUserOneSpecific(where: Prisma.UserWhereInput): Promise<User | null> {
    return prisma.user.findFirst({ where });
  }

  async getAllUsers(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async updateUser(
    id: number,
    data: Partial<Omit<User, "id" | "createdAt" | "updatedAt" | "lastSendAt">>
  ): Promise<User | null> {
    return prisma.user.update({ where: { id }, data });
  }

  async deleteUser(id: number): Promise<User | null> {
    return prisma.user.delete({ where: { id } });
  }
}

export default new UserService();
