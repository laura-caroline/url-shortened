-- CreateTable
CREATE TABLE "TB_USER" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "refreshToken" VARCHAR(255),
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "TB_USER_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TB_SHORTENED_URL" (
    "id" TEXT NOT NULL,
    "originalUrl" VARCHAR(255) NOT NULL,
    "shortUrl" VARCHAR(255) NOT NULL,
    "userId" VARCHAR,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "countAccessUrl" INTEGER NOT NULL DEFAULT 0,
    "refreshToken" VARCHAR(255),
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "TB_SHORTENED_URL_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TB_USER_email_key" ON "TB_USER"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TB_SHORTENED_URL_shortUrl_key" ON "TB_SHORTENED_URL"("shortUrl");

-- AddForeignKey
ALTER TABLE "TB_SHORTENED_URL" ADD CONSTRAINT "TB_SHORTENED_URL_userId_fkey" FOREIGN KEY ("userId") REFERENCES "TB_USER"("id") ON DELETE CASCADE ON UPDATE CASCADE;
