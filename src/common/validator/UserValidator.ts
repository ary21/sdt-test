import { z } from "zod";
import { Prisma } from "@prisma/client";

export const UserDTO = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  timeZone: z.string(),
  birthday: z.string().optional(),
});

export type UserCreateInput = z.infer<typeof UserDTO>;

export const validateUserCreate = (data: Prisma.UserCreateInput) => {
  return UserDTO.safeParse(data);
};

export const validateUserUpdate = (data: Prisma.UserUpdateInput) => {
  return UserDTO.safeParse(data);
};
