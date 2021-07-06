import { compare } from 'bcrypt';
import Admin from '../models/Admin';
import jwt from 'jsonwebtoken';

class SessionController {
  async store(request, response){
    const { email, password } = request.body;

    const admin = await Admin.findOne({ email });

    if(!admin){
      return response.status(400).json({ message: 'Email ou senha inválidos'});
    }

    const passwordMath = await compare(password, admin.password);

    if(!passwordMath){
      return response.status(400).json({ message: 'Email ou senha inválidos'});
    }

    const token = jwt.sign({}, process.env.SECRET_TOKEN, {
      subject: admin.id,
      expiresIn: '7d'
    });

    const adminData = {
      email: admin.email,
      isAdmin: admin.isAdmin
    }

    return response.status(200).json({
      adminData,
      token,
    });
  }
}


export default new SessionController();