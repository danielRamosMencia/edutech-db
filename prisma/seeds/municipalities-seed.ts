import { type PrismaClient } from "@prisma/client";
import { municipalitiesData } from "./data/municipalities-data";

export const municipalitiesSeed = async (prisma: PrismaClient) => {
  try {
    await prisma.$transaction(async (trx) => {
      const municipalities: MunicipalitySeeder[] = [];

      for (const municipality of municipalitiesData) {
        const department = await trx.department.findUniqueOrThrow({
          where: {
            code: municipality.department_code,
          },
        });

        municipalities.push({
          name: municipality.name,
          code: municipality.code,
          department_id: department.id,
        });
      }

      await trx.municipality.createMany({
        data: municipalities,
      });
    });

    console.log("🌱 Municipalities seed completed!");
  } catch (error) {
    console.error("🌱 Error seeding municipalities:", error);
  }
};

type MunicipalitySeeder = {
  name: string;
  code: string;
  department_id: string;
};
