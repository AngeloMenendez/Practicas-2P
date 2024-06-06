import server from 'express'
import { tutorRouter, tutoradoRouter, tutoriaRouter } from './routes' 
import cors from 'cors'

const app = server()

app.use(cors());

app.use(server.json())

app.use('/tutor', tutorRouter)
app.use('/tutorado', tutoradoRouter)
app.use('/tutoria', tutoriaRouter)

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});