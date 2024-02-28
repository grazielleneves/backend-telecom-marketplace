import express, { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Pool } from 'pg';

import pool from './database';

const app = express();
app.use(express.json());
const router = Router();

interface LoginRequestBody {
  email: string;
  password: string;
}

app.post('/login', async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
  try {
    const { email, password } = req.body;

    // Buscar usuário pelo email
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (user.rowCount === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Comparar senha criptografada
    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Senha inválida.' });
    }

    // Gerar token de autenticação
    const token = jwt.sign({ id: user.rows[0].id, email }, 'secreto', {
      expiresIn: '1h' // token expira em 1 hora
    });

    // Responder com o token
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor.');
  }
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default router;