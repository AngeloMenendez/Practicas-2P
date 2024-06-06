import axios from 'axios';
// Define el tipo de los datos que esperas recibir *(Opcional).
interface Plato {
    id: number;
    nombre?: string;
    estado: string;
}

// Función para realizar solicitudes GET usando Axios
export const fetchDataWithAxios = async (url: string): Promise<Plato> => {
    try {
        const response = await axios.get<Plato>(url);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error('Error al obtener datos con Axios: ' + error.message);
        } else {
            throw new Error('Error al obtener datos con Axios');
        }
    }
};

// Función para realizar solicitudes GET usando Ky
export const fetchDataWithKy = async (url: string): Promise<Plato> => {
    try {
        // Utiliza importación dinámica para importar ky
        const ky = await import('ky');
        const response = await ky.default.get(url).json<Plato>();
        return response;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('Error al obtener datos con Ky: ' + error.message);
        } else {
            throw new Error('Error al obtener datos con Ky');
        }
    }
};