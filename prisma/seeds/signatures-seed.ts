import { type PrismaClient } from "@prisma/client";

export const signaturesSeed = async (prisma: PrismaClient) => {
  try {
    const signatures: SignatureSeeder[] = [
      {
        code: "ESP",
        name: "Español",
      },
      {
        code: "MAT",
        name: "Matemáticas",
      },
      {
        code: "CNA",
        name: "Ciencias Naturales",
      },
      {
        code: "CSO",
        name: "Ciencias Sociales",
      },
      {
        code: "COM",
        name: "Computación",
      },
      {
        code: "ING",
        name: "Inglés",
      },
      {
        code: "ART",
        name: "Artes",
      },
      {
        code: "EFI",
        name: "Eduación Física",
      },
      {
        code: "ALG",
        name: "Algebra",
      },
      {
        code: "TRI",
        name: "Trigonométria",
      },
      {
        code: "ECI",
        name: "Educación Cívica",
      },
      {
        code: "HIS",
        name: "Historia",
      },
      {
        code: "LEG",
        name: "Lenguas Extranjeras",
      },
      {
        code: "PRO",
        name: "Programación",
      },
      {
        code: "TAL",
        name: "Taller de Hardware",
      },
      {
        code: "LOG",
        name: "Lógica Simbólica",
      },
      {
        code: "AIN",
        name: "Auditotría Informática",
      },
      {
        code: "FIL",
        name: "Filosofía",
      },
      {
        code: "SOC",
        name: "Sociología",
      },
      {
        code: "EVO",
        name: "Educación Vocacional",
      },
      {
        code: "FIN",
        name: "Financiera",
      },
      {
        code: "CON",
        name: "Contabilidad",
      },
      {
        code: "ACO",
        name: "Auditoría Contable",
      },
      {
        code: "BIO",
        name: "Biología",
      },
      {
        code: "EEC",
        name: "Educación Ecológica",
      },
      {
        code: "FIS",
        name: "Física Elemental",
      },
      {
        code: "TEC",
        name: "Tecnología",
      },
    ];

    await prisma.signature.createMany({
      data: signatures,
    });

    console.log("🌱 Signatures seed completed!");
  } catch (error) {
    console.error("🌱 Error seeding signatures:", error);
  }
};

type SignatureSeeder = {
  name: string;
  code: string;
};
