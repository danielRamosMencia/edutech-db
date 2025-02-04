import { type PrismaClient } from "@prisma/client";

export const rolesSeed = async (prisma: PrismaClient) => {
  try {
    const roles: RoleSeeder[] = [
      {
        code: "ADM",
        name: "Administrador",
      },
    ];

    await prisma.role.createMany({
      data: roles,
    });

    console.log("🌱 Roles seed completed!");
  } catch (error) {
    console.error("🌱 Error seeding roles:", error);
  }
};

type RoleSeeder = {
  name: string;
  code: string;
};
