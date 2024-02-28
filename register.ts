import express, { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import pool from './database';

const app = express();
app.use(express.json());
const router = Router();

type UserType = 'client' | 'service-provider' | 'asset-provider';

interface RegisterRequestBody {
  username: string;
  email: string;
  password: string;
  userType: UserType;
}

app.post('/register', async (req: Request<{}, {}, RegisterRequestBody>, res: Response) => {
  try {
    const { username, email, password, userType } = req.body;

    // Hash da senha antes de armazenar no banco de dados
    const saltRounds = 10; //rodadas de caracteres aleatórios
    const hashedPassword = await bcrypt.hash(password, saltRounds); //hash criptográfico

    // Inserir usuário no banco de dados
    const newUser = await pool.query(
      'INSERT INTO users (username, email, password, userType) VALUES ($1, $2, $3, $4) RETURNING id, username, email, user_type',
      [username, email, hashedPassword, userType]
    );

    // Responder com o usuário recém-criado
    res.status(201).json(newUser.rows[0]);
  } catch (err: unknown) {
    // Tratar erros, como chave duplicada
    if ((err as any).code === '23505') {
      return res.status(409).json({ error: 'Email já cadastrado.' });  
    }  
    else if(err instanceof Error){
      console.error(err.message);
      res.status(500).json({error: 'Erro no servidor.' });
    }
  }
});

export default router;