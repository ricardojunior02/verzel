import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import api from '../../api';
import Header from '../../components/Header';
import './styles.css';

const moduleSchema = Yup.object().shape({
  name: Yup.string().required('Nome do módulo é obrigatório')
});

const CreateModule = () => {
  const [ visibleModule, setVisibleModule ] = useState(false);
  const [errors, setErrors ] = useState({});
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const handleCreateModule = async (data) => {

    try {
      await moduleSchema.validate(data, {
        abortEarly: false
      });

      await api.post('/modules', data);

      setVisibleModule(true);
     
      return history.push('/');
      
    } catch (error) {
      if(error instanceof Yup.ValidationError){
        const validationErrors = {}
        error.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });

        return setErrors(validationErrors)
      }

      return alert('Erro ao criar módulo, tente novamente!')
      
    }
  }

  return (
    <>
    <Header setVisibleModule={visibleModule} setVisibleClass={true} />
    <div className="create-module-container">
      <h1>Cadastrar módulo</h1>
      <div className="create-module-content">
       
        <form onSubmit={handleSubmit(handleCreateModule)}>
          <label htmlFor="name">Digite nome do módulo</label>
            {errors && <p className="error">{errors.name}</p> }
          <input type="text" id="name" placeholder="Nome" className={errors.name ? 'errors' : ''} 
            {...register('name')}
          />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
    </>
  )
}


export default CreateModule;