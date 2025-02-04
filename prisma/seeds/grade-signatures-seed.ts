import { type PrismaClient } from "@prisma/client";
import { randIndex } from "./utils/rand-index";

export const gradeSignaturesSeed = async (prisma: PrismaClient) => {
  try {
    await prisma.$transaction(async (trx) => {
      const grades = await trx.grade.findMany();
      const signatures = await trx.signature.findMany();

      const gradeSignatures: GradeSignaturesSeeder[] = [];

      grades.forEach((grade) => {
        // signatures are randomized, so some signatures will no make much sense in real life according to the grades
        const amount = randIndex(10, signatures.length - 1);
        for (let i = 0; i < amount; i++) {
          gradeSignatures.push({
            grade_id: grade.id,
            signature_id: signatures[i].id,
          });
        }
      });

      await trx.gradeSignatures.createMany({
        data: gradeSignatures,
      });
    });

    console.log("🌱 Grade signatures seed completed!");
  } catch (error) {
    console.error("🌱 Error seeding grade signatures:", error);
  }
};

type GradeSignaturesSeeder = {
  grade_id: string;
  signature_id: string;
};
