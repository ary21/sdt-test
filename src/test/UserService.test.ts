import prisma from "../prisma/client";
import UserService from "../services/UserService";

jest.mock("../prisma/client", () => ({
  user: {
    findMany: jest.fn(),
  },
}));

describe("User Service", () => {
  it("should return users with birthday today and valid lastSendAt", async () => {
    const mockUsers = [
      {
        id: 1,
        timeZone: "America/New_York",
        birthDate: new Date("2000-10-25"),
        lastSendAt: null,
      },
      {
        id: 2,
        timeZone: "America/New_York",
        birthDate: new Date("2000-10-25"),
        lastSendAt: new Date("2000-10-24"),
      },
    ];

    (prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

    const users = await UserService.getUsersWithBirthdayToday("America/New_York");
    expect(users).toEqual(mockUsers);
    expect(prisma.user.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ timeZone: "America/New_York" }),
      })
    );
  });
});
