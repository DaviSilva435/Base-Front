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

class CategoriaHabilitacaoList extends BasePageList
{
	static defaultProps = {
		urlBase: 'categoria-habilitacao/all',
		title: 'menu.categoria_habilitacao.title',
		fields: [
			{
				label: "page.categoria_habilitacao.fields.id",
				field: "id",
				width: "5%"
			},
			{
				label: 'page.categoria_habilitacao.fields.name',
				field: "nome",
				width: "95%"
			}
		]
	};

	render()
	{
		return (
			<TableData onClickPage={ this.handleClickPage } title='page.categoria_habilitacao.list.title'
				fields={ this.props.fields } data={ this.state.itens } pagination={ this.state.pagination }
				actions={ this.state.actions } addUrl='/categoria-habilitacao/add' onEdit={ this.handleOnEditAction }
				onDelete={ this.handleOnDeleteAction } onView={ this.handleOnViewAction }/>
		);
	}

}

/*----------------------------------------------------------------------------------------------------*/

class CategoriaHabilitacaoAdd extends BasePageForm
{
	static defaultProps = {
		urlBase: 'categoria-habilitacao/add',
		title: Messages.getMessage('menu.categoria_habilitacao.title')
	};

	render()
	{
		return (
			<FormPage title="page.categoria_habilitacao.add.title">
				<FormRow>
					<InputInGroup type="text" name="nome" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
						label='page.categoria_habilitacao.fields.name' required="required" colsize="6" />
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

export {CategoriaHabilitacaoList, CategoriaHabilitacaoAdd };
