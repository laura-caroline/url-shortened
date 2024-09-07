import { Prisma, PrismaClient } from "@prisma/client";
import { IDataUserDefault } from "./seed.interface";
import { hashData } from "src/utils/hash";

const dataUserDefault: IDataUserDefault = {
  email: "userdefault@gmail.com",
  password: "userdefault",
  name: "USER DEFAULT",
};
const prisma = new PrismaClient();

const createUserDefault = async () => {
  try {
    const passwordEncrypted = await hashData(dataUserDefault.password);
    console.log("Seeding base...");
    await prisma.user.upsert({
      where: {
        email: dataUserDefault.email,
      },
      create: {
        email: dataUserDefault.email,
        name: dataUserDefault.name,
        password: passwordEncrypted,
      },
      update: {
        email: dataUserDefault.email,
        name: dataUserDefault.name,
        password: passwordEncrypted,
      },
    });
  } catch (error) {
    console.log("Error seed", error);
  }
};

(async () => {
  await createUserDefault();
})();
