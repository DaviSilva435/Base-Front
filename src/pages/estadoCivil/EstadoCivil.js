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

class EstadoCivilList extends BasePageList
{
	static defaultProps = {
		urlBase: 'estado-civil/all',
		title: 'menu.estado_civil.title',
		fields: [
			{
				label: "page.estado_civil.fields.id",
				field: "id",
				width: "5%"
			},
			{
				label: 'page.estado_civil.fields.name',
				field: "nome",
				width: "95%"
			}
		]
	};

	render()
	{
		return (
			<TableData onClickPage={ this.handleClickPage } title='page.estado_civil.list.title'
				fields={ this.props.fields } data={ this.state.itens } pagination={ this.state.pagination }
				actions={ this.state.actions } addUrl='/estado-civil/add' onEdit={ this.handleOnEditAction }
				onDelete={ this.handleOnDeleteAction } onView={ this.handleOnViewAction }/>
		);
	}

}

/*----------------------------------------------------------------------------------------------------*/

class EstadoCivilAdd extends BasePageForm
{
	static defaultProps = {
		urlBase: 'estado-civil/add',
		title: Messages.getMessage('menu.estado_civil.title')
	};

	render()
	{
		return (
			<FormPage title="page.estado_civil.add.title">
				<FormRow>
					<InputInGroup type="text" name="nome" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
						label='page.estado_civil.fields.name' required="required" colsize="6" />
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

class EstadoCivilEdit extends BasePageForm
{

    constructor(props) {
        super(props);

        this.handleResponse = this.handleResponse.bind(this);
    }
    static defaultProps = {
        urlBase: 'estado-civil/edit',
        title: Messages.getMessage('menu.estado_civil.title')
    };

    componentDidMount() {
        if (this.props.location.state === undefined){
            this.setState(({error:true}));
            return;
        }
        let id = this.props.location.state.item_id;
        Rest.view( "estado-civil/view/" + id, this.state).then(this.handleResponse);
    }

    handleResponse(data) {
        this.setState((
            data.data
        ))
    }

    async handleOnSubmit(e) {
        Rest.edit(this.props.urlBase + "/" + this.state.id, this.state).then(this.handleReceiveResponseRest)
    }

    render()
    {
        return (
            this.state.error ?
                (< Redirect to={"/"} state={{from: this.props.location}}/>):
            <FormPage title="page.estado_civil.edit.title">
                <FormRow>
                    <InputInGroup type="text" name="nome" errors={ this.state.fieldErrors } enabled="False" onChange={ this.handleChange }
                                  label='page.estado_civil.fields.id' disabled={true} required="required" colsize="2" value={this.state.id}  />
                </FormRow>
                <FormRow>
                    <InputInGroup type="text" name="nome" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
                                  label='page.estado_civil.fields.nome' required="required" colsize="6"  value={this.state.nome}/>
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


class EstadoCivilView extends BasePageForm
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
        urlBase: 'estado-civil/view',
        title: Messages.getMessage('menu.estado_civil.title')
    };

    componentDidMount() {
        if (this.props.location.state === undefined){
            this.setState(({error:true}));
            return;
        }
        let id = this.props.location.state.item_id;
        Rest.view( "estado-civil/view/" + id, this.state).then(this.handleResponse);
    }

    handleResponse(data) {
        this.setState((
            data.data
        ));
    }
    render()
    {
        return (
            this.state.error ?
            ( <Redirect to={{ pathname: "/login", state: { from: this.props.location } }}/> ) :
                (<BasicView title={"Estado Civil " + this.state.nome} url={"#estado-civil/edit?id=" + this.state.id} fields={[]}
                            onClickEdit={this.onClickEdit}/>)
        );
    }
}

export {EstadoCivilList, EstadoCivilAdd, EstadoCivilEdit, EstadoCivilView };
