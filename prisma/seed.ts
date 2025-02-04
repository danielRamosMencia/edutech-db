import { PrismaClient } from "@prisma/client";
import { countriesSeed } from "./seeds/countries-seed";
import { departmentsSeed } from "./seeds/departments-seed";
import { municipalitiesSeed } from "./seeds/municipalities-seed";
import { districtsSeed } from "./seeds/districts-seed";
import { gradesSeed } from "./seeds/grades-seed";
import { signaturesSeed } from "./seeds/signatures-seed";
import { registrationStatusSeed } from "./seeds/registration-status-seed";
import { institutionsSeed } from "./seeds/institutions-seed";
import { permissionsSeed } from "./seeds/permissions-seed";
import { rolesSeed } from "./seeds/roles-seed";
import { rolePermissionsSeed } from "./seeds/role-permissions-seed";
import { employeesSeed } from "./seeds/employees-seed";
import { portalUsersSeed } from "./seeds/portal-users-seed";
import { tutorsSeed } from "./seeds/tutors-seed";
import { gradeSignaturesSeed } from "./seeds/grade-signatures-seed";
import { studentsSeed } from "./seeds/students-seed";
import { registrationsSeed } from "./seeds/registrations-seed";
import { studentRegistrationSeed } from "./seeds/student-registrations-seed";
import { customSeed } from "./seeds/custom-seed";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");
  await mockSeeds();
}

async function mockSeeds() {
  await countriesSeed(prisma);
  await departmentsSeed(prisma);
  await municipalitiesSeed(prisma);
  await districtsSeed(prisma);
  await gradesSeed(prisma);
  await signaturesSeed(prisma);
  await gradeSignaturesSeed(prisma);
  await registrationStatusSeed(prisma);
  await institutionsSeed(prisma);
  await permissionsSeed(prisma);
  await rolesSeed(prisma);
  await rolePermissionsSeed(prisma);
  await employeesSeed(prisma);
  await portalUsersSeed(prisma);
  await tutorsSeed(prisma);
  await studentsSeed(prisma);
  await registrationsSeed(prisma);
  await studentRegistrationSeed(prisma);
  await customSeed(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
