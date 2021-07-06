import Admin from '../models/Admin';
import { verify } from 'jsonwebtoken'

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'É necessário login para acessar essa rota'});
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: id } = verify(token, process.env.SECRET_TOKEN);

    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(401).json({ message: 'Usuário não tem permissão para acessar essa rota'});
    }

    req.userId = id;

    next();
  } catch (error) {
    return res.status(400).json({ message: 'Token inválido'});
  }
}