"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const hash_1 = require("../src/utils/hash");
const dataUserDefault = {
    email: "userdefault@gmail.com",
    password: "userdefault",
    name: "USER DEFAULT",
};
const prisma = new client_1.PrismaClient();
const createUserDefault = async () => {
    try {
        const passwordEncrypted = await (0, hash_1.hashData)(dataUserDefault.password);
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
    }
    catch (error) {
        console.log("Error seed", error);
    }
};
(async () => {
    await createUserDefault();
})();
//# sourceMappingURL=seed.js.map