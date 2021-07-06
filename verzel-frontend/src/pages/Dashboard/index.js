import { useEffect, useState } from 'react';
import api from '../../api';
import Header from '../../components/Header';
import Modules from '../../components/Modules';
import Loading from '../../components/Loading';


import './styles.css';

const Dashboard = () => {
  const [ modules, setModules] = useState([]);
  const [ reload, setReload ] = useState(true);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => { 
    if(reload){
      (async () => {
        const { data } = await api.get('/modules');
        setTimeout(() => {
          setLoading(false)
          setModules(data)
        }, 500);
      })()
      setReload(false);
    }
  }, [reload]);

  return (
    <>
      <Header  />
      <div className="container">
      <h1>Módulos</h1>
        {loading && <Loading /> }
        {modules.length === 0 && !loading ? <h3>Nenhum modulo encontrado...</h3> : <Modules data={modules} setReload={setReload} /> }
      </div>
    </>
  )
}


export default Dashboard;

