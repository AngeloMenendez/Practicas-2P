import server from 'express'
import { platoRouter, pacienteRouter, registroRouter } from './routes' 

const app = server()

app.use(server.json())

app.use('/plato', platoRouter)
app.use('/paciente', pacienteRouter)
app.use('/registro', registroRouter)


app.listen(3000, () => {
    console.log('Server on port 3000')
})