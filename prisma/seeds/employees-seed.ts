import { type PrismaClient } from "@prisma/client";
import { randDate } from "./utils/rand-date";
import { randIndex } from "./utils/rand-index";

export const employeesSeed = async (prisma: PrismaClient) => {
  try {
    await prisma.$transaction(async (trx) => {
      const institution = await trx.institution.findFirstOrThrow();
      const muncipality = await trx.municipality.findMany();

      const employees: EmployeeSeeder[] = Array.from(
        { length: 30 },
        (_, index) => {
          const munx = randIndex(0, muncipality.length - 1);
          const mun = muncipality[munx];

          const birthDate = randDate(1990, 2000);

          const dni = `${mun.code}-${birthDate.getFullYear()}-${randIndex(
            10000,
            99999
          )}`;
          const rtn = dni + "1";

          const phone = `+504 ${randIndex(1000, 9999)}-${randIndex(
            1000,
            9999
          )}`;

          const employee: EmployeeSeeder = {
            name: `Empleado ${index}`,
            last_name: `Apellido ${index}`,
            dni: dni,
            rtn: rtn,
            address: "Calle 123",
            email: `empleado_${index}@example.com`,
            phone: phone,
            birthdate: birthDate,
            municipality_id: mun.id,
            institution_id: institution.id,
          };

          return employee;
        }
      );

      await trx.employee.createMany({
        data: employees,
      });
    });

    console.log("🌱 Employee seed completed!");
  } catch (error) {
    console.error("🌱 Error seeding employees:", error);
  }
};

export type EmployeeSeeder = {
  name: string;
  middle_name?: string;
  last_name: string;
  middle_last_name?: string;
  dni: string;
  rtn?: string;
  address?: string;
  email?: string;
  phone?: string;
  birthdate?: Date;
  municipality_id: string;
  institution_id: string;
};
