import { type PrismaClient } from "@prisma/client";

export const rolePermissionsSeed = async (prisma: PrismaClient) => {
  try {
    await prisma.$transaction(async (trx) => {
      const permissions = await trx.permission.findMany();
      const admRole = await trx.role.findUniqueOrThrow({
        where: {
          code: "ADM",
        },
      });

      const rolePermissions: RolePermissionsSeeder[] = permissions.map(
        (permission) => ({
          role_id: admRole.id,
          permission_id: permission.id,
        })
      );

      await trx.rolePermissions.createMany({
        data: rolePermissions,
      });
    });

    console.log("🌱 Role permissions seed completed!");
  } catch (error) {
    console.error("🌱 Error seeding role permissions:", error);
  }
};

type RolePermissionsSeeder = {
  role_id: string;
  permission_id: string;
};
