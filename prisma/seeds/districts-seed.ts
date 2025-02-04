import { type PrismaClient } from "@prisma/client";

export const districtsSeed = async (prisma: PrismaClient) => {
  try {
    const districts: DistrictSeeder[] = Array.from(
      { length: 10 },
      (_, index) => {
        const district: DistrictSeeder = {
          code: `DIST-${index}`,
          name: `Distrito ${index}`,
        };

        return district;
      }
    );

    await prisma.district.createMany({
      data: districts,
    });

    console.log("🌱 Districts seed completed!");
  } catch (error) {
    console.error("🌱 Error seeding districts:", error);
  }
};

type DistrictSeeder = {
  name: string;
  code: string;
};
