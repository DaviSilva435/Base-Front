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

class TipoVeiculoList extends BasePageList
{
	static defaultProps = {
		urlBase: 'tipo-veiculo/all',
		title: 'menu.tipo_veiculo.title',
		fields: [
			{
				label: "page.tipo_veiculo.fields.id",
				field: "id",
				width: "5%"
			},
			{
				label: 'page.tipo_veiculo.fields.name',
				field: "nome",
				width: "95%"
			}
		]
	};

	render()
	{
		return (
			<TableData onClickPage={ this.handleClickPage } title='page.tipo_veiculo.list.title'
				fields={ this.props.fields } data={ this.state.itens } pagination={ this.state.pagination }
				actions={ this.state.actions } addUrl='/tipo-veiculo/add' onEdit={ this.handleOnEditAction }
				onDelete={ this.handleOnDeleteAction } onView={ this.handleOnViewAction }/>
		);
	}

}

/*----------------------------------------------------------------------------------------------------*/

class TipoVeiculoAdd extends BasePageForm
{
	static defaultProps = {
		urlBase: 'tipo-veiculo/add',
		title: Messages.getMessage('menu.tipo_veiculo.title')
	};

	render()
	{
		return (
			<FormPage title="page.tipo_veiculo.add.title">
				<FormRow>
					<InputInGroup type="text" name="nome" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
						label='page.tipo_veiculo.fields.name' required="required" colsize="6" />
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
class TipoVeiculoEdit extends BasePageForm
{
	constructor(props) {
		super(props);

		this.handleResponse = this.handleResponse.bind(this);
	}
	static defaultProps = {
		urlBase: 'tipo-veiculo/edit',
		title: Messages.getMessage('menu.user.title')
	};

	componentDidMount(){
		if (this.props.location.state === undefined){
			this.setState(({error:true}));
			return;
		}
		let id = this.props.location.state.item_id;
		console.log(id);
		Rest.view( "tipo-veiculo/view/" + id, this.state).then(this.handleResponse);
	}

	handleResponse(data) {
	    console.log(data)
		this.setState((
			data.data
		));
	}
	render()
	{
		return (
			this.state.error ?
				( <Redirect to={{ pathname: "/login", state: { from: this.props.location } }}/> ) :
				<FormPage title="page.tipo_veiculo.edit.title">
				<FormRow>
                    <InputInGroup type="text" name="nome" errors={ this.state.fieldErrors } enabled="True" onChange={ this.handleChange }
                        label='page.tipo_veiculo.fields.id' disabled={true} required="required" colsize="2" value={this.state.id}  />
                </FormRow>
				<FormRow>
					<InputInGroup type="nome" name="nome" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
						label='page.tipo_veiculo.fields.name' required="required" colsize="6" value={this.state.nome}/>
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

class TipoVeiculoView extends BasePageForm
{

	constructor(props) {
		super(props);

		this.handleResponse = this.handleResponse.bind(this);
		this.onClickEdit = this.onClickEdit.bind(this);
	}
	onClickEdit(event) {
		console.log(event.target);
		let url = "edit";
		let id = this.state.id;
		this.props.history.push({
			pathname: url,
			state: {item_id: id}
		});
	}
	static defaultProps = {
		urlBase: 'tipo-veiculo/view',
		title: Messages.getMessage('menu.user.title')
	};

	componentDidMount() {
		if (this.props.location.state === undefined){
			this.setState(({error:true}));
			return;
		}
		let id = this.props.location.state.item_id;
		Rest.view( "tipo-veiculo/view/" + id, this.state).then(this.handleResponse);
	}

	handleResponse(data) {
		this.setState((
			data.data
		));
	}
	render()
	{
		let fields = [{label:"Nome: ", value:this.state.nome}];
		return (
			this.state.error ?
				( <Redirect to={{ pathname: "/login", state: { from: this.props.location } }}/> ) :
				(<BasicView title={"TipoVeiculo " + this.state.username} url={"#tipo-veiculo/edit?id=" + this.state.id} fields={fields} onClickEdit={this.onClickEdit}/>)
		);
	}
}

export {TipoVeiculoList, TipoVeiculoAdd, TipoVeiculoEdit, TipoVeiculoView };
