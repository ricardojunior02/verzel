import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as Yup  from 'yup';
import { Context } from '../../context';

import api from '../../api';
import Header from '../../components/Header';

import './styles.css';

const createSchema = Yup.object().shape({
  name: Yup.string().required('Nome da aula é obrigatório'),
  class_date: Yup.date().required('Data é obrigatória').min(new Date(), 'A data deve ser futura'),
  moduleId: Yup.string().required('Módulo é obrigatório')
});

const CreateClasses = () => {
  const [ visibleClass, setVisibleClass] = useState(false);
  const [ errors, setErrors] = useState({});
  const [ modules, setmodules ] = useState([]);
  const {register, handleSubmit } = useForm();
  const { authenticate } = useContext(Context)

  const history = useHistory();
  
  const loadModules = async () => {
    const { data } = await api.get('/modules');
    return setmodules(data);
  }

  useEffect(() => {
    loadModules()

    if(!authenticate){
      history.push('/')
    }
  }, [authenticate, history])

  const handleCreateClasses = async (data) => {
    try {

      await createSchema.validate(data, {
        abortEarly: false
      });

      await api.post(`/classes/${data.moduleId}`, data);
      setVisibleClass(true); 
      return history.push('/');
    } catch (error) {
      if(error instanceof Yup.ValidationError) {
        const validationErrors = {}
        error.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });

        if(validationErrors.class_date ===  'class_date must be a `date` type, but the final value was: `Invalid Date` (cast from the value `""`).'){
          const messageDate = 'Data inválida';
          validationErrors.class_date = messageDate;
        }
        return setErrors(validationErrors);
      }

      return alert('Erro ao criar uma aula, tente novamente!')
    }
  }

  return (
    <>
      <Header setVisibleClass={visibleClass} />
      <div className="create-classes-container">
      <h1>Cadastrar aula</h1>
      <div className="create-classes-content">
       
        <form onSubmit={handleSubmit(handleCreateClasses)}>
          <p>Digite nome da aula</p>
          <p>e selecione um módulo</p>
          {errors.name &&  <p className="errors">{errors.name}</p> }
          <input type="text" id="name" placeholder="Nome" className={errors.name ? 'errors' : ''} 
            {...register('name')}
          />

          {errors.class_date &&  <p className="errors">{errors.class_date}</p> }
          <input type="datetime-local" color="var(--color-white)" className={errors.class_date ? 'errors' : ''} 
            {...register('class_date')}
          />

          {errors.moduleId &&  <p className="errors">{errors.moduleId}</p> }
          <select className={errors.moduleId ? 'errors' : ''} 
            {...register('moduleId')} >
            <option value="">Selecione--</option>
            {modules.map(item => (
              <option key={item._id} value={item._id}>{item.name}</option>
            ))}
          </select>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
      </div>
    </>
    
  )
}

export default CreateClasses;