import { type PrismaClient } from "@prisma/client";

export const countriesSeed = async (prisma: PrismaClient) => {
  try {
    const countries: CountrySeeder[] = [
      {
        name: "Honduras",
        A2: "HN",
        A3: "HND",
        code: "334",
      },
      {
        name: "Guatemala",
        A2: "GT",
        A3: "GTM",
        code: "320",
      },
      {
        name: "Costa Rica",
        A2: "CR",
        A3: "CRI",
        code: "188",
      },
      {
        name: "Panama",
        A2: "PA",
        A3: "PAN",
        code: "591",
      },
      {
        name: "El Salvador",
        A2: "SV",
        A3: "SLV",
        code: "222",
      },
      {
        name: "Nicaragua",
        A2: "NI",
        A3: "NIC",
        code: "558",
      },
      {
        "name": "Belice",
        "A2": "BL",
        "A3": "BLZ",
        "code": "084"
      }
    ];

    await prisma.country.createMany({
      data: countries,
    });

    console.log("🌱 Countries seed completed!");
  } catch (error) {
    console.error("🌱 Error seeding countries:", error);
  }
};

type CountrySeeder = {
  name: string;
  A2: string;
  A3: string;
  code: string;
};
