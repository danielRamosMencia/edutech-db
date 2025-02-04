import { type PrismaClient } from "@prisma/client";
import { type PortalUserSeeder } from "./portal-users-seed";
import { type EmployeeSeeder } from "./employees-seed";
import { generateId } from "./utils/generate-id";
import { hashSync } from "bcryptjs";

export const customSeed = async (prisma: PrismaClient) => {
  try {
    await prisma.$transaction(async (trx) => {
      const centralDistrict = await trx.municipality.findUniqueOrThrow({
        where: {
          code: "0801",
        },
      });

      const institution = await trx.institution.findFirstOrThrow();

      const customEmployee: EmployeeSeeder = {
        name: "Daniel",
        middle_name: "Eduardo",
        last_name: "Ramos",
        middle_last_name: "Mencía",
        dni: "0801-2001-11408",
        rtn: "0801-2001-114081",
        address: "Tegucigalpa",
        email: "dramos@example.com",
        phone: "+504 3158-6331",
        birthdate: new Date("2001-05-10"),
        municipality_id: centralDistrict.id,
        institution_id: institution.id,
      };

      const created = await trx.employee.create({
        data: customEmployee,
      });

      const defaultPassword = hashSync("Admin12.", 10);

      const role = await trx.role.findFirstOrThrow({
        where: {
          code: "ADM",
        },
      });

      const dramosUser: PortalUserSeeder = {
        username: "dramos",
        code: "USR-DRAMOS",
        email: "dramos@example.com",
        password: defaultPassword,
        recovery_token: generateId(16),
        employee_id: created.id,
        role_id: role.id,
      };

      await trx.portalUser.create({
        data: dramosUser,
      });
    });

    console.log("🌱 Custom seed completed!");
  } catch (error) {
    console.error("🌱 Error seeding custom:", error);
  }
};
