import express, { Request, Response } from 'express';
import registerRouter from './register'; 
import loginRouter from './login'; 
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3003',
  credentials: true, // Permitir envio de cookies e credenciais de autenticação
}));

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.use(express.json());

app.use('/register', registerRouter);
app.use('/login', loginRouter);

