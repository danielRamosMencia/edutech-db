import { type PrismaClient } from "@prisma/client";
import { randIndex } from "./utils/rand-index";

export const institutionsSeed = async (prisma: PrismaClient) => {
  try {
    await prisma.$transaction(async (trx) => {
      const municipality = await trx.municipality.findMany();
      const district = await trx.district.findMany();

      const randMun = randIndex(0, municipality.length - 1);
      const randDis = randIndex(0, district.length - 1);

      const mun_id = municipality[randMun].id;
      const mun_code = municipality[randMun].code;
      const dis_id = district[randDis].id;

      const rtn = `${mun_code}-9999-123456`;

      const institution: InstitutionSeeder = {
        name: "Institución 1",
        code: "INST-001",
        rtn: rtn,
        address: "Calle 123",
        phone: "+504 2222-2222",
        email: "institution@example.com",
        contact_name: "Daniel Eduardo Ramos Mencía",
        contact_phone: "+504 3333-3333",
        contact_email: "daniel@example.com",
        municipality_id: mun_id,
        district_id: dis_id,
      };

      await prisma.institution.create({
        data: institution,
      });
    });

    console.log("🌱 Institutions seed completed!");
  } catch (error) {
    console.error("🌱 Error seeding institutions:", error);
  }
};

type InstitutionSeeder = {
  name: string;
  code: string;
  rtn: string;
  address: string;
  phone: string;
  email: string;
  contact_name?: string;
  contact_phone?: string;
  contact_email?: string;
  municipality_id: string;
  district_id: string;
};
