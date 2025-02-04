import type { PrismaClient } from "@prisma/client";
import { randDate } from "./utils/rand-date";
import { generateId } from "./utils/generate-id";
import { randIndex } from "./utils/rand-index";

export const studentsSeed = async (prisma: PrismaClient) => {
  try {
    await prisma.$transaction(async (trx) => {
      // students birthdates are also randomized, so some students age will no make much sense in real life
      const grades = await trx.grade.findMany();
      const tutors = await trx.tutor.findMany();
      const municipalities = await trx.municipality.findMany();

      const students: StudentSeeder[] = [];

      let idx = 0;
      let gradeIdx = 0;
      tutors.forEach((tutor) => {
        const grade = grades[gradeIdx];
        const municipalityIdx = randIndex(0, municipalities.length - 1);
        const municipality = municipalities[municipalityIdx];

        const birthdate = randDate(2005, 2010);
        const dni = `${
          municipality.code
        }-${birthdate.getFullYear()}-${randIndex(10000, 99999)}`;
        const code = generateId(25);
        let phone = undefined;

        if (idx % 2 == 0) {
          phone = `+504 ${randIndex(1000, 9999)}-${randIndex(1000, 9999)}`;
        }

        students.push({
          name: `Estudiante ${idx}`,
          last_name: `Apellido ${idx}`,
          code: code,
          dni: dni,
          address: `Calle ${idx} #${randIndex(1000, 9999)}`,
          phone: phone,
          municipality_id: municipality.id,
          grade_id: grade.id,
          tutor_id: tutor.id,
        });

        idx++;
        if (idx % 30 == 0) {
          gradeIdx++;
        }
      });

      await trx.student.createMany({
        data: students,
      });
    });

    console.log("🌱 Students seed completed!");
  } catch (error) {
    console.error("🌱 Error seeding students:", error);
  }
};

type StudentSeeder = {
  name: string;
  code: string;
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
  tutor_id?: string;
  grade_id?: string;
};
