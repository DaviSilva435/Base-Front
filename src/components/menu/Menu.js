import React, { Component } from 'react';
import { Icons } from '../../iconSet';
import { SideBar, SideBarItem, SideBarDropDown, SideBarDropDownItem, SideBarDropDownGroup, SideBarDropDownDivider } from '../template/Layout';

/*----------------------------------------------------------------------------------------------------*/

class Master extends Component 
{
	render() 
	{
		return (
			<SideBar>
				<SideBarItem active={ false } url="/" name='menu.dashboard' icon={ Icons.dashboard } />

				<SideBarDropDown name='menu.stagecenter.title' icon={ Icons.stagecenter } >
					<SideBarDropDownGroup name='menu.stagecenter.centers' />
					<SideBarDropDownItem name='menu.stagecenter.register' url="#" />
					<SideBarDropDownItem name='menu.stagecenter.search' url="#" />
					<SideBarDropDownDivider />
					<SideBarDropDownGroup name='menu.stagecenter.users' />
					<SideBarDropDownItem name='menu.stagecenter.register' url="#" />
					<SideBarDropDownItem name='menu.stagecenter.search' url="#" />
				</SideBarDropDown>

				<SideBarItem active={ false } url="/escola/list" name='menu.escola.title' icon={ Icons.users } />
				<SideBarItem active={ false } url="/user/list" name='menu.user.title' icon={ Icons.users } />

				<SideBarDropDown name='menu.estado_civil.title' icon={ Icons.company } >
                    <SideBarDropDownItem name='menu.estado_civil.search' url="/estado-civil/list" />
                    <SideBarDropDownItem name='menu.estado_civil.register' url="/estado-civil/add" />
				</SideBarDropDown>

                <SideBarDropDown name='menu.tipo_conhecimento.title' icon={ Icons.company } >
                    <SideBarDropDownItem name='menu.tipo_conhecimento.search' url="/tipo-conhecimento/list" />
                    <SideBarDropDownItem name='menu.tipo_conhecimento.register' url="/tipo-conhecimento/add" />
				</SideBarDropDown>

                <SideBarDropDown name='menu.tipo_veiculo.title' icon={ Icons.company } >
                    <SideBarDropDownItem name='menu.tipo_veiculo.search' url="/tipo-veiculo/list" />
                    <SideBarDropDownItem name='menu.tipo_veiculo.register' url="/tipo-veiculo/add" />
				</SideBarDropDown>

				<SideBarDropDown name='menu.periodo_curso.title' icon={ Icons.company } >
                    <SideBarDropDownItem name='menu.periodo_curso.search' url="/periodo-curso/list" />
                    <SideBarDropDownItem name='menu.periodo_curso.register' url="/periodo-curso/add" />
				</SideBarDropDown>

				<SideBarDropDown name='menu.grau_instrucao.title' icon={ Icons.company } >
                    <SideBarDropDownItem name='menu.grau_instrucao.search' url="/grau-instrucao/list" />
                    <SideBarDropDownItem name='menu.grau_instrucao.register' url="/grau-instrucao/add" />
				</SideBarDropDown>

				<SideBarDropDown name='menu.categoria_habilitacao.title' icon={ Icons.company } >
                    <SideBarDropDownItem name='menu.categoria_habilitacao.search' url="/categoria-habilitacao/list" />
                    <SideBarDropDownItem name='menu.categoria_habilitacao.register' url="/categoria-habilitacao/add" />
				</SideBarDropDown>
			</SideBar>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class StageCenterAdmin extends Component 
{
	render() 
	{
		return (
			<SideBar>
				<SideBarItem active={ false } url="/" name='menu.dashboard' icon={ Icons.dashboard } />
				<SideBarDropDown name='menu.company.title' icon={ Icons.company } >
					<SideBarDropDownGroup name='menu.company.company' />
					<SideBarDropDownItem name='menu.company.register' url="#" />
					<SideBarDropDownItem name='menu.company.search' url="#" />
					<SideBarDropDownDivider />
					<SideBarDropDownGroup name='menu.company.jobs' />
					<SideBarDropDownItem name='menu.company.register' url="#" />
					<SideBarDropDownItem name='menu.company.search' url="#" />
					<SideBarDropDownDivider />
					<SideBarDropDownGroup name='menu.company.contract' />
					<SideBarDropDownItem name='menu.company.register' url="#" />
					<SideBarDropDownItem name='menu.company.search' url="#" />
				</SideBarDropDown>
				<SideBarDropDown name='menu.user.title' icon={ Icons.users } >
					<SideBarDropDownGroup name='menu.user.user' />
					<SideBarDropDownItem name='menu.user.register' url="#" />
					<SideBarDropDownItem name='menu.user.search' url="#" />
				</SideBarDropDown>
			</SideBar>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class StageCenterCompany extends Component 
{
	render() 
	{
		return (
			<SideBar>
				<SideBarItem active={ false } url="/" name='menu.dashboard' icon={ Icons.dashboard } />
			</SideBar>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class StageCenterOperator extends Component 
{
	render() 
	{
		return (
			<SideBar>
				<SideBarItem active={ false } url="/" name='menu.dashboard' icon={ Icons.dashboard } />
			</SideBar>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class StageCenterStudent extends Component 
{
	render() 
	{
		return (
			<SideBar>
				<SideBarItem active={ false } url="/" name='menu.dashboard' icon={ Icons.dashboard } />
			</SideBar>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class StageCenterTeacher extends Component 
{
	render() 
	{
		return (
			<SideBar>
				<SideBarItem active={ false } url="/" name='menu.dashboard' icon={ Icons.dashboard } />
			</SideBar>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

export { Master, StageCenterAdmin, StageCenterCompany, StageCenterOperator, StageCenterStudent, StageCenterTeacher };