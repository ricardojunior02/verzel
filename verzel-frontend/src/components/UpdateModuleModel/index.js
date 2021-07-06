import { useForm } from 'react-hook-form';
import api from '../../api';
import './styles.css';

const UpdateModuleModel = ({ moduleInfo, setShowModalUpdate, setReload }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: moduleInfo.name
    }
  })
  
  const updateModule = async (data) => {
    try {
      await api.put(`/modules/${moduleInfo._id}`, {
        name: data.name || moduleInfo.name 
       });
      setShowModalUpdate(false);
      setReload(true)
    } catch (error) {
      
    }
    
  }
  return (
  <div className="update-model-container">
      <main className="content">
        <h3>Atualize o nome do módulo</h3>
          <form onSubmit={handleSubmit(updateModule)}>
            <input type="text" placeholder="nome" {...register('name')} />
            <div className="buttons-actions">
              <button className="update" type="submit">Atualizar</button>
              <button className="cancel" type="button" onClick={() => setShowModalUpdate(false)}>Cancelar</button>
            </div>  
          </form>
      </main>
  </div>
    
  )
}

export default UpdateModuleModel;