import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import ActivityList from './pages/ActivityList';
import RegisterActivity from './pages/RegisterActivity';

const routes = [
  {
    path: '/',
    component: RegisterActivity,
    name: 'Registrar Atividade',
  },
  {
    path: '/ActivityList',
    component: ActivityList,
    name: 'Lista de Atividades',
  },
];

const Routes = () => (
  <BrowserRouter>
    <Navbar title="Meu Planejamento" routes={routes} />
    <Switch>
      {routes.map(({ path, component }) => (
        <Route exact key={path} path={path} component={component} />
      ))}
    </Switch>
  </BrowserRouter>
);

export default Routes;
