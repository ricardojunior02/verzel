import api from '../../api';
import './styles.css';

const DeleteModelModules = ({ moduleInfo, setShowModalDelete, setReload }) => {

  const deleteModule = async (_id) => {
    const response = await api.delete(`/modules/${_id}`);

    if(response.status !== 200){
      return console.log('erro', response.status)
    }

    setShowModalDelete(false);
    setReload(true)
  }
  return (
  <div className="delete-model-container">
      <main className="content">
        <h3>Deseja realmente excluir esse módulo</h3>
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