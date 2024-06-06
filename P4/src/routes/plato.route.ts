import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    const platos = await prisma.plato.findMany({
        where: { estado: 'Activo' }
    });
    
    res.json(platos);
});

router.post('/', async (req, res) => {
    const { nombre, estado } = req.body; 
    const plato = await prisma.plato.create({
        data: {
            nombre,
            estado
        }
    });
    res.json(plato);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params; 
    const plato = await prisma.plato.findUnique({
        where: {
            id: parseInt(id)
        }
    });
    if (plato) {
        res.json(plato);
    } else {
        res.status(404).json({ error: "Plato no encontrado" });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, estado } = req.body; 
    const actualizarPlato = await prisma.plato.update({
        where: {
            id: parseInt(id)
        },
        data: {
            nombre,
            estado
        }
    });
    res.json(actualizarPlato);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.plato.update({
        where: { 
            id: parseInt(id)
        },
        data: {
            estado: 'Eliminado',
        }
    });
    res.json({ message: "Plato marcado como eliminado" });
});

export default router;
