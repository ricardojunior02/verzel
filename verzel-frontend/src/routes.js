import { Route, Switch } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Class from './pages/Class';
import AdminLogin from './pages/AdminLogin';
import CreateModule from './pages/CreateModule';
import CreateClasses from './pages/CreateClasses';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/aulas/:module_id" component={Class}/>
      <Route path="/signin" component={AdminLogin}/>
      <Route path="/criar-modulo" component={CreateModule}/>
      <Route path="/criar-aulas" component={CreateClasses}/>
    </Switch>
  )
}

export default Routes;