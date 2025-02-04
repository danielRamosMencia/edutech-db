import { type PrismaClient } from "@prisma/client";
import { PermissionsData } from "./data/permissions-data";

export const permissionsSeed = async (prisma: PrismaClient) => {
  try {
    const permissions = Object.entries(PermissionsData).map(([name, code]) => ({
      name,
      code,
    }));

    await prisma.permission.createMany({
      data: permissions,
    });

    console.log("🌱 Permissions seed completed!");
  } catch (error) {
    console.error("🌱 Error seeding permissions:", error);
  }
};
