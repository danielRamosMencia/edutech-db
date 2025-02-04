import { PrismaClient } from "@prisma/client";

export const gradesSeed = async (prisma: PrismaClient) => {
  try {
    const grades: GradeSeeder[] = [
      {
        name: "Primero",
        code: "PRIMERO",
        grade_number: 1,
      },
      {
        name: "Segundo",
        code: "SEGUNDO",
        grade_number: 2,
      },
      {
        name: "Tercero",
        code: "TERCERO",
        grade_number: 3,
      },
      {
        name: "Cuarto",
        code: "CUARTO",
        grade_number: 4,
      },
      {
        name: "Quinto",
        code: "QUINTO",
        grade_number: 5,
      },
      {
        name: "Sexto",
        code: "SEXTO",
        grade_number: 6,
      },
      {
        name: "Séptimo",
        code: "SEPTIMO",
        grade_number: 7,
      },
      {
        name: "Octavo",
        code: "OCTAVO",
        grade_number: 8,
      },
      {
        name: "Noveno",
        code: "NOVENO",
        grade_number: 9,
      },
      {
        name: "Decimo",
        code: "DECIMO",
        grade_number: 10,
      },
      {
        name: "Once",
        code: "ONCE",
        grade_number: 11,
      },
      {
        name: "Doce",
        code: "DOCE",
        grade_number: 12,
      },
    ];

    await prisma.grade.createMany({
      data: grades,
    });

    console.log("🌱 Grades seed completed!");
  } catch (error) {
    console.error("🌱 Error seeding grades:", error);
  }
};

type GradeSeeder = {
  name: string;
  code: string;
  grade_number: number;
};
