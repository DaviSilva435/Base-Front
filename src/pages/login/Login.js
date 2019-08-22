import React, { Component } from 'react';
import AuthService from '../../services/AuthService';
import { CenterCard } from '../../components/template/Layout';
import { InputInGroup, RememberMeInGroup, ButtonSubmit, ButtonRegister} from '../../components/template/Form';
import { AlertifyError, AlertifySuccess } from '../../services/AlertifyService';
import MessageService from '../../services/MessageService';

const Message = new MessageService();

class Login extends Component
{

	constructor()
	{
		super();
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.Auth = new AuthService();
		this.state = {
			fieldErrors: {username: null, password: null},
			formErrors: []
		};
	}

	render()
	{
		return (
			<CenterCard title='page.user.login.title'>
				<form onSubmit={ this.handleSubmit }>
					<InputInGroup type="text" name="username" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
						label='page.user.login.username' required="required" autofocus="autofocus"/>
					<InputInGroup type="password" name="password" errors={ this.state.fieldErrors} onChange={ this.handleChange }
						label='page.user.login.password' required="required" />
					<RememberMeInGroup text='page.user.login.remember' />
					<ButtonSubmit type="submit" text='page.user.login.submit' />
					<p>

					</p>
					<ButtonRegister  />

				</form>

			</CenterCard>
		);
	}

	handleChange(e)
	{
        this.setState({
                [e.target.name]: e.target.value
            }
        )
    }

    handleErrorLogin(errors)
    {
    	this.setState({
    		fieldErrors: {
    			username: errors.fields.username,
    			password: errors.fields.password
    		},
    		formErrors: errors.form
    	});
        AlertifyError(errors.form);
	}
	

    handleSubmit(e)
    {
    	e.preventDefault();
    	this.Auth.login(this.state.username, this.state.password)
    		.then(res => {
    			if (res.error)
    			{
    				this.handleErrorLogin(res.errors);
    			} else {
					AlertifySuccess([{message: Message.getMessage('page.user.login.success')}]);
					this.props.history.push('/');
    			}
    		})
    		.catch(err=> {
    			alert(err);
    		})
    }

    componentWillMount()
    {
    	if(this.Auth.loggedIn()) {
    		this.props.history.push('/');
    	}
    }

}

export default Login;