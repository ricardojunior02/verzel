import { BrowserRouter} from 'react-router-dom';
import { Authenticate } from './context';
import Routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <Authenticate>
       <Routes /> 
      </Authenticate> 
    </BrowserRouter>
  );
}

export default App;
