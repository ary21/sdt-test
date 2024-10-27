require("dotenv").config();
import { Queue } from "bullmq";
import prisma from "./prisma/client";
import UserService from "./services/UserService";
import { emit } from "process";

export const birthdayQueue = new Queue("birthdayQueue", {
  connection: {
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT ? +process.env.REDIS_PORT : 6379,
    password: process.env.REDIS_PASSWORD || undefined,
  },
});

export async function scheduleBirthdayMessages() {
  const timeZones = await prisma.user.findMany({
    select: { timeZone: true },
    distinct: ["timeZone"],
  });

  await Promise.all(
    timeZones.map(async ({ timeZone }) => {
      const users = await UserService.getUsersWithBirthdayToday(timeZone);
      await Promise.all(
        users.map(async (user) => {
          const userBirthTime = new Date(`${user.birthDate}T09:00:00`);
          const userBirthTimeInTimeZone = new Date(
            userBirthTime.toLocaleString("en-US", { timeZone })
          );

          const delay = userBirthTimeInTimeZone.getTime() - Date.now();
          if (delay > 0) {
            await birthdayQueue.add(
              "sendBirthdayMessage",
              {
                userId: user.id,
                email: user.email,
                fullName: `${user.firstName} ${user.lastName}`,
              },
              { delay }
            );
          }
        })
      );
    })
  );
}

birthdayQueue.add("repeatSchedule", {}, { repeat: { every: 60 * 60 * 1000 } });
