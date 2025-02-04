import { type PrismaClient } from "@prisma/client";
import { hashSync } from "bcryptjs";
import { generateId } from "./utils/generate-id";

export const portalUsersSeed = async (prisma: PrismaClient) => {
  try {
    await prisma.$transaction(async (trx) => {
      const employees = await trx.employee.findMany();
      const role = await trx.role.findFirstOrThrow({
        where: {
          code: "ADM",
        },
      });

      const defaultPassword = hashSync("Admin12.", 10);

      const portalUsers: PortalUserSeeder[] = [];

      let idx = 0;
      employees.forEach((employee) => {
        portalUsers.push({
          username: `usuario-${idx}`,
          code: `USR-${idx}`,
          email: `usuario_${idx}@example.com`,
          password: defaultPassword,
          recovery_token: generateId(16),
          employee_id: employee.id,
          role_id: role.id,
        });

        idx++;
      });

      await trx.portalUser.createMany({
        data: portalUsers,
      });
    });

    console.log("🌱 Portal users seed completed!");
  } catch (error) {
    console.error("🌱 Error seeding portal users:", error);
  }
};

export type PortalUserSeeder = {
  username: string;
  code: string;
  email: string;
  password: string;
  recovery_token: string;
  employee_id: string;
  role_id?: string;
};
