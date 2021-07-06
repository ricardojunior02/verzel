import api from '../../api';
import '../DeleteModelModules/styles.css';

const DeleteModelModules = ({ classInfo, setShowModalDelete, setReload }) => {

  const deleteClass = async (_id) => {
    try {
      await api.delete(`/classes/${_id}`);
      setShowModalDelete(false);
      setReload(true)
    } catch (error) {
      return alert('Erro ao excluir aula, tente novamente!')
    }
  }
  return (
  <div className="delete-model-container">
      <main className="content">
        <h3>Deseja realmente excluir essa aula?</h3>
        <div className="buttons-actions">
          <button className="delete" onClick={() => deleteClass(classInfo._id)}>Deletar</button>
          <button className="cancel" onClick={() => setShowModalDelete(false)}>Cancelar</button>
        </div>
      </main>
  </div>
    
  )
}

export default DeleteModelModules;