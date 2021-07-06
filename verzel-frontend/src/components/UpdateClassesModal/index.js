import { useForm } from 'react-hook-form';
import api from '../../api';
import '../UpdateModuleModel/styles.css';

const UpdateClassesModal = ({ classInfo, setShowModalUpdate, setReload }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: classInfo.name,
      class_date:  (() => {
        const newDate = String(classInfo.class_date).split('T');
        const hour = newDate[1].split(':')
        
         return `${newDate[0]}T${hour[0] - 3}:${hour[1]}`;
      })()
    } 
  });

  const updateClass = async (data) => {
    try {
      await api.put(`/classes/${classInfo._id}`, {
        name: data.name || classInfo.name,
        class_date: data.class_date || classInfo.class_date
      });

      setShowModalUpdate(false);
      setReload(true)
    } catch (error) {
      return alert('Erro ao atualizar aula, tente novamente!')
    }
  }
  return (
    <div className="update-model-container">
      <main className="content">
        <h3>Atualize as informações da aula</h3>
        <form onSubmit={handleSubmit(updateClass)}>
          <input type="text" id="name" placeholder="Nome" {...register('name')} />
          <input type="datetime-local" color="var(--color-white)" {...register('class_date')} />
          <div className="buttons-actions">
            <button className="update" type="submit">Atualizar</button>
            <button className="cancel" type="button" onClick={() => setShowModalUpdate(false)}>Cancelar</button>
          </div>
        </form>
      </main>
  </div>
  )
}


export default UpdateClassesModal;