import { type PrismaClient } from "@prisma/client";

export const studentRegistrationSeed = async (prisma: PrismaClient) => {
  try {
    await prisma.$transaction(async (trx) => {
      const registrations = await trx.registration.findMany();
      const students = await trx.student.findMany();

      const studentRegistrations: StudentRegistrationSeeder[] = [];

      let idx = 0;
      let studentIdx = 0;
      registrations.forEach((registration) => {
        studentRegistrations.push({
          student_id: students[studentIdx].id,
          registration_id: registration.id,
        });

        idx++;
        if (idx % 2 == 0) {
          studentIdx++;
        }
      });

      await trx.studentRegistrations.createMany({
        data: studentRegistrations,
      });
    });

    console.log("🌱 Student registrations seed completed!");
  } catch (error) {
    console.error("🌱 Error seeding student registrations:", error);
  }
};

type StudentRegistrationSeeder = {
  student_id: string;
  registration_id: string;
};
