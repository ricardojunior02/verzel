import { useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../../context';

import './styles.css';
import logo from '../../assets/logo.svg';

const Header = ({ createClass, openModalCreateClass, setVisibleModule = true, setVisibleClass = true }) => {
  const { authenticate, handleLogout } = useContext(Context);
  const history = useHistory();

  useEffect(() => {}, [authenticate])

  const logout = () => {
    handleLogout();
    history.push('/');
  }
  
  return (
    <header>
      <div className="left">
        <Link to="/">
          <img src={logo} alt="Logo devaria" />
        </Link>
        
      </div>
      <div className="right">
        {authenticate ? (
          <>
            {setVisibleModule ?  <Link to="/criar-modulo">Criar Módulos</Link> : <div></div>}
            {setVisibleClass ?  <Link to="/criar-aulas">Criar Aulas</Link> : <div></div>}
            {createClass ?  <button style={{
              marginRight: '5px'
            }} onClick={() => openModalCreateClass()}>Criar Aula</button> : <div></div>}
            <button onClick={() => logout()}>Sair</button>
          </>
        ) : (<Link to="/signin">Admin Login</Link>)}
      </div>
    </header>
  )
}


export default Header;