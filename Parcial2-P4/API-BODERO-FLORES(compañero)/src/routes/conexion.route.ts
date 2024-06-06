import express from 'express';
import cors from 'cors';
// Importar la función a usar
//AXIOS
//import { fetchDataWithAxios as axios, fetchDataWithAxios } from './libreria.route';

//KY
import { fetchDataWithKy as ky, fetchDataWithKy } from './libreria.route';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const data = await ky('http://10.42.3.55:3000/plato');
    res.json(data);
  } catch (error) {
    res.status(500).send('Error al obtener datos: ' + (error as Error).message);
  }
});
/* 
app.get('/', async (req, res) => {
  try {
    const data = await axios ('http://10.42.3.55:3000/plato');
    res.json(data);
  } catch (error) {
    res.status(500).send('Error al obtener datos: ' + (error as Error).message);
  }
});
 */
export default app;