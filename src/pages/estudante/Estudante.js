import React from 'react';
import BasePageList from '../basePage/BasePageList';
import BasePageForm from '../basePage/BasePageForm';
import MessageService from '../../services/MessageService';
import { Properties } from '../../config';
import { TableData, FormPage, FormRow } from '../../components/template/Layout';
import { ButtonSubmit, ButtonCancel, InputInGroup, SelectField } from '../../components/template/Form';

const Messages = new MessageService();

class UsersList extends BasePageList 
{
	static defaultProps = {
		urlBase: `${ Properties.domain }/estudante/all`,
		title: Messages.getMessage('menu.user.title'),
		fields: [
			{
				label: "#",
				field: "id",
				width: "5%"
			},
			{
				label: Messages.getMessage('fields.user.login'),
				field: "username",
				width: "95%"	
			}
		],
		actions:[
			{
				label: Messages.getMessage('fields.form.edit'),
				field: "edit",
				path: "/user/edit/{0}",
			},
			{
				label: Messages.getMessage('fields.form.delete'),
				field: "delete",
				path: "/user/delete/{0}",
			},
			{
				label: Messages.getMessage('fields.form.view'),
				field: "view",
				path: "/user/view/{0}",
			}
		]
	};

render() 
{	
	return (
		<TableData title='page.user.list.title' onClickPage={ this.handleClickPage } 
			fields={ this.props.fields } data={ this.state.itens } pagination={ this.state.pagination }
			actions={ this.props.actions } addUrl='/user/add' onEdit={ this.handleOnEditAction } 
			onDelete={ this.handleOnDeleteAction } onView={ this.handleOnViewAction }/>
	);
}

}

/*----------------------------------------------------------------------------------------------------*/

class UsersAdd extends BasePageForm 
{
	static defaultProps = {
		urlBase: 'user/add',
		title: Messages.getMessage('menu.user.title')
	};

	render() 
	{	
		return (
			<FormPage title="page.user.add.title">
				<FormRow>
					<InputInGroup type="email" name="email" errors={ this.state.fieldErrors }  onChange={ this.handleChange } 
						label='page.user.fields.email' required="required" colsize="12" />
				</FormRow>
				<FormRow>
					<InputInGroup type="text" name="username" errors={ this.state.fieldErrors }  onChange={ this.handleChange } 
						label='page.user.fields.username' required="required" colsize="6" />
				</FormRow>
				<FormRow>
					<InputInGroup type="password" name="password" errors={ this.state.fieldErrors }  onChange={ this.handleChange } 
						label='page.user.fields.password' required="required" colsize="6" />
				</FormRow>

				<FormRow>
					<SelectField empty={ true } name="role_id" errors={ this.state.fieldErrors }  onChange={ this.handleChange } 
						label='page.user.fields.role' required="required" colsize="6" url="select/roles" />
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

class UsersEdit extends BasePageForm 
{
	static defaultProps = {
		urlBase: 'user/edit',
		title: Messages.getMessage('menu.user.title')
	};

	render() 
	{	
		return (
			<FormPage title="page.user.login.title">
				<FormRow>
					<InputInGroup type="email" name="email" errors={ this.state.fieldErrors }  onChange={ this.handleChange } 
						label='page.user.fields.email' required="required" colsize="6" />
				</FormRow>
				<FormRow>
					<InputInGroup type="text" name="username" errors={ this.state.fieldErrors }  onChange={ this.handleChange } 
						label='page.user.fields.username' required="required" colsize="6" />
				</FormRow>
				<FormRow>
					<InputInGroup type="password" name="password" errors={ this.state.fieldErrors }  onChange={ this.handleChange } 
						label='page.user.fields.password' required="required" colsize="6" />
				</FormRow>

				<FormRow>
					<SelectField empty={ true } name="role_id" errors={ this.state.fieldErrors }  onChange={ this.handleChange } 
						label='page.user.fields.role' required="required" colsize="6" url="select/roles" />
				</FormRow>

				<FormRow>
					<ButtonSubmit text="layout.form.save" onClick={ this.handleOnSubmit } />
					<ButtonCancel text="layout.form.cancel" onClick={ this.handleCancel } />
				</FormRow>
			</FormPage>
		);
	}
}

export { UsersList, UsersAdd } ;