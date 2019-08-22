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

class GrauInstrucaoList extends BasePageList
{
	static defaultProps = {
		urlBase: 'grau-instrucao/all',
		title: 'menu.grau_instrucao.title',
		fields: [
			{
				label: "page.grau_instrucao.fields.id",
				field: "id",
				width: "5%"
			},
			{
				label: 'page.grau_instrucao.fields.name',
				field: "nome",
				width: "95%"
			}
		]
	};

	render()
	{
		return (
			<TableData onClickPage={ this.handleClickPage } title='page.grau_instrucao.list.title'
				fields={ this.props.fields } data={ this.state.itens } pagination={ this.state.pagination }
				actions={ this.state.actions } addUrl='/grau-instrucao/add' onEdit={ this.handleOnEditAction }
				onDelete={ this.handleOnDeleteAction } onView={ this.handleOnViewAction }/>
		);
	}

}

/*----------------------------------------------------------------------------------------------------*/

class GrauInstrucaoAdd extends BasePageForm
{
	static defaultProps = {
		urlBase: 'grau-instrucao/add',
		title: Messages.getMessage('menu.grau_instrucao.title')
	};

	render()
	{
		return (
			<FormPage title="page.grau_instrucao.add.title">
				<FormRow>
					<InputInGroup type="text" name="nome" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
						label='page.grau_instrucao.fields.name' required="required" colsize="6" />
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

export {GrauInstrucaoList, GrauInstrucaoAdd };
