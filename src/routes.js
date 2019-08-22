import React from "react";
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import AuthService from './services/AuthService';
import MasterLayout from './components/masterLayout/MasterLayout'

import Home from './pages/home/Home';
import About from './pages/about/About';
import {UsersList ,UsersAdd ,UsersEdit, UsersView} from './pages/users/Users';
import {EscolaList, EscolaAdd} from './pages/escola/Escola';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import {EstadoCivilList, EstadoCivilAdd, EstadoCivilEdit, EstadoCivilView }from './pages/estadoCivil/EstadoCivil';
import {TipoConhecimentoList, TipoConhecimentoAdd} from './pages/tipoConhecimento/TipoConhecimento'
import {TipoVeiculoList, TipoVeiculoAdd, TipoVeiculoEdit, TipoVeiculoView} from './pages/tipoVeiculo/TipoVeiculo'
import {PeriodoCursoList, PeriodoCursoAdd} from './pages/periodoCurso/PeriodoCurso'
import {GrauInstrucaoList, GrauInstrucaoAdd} from './pages/grauInstrucao/GrauInstrucao'
import {CategoriaHabilitacaoList, CategoriaHabilitacaoAdd} from './pages/categoriaHabilitacao/CategoriaHabilitacao'



const Auth = new AuthService();

/*----------------------------------------------------------------------------------------------------*/

function PrivateRoute({ component: Component, ...rest }) 
{
	return (
		<Route {...rest} render=
			{	
				props =>
					Auth.loggedIn() ? 
					( <Component {...props} /> ) : 
					( <Redirect to={{ pathname: "/login", state: { from: props.location } }} /> )
			}
		/>
	);
}

/*----------------------------------------------------------------------------------------------------*/

function Routes() 
{
	return (
		<Router>
			<MasterLayout>
				{
					props =>
						<Switch>
							<PrivateRoute exact path="/" component={ (privateRouteProps) => (<Home {...privateRouteProps} {...props} />) } />
							<PrivateRoute path="/about" component={ (privateRouteProps) => (<About {...privateRouteProps} {...props} />) } />
							<PrivateRoute path="/user/list" component={ (privateRouteProps) => (<UsersList {...privateRouteProps} {...props} />) } />
							<PrivateRoute path="/user/add" component={ (privateRouteProps) => (<UsersAdd {...privateRouteProps} {...props} />) } />
							<PrivateRoute path="/user/edit" component={ (privateRouteProps) => (<UsersEdit {...privateRouteProps} {...props} />)} />
							<PrivateRoute path="/user/view" component={ (privateRouteProps) => (<UsersView {...privateRouteProps} {...props} />)} />

							<PrivateRoute path="/escola/list" component={ (privateRouteProps) => (<EscolaList {...privateRouteProps} {...props} />)} />
							<PrivateRoute path="/escola/add" component={ (privateRouteProps) => (<EscolaAdd {...privateRouteProps} {...props} />)} />

							<PrivateRoute path="/estado-civil/list" component={ (privateRouteProps) => (<EstadoCivilList {...privateRouteProps} {...props} />)} />
							<PrivateRoute path="/estado-civil/add" component={ (privateRouteProps) => (<EstadoCivilAdd {...privateRouteProps} {...props} />)} />
							<PrivateRoute path="/estado-civil/edit" component={ (privateRouteProps) => (<EstadoCivilEdit {...privateRouteProps} {...props} />)} />
							<PrivateRoute path="/estado-civil/view" component={ (privateRouteProps) => (<EstadoCivilView {...privateRouteProps} {...props} />)} />

							<PrivateRoute path="/tipo-conhecimento/list" component={ (privateRouteProps) => (<TipoConhecimentoList {...privateRouteProps} {...props} />)} />
							<PrivateRoute path="/tipo-conhecimento/add" component={ (privateRouteProps) => (<TipoConhecimentoAdd {...privateRouteProps} {...props} />)} />

							<PrivateRoute path="/tipo-veiculo/list" component={ (privateRouteProps) => (<TipoVeiculoList {...privateRouteProps} {...props} />)} />
							<PrivateRoute path="/tipo-veiculo/add" component={ (privateRouteProps) => (<TipoVeiculoAdd {...privateRouteProps} {...props} />)} />
						    <PrivateRoute path="/tipo-veiculo/edit" component={ (privateRouteProps) => (<TipoVeiculoEdit {...privateRouteProps} {...props} />)} />
							<PrivateRoute path="/tipo-veiculo/view" component={ (privateRouteProps) => (<TipoVeiculoView {...privateRouteProps} {...props} />)} />


							<PrivateRoute path="/periodo-curso/list" component={ (privateRouteProps) => (<PeriodoCursoList {...privateRouteProps} {...props} />)} />
							<PrivateRoute path="/periodo-curso/add" component={ (privateRouteProps) => (<PeriodoCursoAdd {...privateRouteProps} {...props} />)} />

							<PrivateRoute path="/grau-instrucao/list" component={ (privateRouteProps) => (<GrauInstrucaoList {...privateRouteProps} {...props} />)} />
							<PrivateRoute path="/grau-instrucao/add" component={ (privateRouteProps) => (<GrauInstrucaoAdd {...privateRouteProps} {...props} />)} />

							<PrivateRoute path="/categoria-habilitacao/list" component={ (privateRouteProps) => (<CategoriaHabilitacaoList {...privateRouteProps} {...props} />)} />
							<PrivateRoute path="/categoria-habilitacao/add" component={ (privateRouteProps) => (<CategoriaHabilitacaoAdd {...privateRouteProps} {...props} />)} />

							<Route path="/login" component={ Login } />
							<Route path="/register" component={ Register } />
						</Switch>
				}
				
			</MasterLayout>
		</Router>
	);
}

/*----------------------------------------------------------------------------------------------------*/

export default Routes;