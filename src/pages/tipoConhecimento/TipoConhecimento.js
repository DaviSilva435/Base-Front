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

class TipoConhecimentoList extends BasePageList
{
	static defaultProps = {
		urlBase: 'tipo-conhecimento/all',
		title: 'menu.tipo_conhecimento.title',
		fields: [
			{
				label: "page.tipo_conhecimento.fields.id",
				field: "id",
				width: "5%"
			},
			{
				label: 'page.tipo_conhecimento.fields.name',
				field: "nome",
				width: "95%"
			}
		]
	};

	render()
	{
		return (
			<TableData onClickPage={ this.handleClickPage } title='page.tipo_conhecimento.list.title'
				fields={ this.props.fields } data={ this.state.itens } pagination={ this.state.pagination }
				actions={ this.state.actions } addUrl='/tipo-conhecimento/add' onEdit={ this.handleOnEditAction }
				onDelete={ this.handleOnDeleteAction } onView={ this.handleOnViewAction }/>
		);
	}

}

/*----------------------------------------------------------------------------------------------------*/

class TipoConhecimentoAdd extends BasePageForm
{
	static defaultProps = {
		urlBase: 'tipo-conhecimento/add',
		title: Messages.getMessage('menu.tipo_conhecimento.title')
	};

	render()
	{
		return (
			<FormPage title="page.tipo_conhecimento.add.title">
				<FormRow>
					<InputInGroup type="text" name="nome" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
						label='page.tipo_conhecimento.fields.name' required="required" colsize="6" />
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

export {TipoConhecimentoList, TipoConhecimentoAdd };
