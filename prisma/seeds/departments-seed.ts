import { type PrismaClient } from "@prisma/client";
import { departmentsData } from "./data/departments-data";

export const departmentsSeed = async (prisma: PrismaClient) => {
  try {
    await prisma.$transaction(async (trx) => {
      const country = await trx.country.findFirstOrThrow({
        where: {
          A3: "HND",
        },
      });

      const departments: DepartmentSeeder[] = departmentsData.map(
        (department) => {
          return {
            name: department.name,
            code: department.code,
            country_id: country.id,
          };
        }
      );

      await trx.department.createMany({
        data: departments,
      });
    });

    console.log("🌱 Departments seed completed!");
  } catch (error) {
    console.error("🌱 Error seeding departments:", error);
  }
};

type DepartmentSeeder = {
  name: string;
  code: string;
  country_id: string;
};
