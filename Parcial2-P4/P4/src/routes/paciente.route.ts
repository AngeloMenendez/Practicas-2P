import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    const pacientes = await prisma.paciente.findMany({
        where: { estado: 'Activo' }
    });
    
    res.json(pacientes);
});

router.post('/', async (req, res) => {
    const { nombre, estado } = req.body;
    const paciente = await prisma.paciente.create({
        data: {
            nombre,
            estado
        }
    });
    res.json(paciente);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params; 
    const paciente = await prisma.paciente.findUnique({
        where: {
            id: parseInt(id)
        }
    });
    if (paciente) {
        res.json(paciente);
    } else {
        res.status(404).json({ error: "Paciente no encontrado" });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, estado } = req.body;
    const actualizarPaciente = await prisma.paciente.update({
        where: {
            id: parseInt(id)
        },
        data: {
            nombre,
            estado
        }
    });
    res.json(actualizarPaciente);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.paciente.update({
        where: { 
            id: parseInt(id)
        },
        data: {
            estado: 'Eliminado',
        }
    });
    res.json({ message: "Paciente marcado como eliminado" });
});

export default router;
