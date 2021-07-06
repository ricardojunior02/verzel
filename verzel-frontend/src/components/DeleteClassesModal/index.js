import api from '../../api';
import '../DeleteModelModules/styles.css';

const DeleteModelModules = ({ classInfo, setShowModalDelete, setReload }) => {

  const deleteClass = async (_id) => {
    const response = await api.delete(`/classes/${_id}`);
    if(response.status !== 200){
      return console.log('erro', response.status)
    }

    setShowModalDelete(false);
    setReload(true)
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