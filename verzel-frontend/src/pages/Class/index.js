import { useEffect, useState, useContext } from 'react';
import { useParams, useHistory  } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import { Context } from '../../context';
import { MdDelete, MdEdit } from 'react-icons/md';
import Header from '../../components/Header';
import DeleteClassesModal from '../../components/DeleteClassesModal';
import UpdateClassesModal from '../../components/UpdateClassesModal';
import CreateClassModal from '../../components/CreateClassModal';
import Loading from '../../components/Loading';
import api from '../../api';
import './styles.css';

const Class = () => {
  const { module_id } = useParams();
  const [classes, setClasses] = useState([]);
  const [reload, setReload] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalCreateClass, setModalCreateClass] = useState(false);
  const [moduleId, setModuleId] = useState('')
  
  
  const [createClass, setCreateClass] = useState(false);
  const [classInfo, setClassInfo] = useState({});
  const history = useHistory();
  const { authenticate } = useContext(Context);

  useEffect(() => {
    if(reload){
      (async () => {
        const { data } = await api.get(`/classes/${module_id}`);
        setTimeout(() => {
          setLoading(false)
          setClasses(data)
        }, 500);
      })()
      setReload(false);
    }

    if(module_id){
      return setCreateClass(true)
    }
  }, [reload, module_id]);

  const months = {
    "Jan": "Jan",
    "Feb": "Fev",
    "Mar": "Mar",
    "Apr": "Abr",
    "May": "Maio",
    "Jun": "Jun",
    "Jul": "Jul",
    "Aug": "Ago",
    "Sep": "Set",
    "Oct": "Out",
    "Nov": "Nov",
    "Dec": "Dez",
  }

  const openModalCreateClass = () => {
    setModuleId(module_id)
    setModalCreateClass(true);
  }

  const dateFormat = (date) => {
    const dateFormated = new Date(date);
    const day = String(dateFormated).split(' ');
    const newDate = `Dia ${day[2]}/${months[day[1]]} ás ${day[4].split(':')[0]}:${day[4].split(':')[1]}`;
    return newDate;
  }

  const deleteModal = (item) => {
    setClassInfo(item);
    setShowModalDelete(true)
  }

  const updateModal = (item) => {
    setClassInfo(item)
    setShowModalUpdate(true);
  }

  return (
    <>
     <Header createClass={createClass} setVisibleModule={false} setVisibleClass={false} openModalCreateClass={openModalCreateClass} />
     <div className="classes-container">
        <nav>
          <MdArrowBack onClick={() => history.goBack()} size={20} color="var(--color-white)" />
          <h1>Aulas</h1>
        </nav>
        {loading &&  <Loading /> }
        <div className="classes-content">
          
          {classes.length === 0 && !loading ? ( <h3>Esse módulo ainda não possui aulas</h3> ) : (
            classes.map(item => (
              <div className="wrapper" key={item._id}>
                <div className="informations-classes">
                  <h3>{item.name}</h3>
                  <p>{dateFormat(item.class_date)}</p>
                </div>
                {authenticate ? (
                  <div className="button-actions">
                    <button onClick={() => deleteModal(item)}>
                      <MdDelete size={20} color="var(--color-white)" />
                    </button>
                    <button onClick={() => updateModal(item)}>
                      <MdEdit size={20} color="var(--color-white)" />
                    </button>
                  </div>
                ):(<div></div>)}
              </div>
            ))
          )}
          {showModalDelete ? <DeleteClassesModal setShowModalDelete={setShowModalDelete} classInfo={classInfo} setReload={setReload} /> : ''}
          {showModalUpdate ? <UpdateClassesModal setShowModalUpdate={setShowModalUpdate} classInfo={classInfo} setReload={setReload} /> : ''}
          {showModalCreateClass ? <CreateClassModal setModalCreateClass={setModalCreateClass} moduleId={moduleId} setReload={setReload} /> : ''}
        </div>
    </div>
    </>
  )
}


export default Class;