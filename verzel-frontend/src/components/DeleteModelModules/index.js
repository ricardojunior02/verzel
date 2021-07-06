import api from '../../api';
import './styles.css';

const DeleteModelModules = ({ moduleInfo, setShowModalDelete, setReload }) => {

  const deleteModule = async (_id) => {

    try {
      await api.delete(`/modules/${_id}`);
      setShowModalDelete(false);
      setReload(true);
    } catch (error) {
      return alert('Erro ao excluir módulo, tente novamente')
    }
    
  }
  return (
  <div className="delete-model-container">
      <main className="content">
        <h3>Deseja realmente excluir esse módulo?</h3>
        <p>Ao realizar essa ação você irá excluir todas as aulas relacionadas a ele</p>
        <div className="buttons-actions">
          <button className="delete" onClick={() => deleteModule(moduleInfo._id)}>Deletar</button>
          <button className="cancel" onClick={() => setShowModalDelete(false)}>Cancelar</button>
        </div>
      </main>
  </div>
    
  )
}

export default DeleteModelModules;