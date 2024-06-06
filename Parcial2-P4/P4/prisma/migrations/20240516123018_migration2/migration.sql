-- AlterTable
ALTER TABLE "Paciente" ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'Activo';

-- AlterTable
ALTER TABLE "Plato" ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'Activo';

-- AlterTable
ALTER TABLE "Registro" ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'Activo';
