import { type PrismaClient } from "@prisma/client";

export const registrationStatusSeed = async (prisma: PrismaClient) => {
  try {
    const registrationStatus: RegistratioStatusSeeder[] = [
      {
        code: "003",
        name: "Registrada",
      },
      {
        code: "002",
        name: "Solicitada",
      },
      {
        code: "001",
        name: "Pendiente",
      },
      {
        code: "000",
        name: "Aprobada",
      },
      {
        code: "111",
        name: "Rechazada",
      },
    ];

    await prisma.registrationStatus.createMany({
      data: registrationStatus,
    });

    console.log("🌱 Registration status seed completed!");
  } catch (error) {
    console.error("🌱 Error seeding registration status:", error);
  }
};

type RegistratioStatusSeeder = {
  name: string;
  code: string;
};
