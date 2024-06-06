import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Obtener todos los registros activos
router.get('/', async (req, res) => {
    const registros = await prisma.registro.findMany({
        where: { estado: 'Activo' },
        include: {
            plato: true, 
            paciente: true 
        }
    });
    res.json(registros);
});

// Crear un nuevo registro
router.post('/', async (req, res) => {
    const { platoId, pacienteId, fecha, hora, numeroCaloriasConsumidas, numeroDePorciones } = req.body;
    const registro = await prisma.registro.create({
        data: {
            platoId,
            pacienteId,
            fecha,
            hora,
            numeroCaloriasConsumidas,
            numeroDePorciones,
        }
    });
    res.json(registro);
});

// Obtener un registro específico por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const registro = await prisma.registro.findUnique({
        where: { id: parseInt(id) },
        include: {
            plato: true,  
            paciente: true  
        }
    });
    if (registro) {
        res.json(registro);
    } else {
        res.status(404).json({ error: "Registro no encontrado" });
    }
});

// Actualizar un registro
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { fecha, hora, numeroCaloriasConsumidas, numeroDePorciones } = req.body;
    const actualizarRegistro = await prisma.registro.update({
        where: { id: parseInt(id) },
        data: {
            fecha,
            hora,
            numeroCaloriasConsumidas,
            numeroDePorciones,
        }
    });
    res.json(actualizarRegistro);
});

// Marcar un registro como eliminado
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.registro.update({
        where: { id: parseInt(id) },
        data: { estado: 'Eliminado' }
    });
    res.json({ message: "Registro marcado como eliminado" });
});

export default router;
