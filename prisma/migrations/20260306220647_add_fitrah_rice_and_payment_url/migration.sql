-- AlterTable
ALTER TABLE "campaigns" ADD COLUMN     "fitrahRiceKg" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "paymentUrl" TEXT;
