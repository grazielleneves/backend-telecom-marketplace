import express, { Request, Response } from 'express';
import registerRouter from './register'; 

const app = express();

app.use(express.json());

app.use('/register', registerRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
