import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import * as Yup  from 'yup';

import api from '../../api';
import './styles.css';

const createSchema = Yup.object().shape({
  name: Yup.string().required('Nome da aula é obrigatório'),
  class_date: Yup.date().required('Data é obrigatória').min(new Date(), 'A data deve ser futura')
});

const CreateClassModal = ({ setReload, moduleId, setModalCreateClass}) => {
  const [ name, setName ] = useState('');
  const [ date, setDate ] = useState('');
  const [ errors, setErrors] = useState({});

  const handleCreateClasses = async (e) => {
    e.preventDefault();

    const data = {
      name,
      class_date: date,
    }

    try {
      await createSchema.validate( data, {
        abortEarly: false
      });

      await api.post(`/classes/${moduleId}`, data);

      setModalCreateClass(false);
      setReload(true)

    } catch (error) {
      console.log('ERROR', error)
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
    <div className="container-modal-create">
      <div className="create-classes-container">
        <h1>Cadastrar aula</h1>
        <div className="create-classes-content">
          <form onSubmit={handleCreateClasses}>
            <p>Digite nome da aula</p>
            {errors.name &&  <p className="errors">{errors.name}</p> }
            <input type="text" id="name" placeholder="Nome" className={errors.name ? 'errors' : ''} value={name} 
              onChange={e => setName(e.target.value)} />

            {errors.class_date &&  <p className="errors">{errors.class_date}</p> }
            <input type="datetime-local" color="var(--color-white)" className={errors.class_date ? 'errors' : ''} value={date} onChange={e => setDate(e.target.value)} />
            <button type="submit">Cadastrar</button>
          </form>
        </div>
        <button className="close" onClick={() => setModalCreateClass(false)}>
          <MdClose size={20} color="var(--color-white)" />
        </button>
      </div>
    </div>
    
  )
}

export default CreateClassModal;