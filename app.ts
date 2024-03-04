import express, { Request, Response } from 'express';
import registerRouter from './register'; 
import loginRouter from './login'; 
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // Permitir envio de cookies e credenciais de autenticação
}));

app.use(express.json());

app.use(registerRouter);
app.use(loginRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


