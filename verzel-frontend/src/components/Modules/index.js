import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { MdDelete, MdEdit } from 'react-icons/md';
import DeleteModelModules from '../DeleteModelModules';
import UpdateModuleModel from '../UpdateModuleModel';

import { Context } from '../../context';
import './styles.css';

const Modules = ({ data, setReload }) => {
  const { authenticate } = useContext(Context)
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [moduleInfo, setModuleInfo] = useState({});
  

  useEffect(() => {}, []);

  const deleteModal = (item) => {
    setModuleInfo(item)
    setShowModalDelete(true);
  }

  const updateModal = (item) => {
    setModuleInfo(item)
    setShowModalUpdate(true);
  }

  return (
    <div className="modules-container">
      <div className="modules-content">
       {data.map(item => (
         <div key={item._id} className="wrapper">
          <Link to={`/aulas/${item._id}`} >
            <h3>{item.name}</h3>
            <p>{item.classes.length} aulas</p> 
          </Link>
          {authenticate ? (
            <div className="actions">
            <button onClick={() => deleteModal(item)}>
              <MdDelete size={20} color="var(--color-white)" />
            </button>
            <button onClick={() => updateModal(item)}>
              <MdEdit size={20} color="var(--color-white)" />
            </button>
          </div>
          ): (<div></div>)}
         </div>     
       ))}
      </div>
      {showModalDelete ? <DeleteModelModules moduleInfo={moduleInfo} setShowModalDelete={setShowModalDelete} setReload={setReload} /> : ''}
      {showModalUpdate ? <UpdateModuleModel moduleInfo={moduleInfo} setShowModalUpdate={setShowModalUpdate} setReload={setReload} /> : ''}
      
    </div>
  )
}


export default Modules;