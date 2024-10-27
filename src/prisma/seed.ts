import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      email: "john.doe@example.com",
      firstName: "John",
      lastName: "Doe",
      timeZone: "America/New_York",
      birthDate: new Date("1990-01-01"),
      lastSendAt: new Date(),
    },
    {
      email: "jane.doe@example.com",
      firstName: "Jane",
      lastName: "Doe",
      timeZone: "Australia/Melbourne",
      birthDate: new Date("1995-01-01"),
      lastSendAt: new Date(),
    },
  ];

  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }

  console.log("Seeding selesai.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
