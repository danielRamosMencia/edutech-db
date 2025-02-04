import { type PrismaClient } from "@prisma/client";
import { randIndex } from "./utils/rand-index";

export const tutorsSeed = async (prisma: PrismaClient) => {
  try {
    await prisma.$transaction(async (trx) => {
      const grades = await trx.grade.count();
      const tutorsAmount = grades * 30; // Means 30 students per grade, and one tutor for each student
      const municipalities = await trx.municipality.findMany();

      const tutors: TutorSeeder[] = Array.from(
        { length: tutorsAmount },
        (_, index) => {
          const idx = randIndex(0, municipalities.length - 1);
          const munx = municipalities[idx];
          const birthDate = randIndex(1980, 2000);
          const dni = `${munx.code}-${birthDate}-${randIndex(10000, 99999)}`;

          const phone = `+504 ${randIndex(1000, 9999)}-${randIndex(
            1000,
            9999
          )}`;

          const tutor: TutorSeeder = {
            name: `Tutor ${index}`,
            last_name: `Apellido ${index}`,
            dni: dni,
            address: `Calle ${index} #${randIndex(1000, 9999)}`,
            phone: phone,
            email: `tutor${index}@gmail.com`,
            workplace: `Centro ${index}`,
            municipality_id: munx.id,
          };

          return tutor;
        }
      );

      await trx.tutor.createMany({
        data: tutors,
      });
    });

    console.log("🌱 Tutors seed completed!");
  } catch (error) {
    console.error("🌱 Error seeding tutors:", error);
  }
};

type TutorSeeder = {
  name: string;
  middle_name?: string;
  last_name: string;
  middle_last_name?: string;
  dni: string;
  address?: string;
  phone: string;
  email: string;
  workplace: string;
  municipality_id: string;
};
