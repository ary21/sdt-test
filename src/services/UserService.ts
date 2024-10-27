import prisma from "../prisma/client";
import { Prisma, User } from "@prisma/client";
import axios from "axios";
import { subHours } from "date-fns";

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

  async getUsersWithBirthdayToday(timeZone: string) {
    const now = new Date();
    const todayMonth = now.getUTCMonth() + 1;
    const todayDay = now.getUTCDate();

    return await prisma.user.findMany({
      where: {
        timeZone,
        AND: [
          {
            AND: [
              {
                birthDate: {
                  gte: new Date(
                    `${now.getFullYear()}-${todayMonth}-${todayDay}T00:00:00.000Z`
                  ),
                },
              },
              {
                birthDate: {
                  lt: new Date(
                    `${now.getFullYear()}-${todayMonth}-${
                      todayDay + 1
                    }T00:00:00.000Z`
                  ),
                },
              },
            ],
          },
          {
            OR: [
              { lastSendAt: null },
              { lastSendAt: { lt: subHours(now, 24) } },
            ],
          },
        ],
      },
    });
  }

  async sendBirthdayMessage(userId: number, email: string, fullName: string) {
    try {
      await axios.post(
        `https://email-service.digitalenvision.com.au`,
        {
          email,
          text: `Hey, ${fullName} it's your birthday`,
        }
      )
  
      await prisma.user.update({
        where: { id: userId },
        data: { lastSendAt: new Date() },
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export default new UserService();
