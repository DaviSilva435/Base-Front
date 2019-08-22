import React, { Component } from 'react';
import AuthService from '../../services/AuthService';
import { CenterCard2 } from '../../components/template/Layout';
import { InputInGroup, ButtonSubmit, SelectGender, SelectState, SelectLicense , SelectCity, SelectCivilStatus,
	 SelectClass, SelectClassSeason, SelectDegreeEdu,SelectLicenseStatus, SelectSchool, 
	 SelectEstagio, SelectVehicle, SelectConduction, ButtonCancel} from '../../components/template/Form';
import BasePageList from '../basePage/BasePageList'; //Necessário mudar os extends da pagina
import BasePageForm from '../basePage/BasePageForm';


class Register extends Component {

	constructor() 
	{
		super();
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.Auth = new AuthService();
		this.state = {
			fieldErrors: {},
			formErrors: [],
			cityId: ''
		}; 
	}

    render(){
        return (
			<CenterCard2 title='page.user.register.title'>
				<form onSubmit={ this.handleSubmit }>
				<div className="form-row">	
					<div className="form-group col-md-6">
						<InputInGroup type="text" name="name" errors={ this.state.fieldErrors } onChange={ this.handleChange } 
							label='page.user.register.name' required="required" autofocus="autofocus"/>
					</div>
					<div className="form-group col-mb-4">	
						<InputInGroup type="date" name="birthdate" errors={ this.state.fieldErrors } onChange={ this.handleChange } 
								label='page.user.register.birthdate' required="required" />
					</div>
					<div className="form-group col-mb-2">
						<SelectGender name='page.user.register.gender' required="required" label="page.user.register.gender" onChange={ this.handleChange } />
					</div>
				</div>
					
				<div className="form-row">	
					<div className="form-group col-mb-6">	
						<InputInGroup type="tel" name="cpf" max="20" errors={ this.state.fieldErrors } onChange={ this.handleChange } 
							label='page.user.register.cpf' required="required" />
					</div>
					<div className="form-group col-md-6">
						<InputInGroup type="tel" name="rg" max="20" errors={ this.state.fieldErrors } onChange={ this.handleChange } 
							label='page.user.register.rg' required="required"/>
					</div>
					<div className="form-group col-mb-6">
						<SelectCivilStatus required="required" onChange={this.handleChange} label='page.user.register.cpf'/>
					</div>
				</div>
				<div className="form-row">	
					<div className="form-group col-md-6">	
						<InputInGroup type="text" name="fathername" errors={ this.state.fieldErrors } onChange={ this.handleChange } 
							label='page.user.register.fathername' required="required" />
					</div>
					<div className="form-group col-md-6">	
						<InputInGroup type="text" name="mothername" errors={ this.state.fieldErrors } onChange={ this.handleChange } 
							label='page.user.register.mothername' required="required"/>
					</div>
				</div>
				<div className="form-group">
					<InputInGroup type="text" name="address" errors={ this.state.fieldErrors } onChange={ this.handleChange } 
						label='page.user.register.address' required="required" />
				</div>
				<div className="form-row">		
					<div className="form-group col-mb-6">
						<InputInGroup type="number" name="cep" max="10" errors={ this.state.fieldErrors } onChange={ this.handleChange } 
							label='page.user.register.cep' required="required" />
					</div>
					<div className="form-group col-mb-4">	
						<InputInGroup type="text" name="neighborhood" errors={ this.state.fieldErrors } onChange={ this.handleChange } 
							label='page.user.register.neighborhood' required="required"/>	
					</div>
				
					<div className="form-group col-mb-2">		
						<SelectState  required="required" label="state" onChange={ this.handleChange} />
					</div>	
					<div className="form-group col-md-0">
						<SelectCity required="required" label="city" onChange={this.handleChange} id={this.state.cityId}/>
					</div>
				</div>
				<div className="form-row">		
					<div className="form-group col-md-6">	
						<InputInGroup type="email" name="email" errors={ this.state.fieldErrors } onChange={ this.handleChange } 
							label='page.user.register.email' required="required" />
					</div>
					<div className="form-group col-mb-6">
						<InputInGroup type="tel" name="number" maxlength="30"  errors={ this.state.fieldErrors} onChange={ this.handleChange } 
							label='page.user.register.number' required="required" />
					</div>
					<div className="form-group col-mb-6">
						<InputInGroup type="tel" name="mobilenumber" maxlength="30"  errors={ this.state.fieldErrors} onChange={ this.handleChange } 
							label='page.user.register.mobilenumber' required="required"/>
					</div>	
				</div>
				<div className="form-row">
					<div className="form-group col-mb-6">
						<SelectSchool required="required" onChange={this.handleChange}/>
					</div>
					<div className="form-group col-mb-4">
						<SelectDegreeEdu required="required" onChange={this.handleChange}/>
					</div>

				</div>
				<div className="form-row">		
					<div className="form-group col-mb-6">	
						<SelectLicenseStatus required="required" onChange={ this.handleChange } />
					</div>
					<div className="form-group col-mb-4">
						<SelectLicense required="required" onChange={this.handleChange}/>
					</div>
					
					<div className="form-group col-mb-2">
						<SelectVehicle required="required" onChange={this.handleChange}/>
					</div>
					<div className="form-group col-mb-0">
						<SelectConduction required="required" onChange={this.handleChange}/>
					</div>
				</div>
				<div className="form-row">
					<div className="form-group col-mb-6">
						<SelectClass required="required" onChange={this.handleChange}/>
					</div>
					<div className="form-group col-mb-4">
						<SelectClassSeason required="required" onChange={this.handleChange}/>
					</div>
					<div className="form-group col-mb-2">
						<SelectEstagio required="required" onChange={this.handleChange}/>
					</div>

				</div>
					<ButtonSubmit type="submit" text="page.user.register.register" onClick={this.handleSubmit} />
					
					
					
				</form>
			</CenterCard2>
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



export default Register ;
