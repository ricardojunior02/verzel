import { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { MdMail, MdLock, MdArrowBack } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { Context } from '../../context';
import logo from '../../assets/logo.svg';
import './styles.css';

const adminSchema = Yup.object().shape({
  email: Yup.string().email('Formato de email inválido').required('E-mail é obrigatório'),
  password: Yup.string().required('Senha é obrigatória')
})

const Admin = () => {
  const [ errors, setErrors ] = useState({});
  const { handleLogin } = useContext(Context);
  const history = useHistory();

  const { register, handleSubmit } = useForm();

  const hanleLogin = async (data) => {
    
    try {
      await adminSchema.validate(data, {
        abortEarly: false
      })
      await handleLogin(data);
      history.push('/');
    } catch (error) {

      if(error instanceof Yup.ValidationError) {
        const validationErrors = {}
        error.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });

        return setErrors(validationErrors);
      }
      return alert(error.response.data.message)
    }
  }

  return (
   <div className="admin-container">
     <div className="logo">
      <img src={logo} alt="Logo devaria" />
     </div>
     <div className="form">
       <h3>Faça login e crie  módulos e aulas</h3>
       <form onSubmit={handleSubmit(hanleLogin)}>
         {errors.email && <p className="errors" >{errors.email}</p> }
         <div className={errors.email ? 'input errors' : 'input'} >
          <MdMail size={18} color={errors.email ? 'red' : 'var(--color-white)'} />
           <input type="text" placeholder="Digite um email" { ...register('email')} />
         </div>
        
         {errors.password && <p className="errors" >{errors.password}</p> }
         <div className={errors.password ? 'input errors' : 'input'}>
           <MdLock size={18} color={errors.password ? 'red' : 'var(--color-white)'} />
           <input type="password" placeholder="Digite sua senha" { ...register('password')} />
         </div>
        <button type="submit" >Entrar</button>
       </form>
       <Link to="/">
         <MdArrowBack size={20} color="var(--color-blue-light)" />
          Voltar ao início
       </Link>
     </div>
   </div>
  )
}


export default Admin;