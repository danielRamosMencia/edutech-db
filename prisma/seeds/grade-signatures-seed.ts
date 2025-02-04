import { type PrismaClient } from "@prisma/client";
import { randIndex } from "./utils/rand-index";

export const gradeSignaturesSeed = async (prisma: PrismaClient) => {
  try {
    // this signatures are randomized, so some signatures will no make much sense in real life
    await prisma.$transaction(async (trx) => {
      const grades = await trx.grade.findMany();
      const signatures = await trx.signature.findMany();

      const gradeSignatures: GradeSignaturesSeeder[] = [];

      grades.forEach((grade) => {
        const idx = randIndex(0, signatures.length - 1);
        const signature = signatures[idx];

        gradeSignatures.push({
          grade_id: grade.id,
          signature_id: signature.id,
        });
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
