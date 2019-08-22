import React from 'react';
import BasePageList from '../basePage/BasePageList';
import BasePageForm from '../basePage/BasePageForm';
import MessageService from '../../services/MessageService';
import {TableData, FormPage, FormRow, BasicView} from '../../components/template/Layout';
import { ButtonSubmit, ButtonCancel, InputInGroup, SelectField } from '../../components/template/Form';
import {Redirect} from "react-router-dom";
import RestService from "../../services/RestService";
const Rest = new RestService();

const Messages = new MessageService();

class PeriodoCursoList extends BasePageList
{
	static defaultProps = {
		urlBase: 'periodo-curso/all',
		title: 'menu.periodo_curso.title',
		fields: [
			{
				label: "page.periodo_curso.fields.id",
				field: "id",
				width: "5%"
			},
			{
				label: 'page.periodo_curso.fields.name',
				field: "nome",
				width: "95%"
			}
		]
	};

	render()
	{
		return (
			<TableData onClickPage={ this.handleClickPage } title='page.periodo_curso.list.title'
				fields={ this.props.fields } data={ this.state.itens } pagination={ this.state.pagination }
				actions={ this.state.actions } addUrl='/periodo-curso/add' onEdit={ this.handleOnEditAction }
				onDelete={ this.handleOnDeleteAction } onView={ this.handleOnViewAction }/>
		);
	}

}

/*----------------------------------------------------------------------------------------------------*/

class PeriodoCursoAdd extends BasePageForm
{
	static defaultProps = {
		urlBase: 'periodo-curso/add',
		title: Messages.getMessage('menu.periodo_curso.title')
	};

	render()
	{
		return (
			<FormPage title="page.periodo_curso.add.title">
				<FormRow>
					<InputInGroup type="text" name="nome" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
						label='page.periodo_curso.fields.name' required="required" colsize="6" />
				</FormRow>

				<FormRow>
					<ButtonSubmit text="layout.form.save" onClick={ this.handleOnSubmit } />
					<ButtonCancel text="layout.form.cancel" onClick={ this.handleCancel } />
				</FormRow>
			</FormPage>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

export {PeriodoCursoList, PeriodoCursoAdd };
