import { type PrismaClient } from "@prisma/client";
import { generateId } from "./utils/generate-id";

export const registrationsSeed = async (prisma: PrismaClient) => {
  try {
    await prisma.$transaction(async (trx) => {
      const students = await trx.student.count();
      const registrationsAmount = students * 2; // Means two registrations for each student
      const defaulValue = 500.0;
      const status = await trx.registrationStatus.findUniqueOrThrow({
        where: {
          code: "000",
        },
      });

      const registrations: RegistrationSeeder[] = Array.from(
        { length: registrationsAmount },
        (_, index) => {
          const code = generateId(25);
          const registration: RegistrationSeeder = {
            value: defaulValue,
            code: code,
            comment: `Comentario matrícula ${index}`,
            registration_status_id: status.id,
          };

          return registration;
        }
      );

      await prisma.registration.createMany({
        data: registrations,
      });
    });

    console.log("🌱 Registrations seed completed!");
  } catch (error) {
    console.error("🌱 Error seeding registrations:", error);
  }
};

type RegistrationSeeder = {
  value: number;
  code: string;
  comment?: string;
  registration_status_id: string;
};
