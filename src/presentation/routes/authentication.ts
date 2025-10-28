import { Router } from 'express';
const router = Router();

// POST /auth/login - Autentica um jogador e retorna um token.
router.post('/auth/login', (req, res) => {
  const { email, senha } = req.body;
  
  if (email && senha) {
    res.status(200).json({ token: 'exemplo_de_token_jwt', jogadorId: 'uuid-exemplo' });
  } else {
    res.status(401).json({ erro: 'Email ou senha inválidos.' });
  }
});

module.exports = router;
