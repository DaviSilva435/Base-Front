import React, { Component } from 'react';
import MessageService from '../../services/MessageService';
import Request from '../../services/Request';
import RestService from '../../services/RestService';


const Messages = new MessageService();
const Rest = new RestService();

/*----------------------------------------------------------------------------------------------------*/

class InputInGroup extends Component 
{		
	render() 
	{
		let classValue;

		if (this.props.errors != null) {
			classValue = "form-control";
		} 
		else {
			classValue = "form-control";
		}
		
		return (
			<div className= {"form-group col " + (this.props.colsize ? "col-md-" + this.props.colsize : "")  } >
				<label>{ Messages.getMessage(this.props.label) }</label>
				<input type={ this.props.type } className={ classValue } id={ this.props.name }  name={ this.props.name }
					required={ this.props.required } autoFocus={ this.props.autofocus} onChange={ this.props.onChange } />
				<div className="invalid-feedback">
					{ this.props.errors[this.props.name] ? this.props.errors[this.props.name] : '' }
				</div>
            </div>		
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class RememberMeInGroup extends Component 
{	
	render() 
	{	
		return (
			<div className="form-group">
				<div className="checkbox">
					<label>
						<input type="checkbox" value="remember-me" /> { Messages.getMessage(this.props.text) }
					</label>
				</div>
			</div>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class ButtonSubmit extends Component 
{	
	render() 
	{
		return (
			<input className='btn btn-primary button-form' value={ Messages.getMessage(this.props.text) } type={ this.props.type } 
				onClick={ this.props.onClick } />
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class ButtonRegister extends Component 
{
	render()
	{
		return (
			<a href="#/register" className="stretched-link">É um aluno e não possui cadastro? Cadastre-se</a>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class ButtonCancel extends Component 
{	
	render() 
	{
		return (
			<input className='btn btn-danger button-form' value={ Messages.getMessage(this.props.text) } type="submit" 
				onClick={ this.props.onClick } />
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class SelectField extends Component
{
	constructor(props)
	{
		super(props);

		this.state = {

			options: this.props.options ? this.props.options: []
		};

		this.handleReceiveOption = this.handleReceiveOption.bind(this);
		this._isMounted = false;
	}

	async handleReceiveOption(res)
	{
		if (res.status === 200) {
		    console.log(res.data)
			this._isMounted && this.setState({
				options: res.data.itens
			});
		}
	}

	componentDidMount()
	{
		this._isMounted = true;
		console.log(this.props.url);
		this._isMounted && Rest.get(this.props.url, this.props.urlParameters).then(this.handleReceiveOption);
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render()
	{
		let classValue;
		let key;

		if (this.props.errors[this.props.name]) {
			classValue = "is-invalid form-control";
		}
		else {
			classValue = "form-control";
		}

		key=1;
		console.log(this.state.options);
		const options = this.state.options.map((data) =>
		    <option key={key++} value={data[this.props.value_name?this.props.value_name:this.props.name]}>{ data.nome_fantasia }{data.nome}</option>
		);


		return (
			<div className= { "form-group col " + (this.props.colsize ? "col-md-" + this.props.colsize : "") }>
				<label>{ Messages.getMessage(this.props.label) }</label>
				<select className={ classValue } id={ this.props.name }  name={ this.props.name }
						required={ this.props.required } value={this.props.value} autoFocus={ this.props.autofocus } onChange={ this.props.onChange }>
					{ this.props.empty === true ? <option value=""/> : '' }
					{ options }
				</select>

				<div className="invalid-feedback">
					{ this.props.errors[this.props.name] ? this.props.errors[this.props.name] : '' }
				</div>
			</div>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/
 class SelectGender extends Component
 {
	
	render()
	 {
		 return(
			
				
				<select className="custom-select" onChange={ this.props.onChange } defaultValue={'DEFAULT'} >
				<label>{Messages.getMessage(this.props.label)}</label>
					<option value="" disable="true" >Escolha seu sexo</option>
					<option value="F">Feminino</option>
					<option value="M">Masculino</option>
					<option value="I">Indefinido</option>
				</select>
			
			
		 );

	 }
	 
 }

 /*----------------------------------------------------------------------------------------------------*/
 class SelectState extends Component
 {
	constructor(){
		super();
		this.state = {
			products:[],
			productInfo: {},
			id:''
		};		
			
	}
	
	
	componentDidMount(){
		this.loadProducts();

	}
	
	loadProducts = async () => {
		const response = await Request.get('/uf/all?rows-per-page=50');
		
		const { itens, ...productInfo} = response.data;

		this.setState({products: itens , productInfo});
		console.log(response.data.itens);

	}; 
	render()
	 {
		 return(
			
				
				<select className="custom-select" defaultValue={'DEFAULT'}>
					<option value="DEFAULT" disable="true" >Escolha o UF</option>
					
					{this.state.products.map(product =>(
					<option value ={product.id} key={product.id} >{product.nome}</option>   
				   ))}
				</select>
				
		 );

	 }
	 
 }


/*----------------------------------------------------------------------------------------------------*/

class SelectCity extends Component
{
	constructor(){
		super();
		this.state = {
			products:[],
			productInfo: {},
			id:''
		};		
			
	}
	
	componentDidMount(){
		this.loadProducts();

	}



	loadProducts = async () => {
		const response = await Request.get('/cidade/all?uf_id='+ 6 +'&rows-per-page=1000');
		
		const { itens, ...productInfo} = response.data;

		this.setState({products: itens , productInfo});
		console.log(response.data.itens);

	};
	render ()
	{
		return(
			<select className="custom-select" defaultValue={'DEFAULT'}>
				<option value="DEFAULT" disable="true">Escolha a sua cidade</option>
				
				{this.state.products.map(product =>(
				<option value ={product.id} key={product.id} >{product.cidade}</option>   
			   ))}
			</select>
		);
	}

}


/*----------------------------------------------------------------------------------------------------*/
class SelectLicenseStatus extends Component
{
	render()
	{
		return(
			<select className="custom-select" onChange={ this.props.onChange } defaultValue={'DEFAULT'} >
					<option value="DEFAULT" disable="true" >Escolha o estado da sua habilitação</option>
					<option value={true}>Possuo condução própria</option>
					<option value={false}>Não possuo condução própria</option>
			</select>
			
		);
	}

}
/*----------------------------------------------------------------------------------------------------*/

class SelectSchool extends Component
{
	state = {
		products:[],
		productInfo: {}
	};
	
	componentDidMount(){
		this.loadProducts();

	}
	
	loadProducts = async () => {
		const response = await Request.get('/escola/all?rows-per-page=100');
		
		const { itens, ...productInfo} = response.data;

		this.setState({products: itens , productInfo});
		console.log(response.data.itens);

	};
	render()
	{
		return(
			<select className="custom-select" defaultValue={'DEFAULT'}>
				<option value="DEFAULT" disable="true" >Escolha a escola que você pertence</option>
			
			{this.state.products.map(product =>(
				<option value ={product.id} key={product.id} >{product.escola}</option>   
			   ))}

			</select>
		);
	}

}

/*----------------------------------------------------------------------------------------------------*/
class SelectCivilStatus extends Component
{
	state = {
		products:[],
		productInfo: {}
	};
	
	componentDidMount(){
		this.loadProducts();

	}
	
	loadProducts = async () => {
		const response = await Request.get('/estado-civil/all');
		
		const { itens, ...productInfo} = response.data;

		this.setState({products: itens , productInfo});
		console.log(response.data.itens);

	};
	render ()
	{
		return(
			<select className="custom-select" defaultValue={'DEFAULT'}>
				<option value="DEFAULT" disable="true" >Escolha o seu estado civil atual</option>
			
			{this.state.products.map(product =>(
				<option value ={product.id} key={product.id} >{product.nome}</option>   
			   ))}
			</select>
		);
	}

}


/*----------------------------------------------------------------------------------------------------*/
class SelectLicense extends Component
{
	state = {
		products:[],
		productInfo: {}
	};
	
	componentDidMount(){
		this.loadProducts();

	}
	
	loadProducts = async () => {
		const response = await Request.get('/categoria-habilitacao/all');
		
		const { itens, ...productInfo} = response.data;

		this.setState({products: itens , productInfo});
		console.log(response.data.itens);

	};
	render()
	{
		return(
				
			   <select className="custom-select" defaultValue={'DEFAULT'} >
				   <option value="DEFAULT" disable="true" >Escolha a categoria da sua habilitação</option>
			
				{this.state.products.map(product =>(
					<option value ={product.id} key={product.id} >{product.nome}</option>   
				   ))}
					
				   
			   </select>
			   
			
		);

	}
	
}

/*----------------------------------------------------------------------------------------------------*/

class SelectClass extends Component
{
	state = {
		products:[],
		productInfo: {}
	};
	
	componentDidMount(){
		this.loadProducts();

	}
	
	loadProducts = async () => {
		const response = await Request.get('/curso-estudante/all?rows-per-page=200');
		
		const { itens, ...productInfo} = response.data;

		this.setState({products: itens , productInfo});
		console.log(response.data.itens);

	};
	render()
	{
		return(
			<select className="custom-select" defaultValue={'DEFAULT'}>
				<option value="DEFAULT" disable="true">Escolha o seu curso</option>
				{this.state.products.map(product =>(
				<option value ={product.id} key={product.id} >{product.nome}</option>   
			   ))}
			</select>
		);
	}
	
}
/*----------------------------------------------------------------------------------------------------*/
class SelectClassSeason extends Component
{
	state = {
		products:[],
		productInfo: {}
	};
	
	componentDidMount(){
		this.loadProducts();

	}
	
	loadProducts = async () => {
		const response = await Request.get('/periodo-curso/all');
		
		const { itens, ...productInfo} = response.data;

		this.setState({products: itens , productInfo});
		console.log(response.data.itens);

	};
	render()
	{
		return(
			<select className="custom-select" defaultValue={'DEFAULT'}>
				<option value="DEFAULT" disable="true">Escolha o periodo atual do seu curso</option>
				
				{this.state.products.map(product =>(
				<option value ={product.id} key={product.id} >{product.nome}</option>   
			   ))}

			</select>
		);
	}	
}
/*----------------------------------------------------------------------------------------------------*/
class SelectDegreeEdu extends Component
{
	state = {
		products:[],
		productInfo: {}
	};
	
	componentDidMount(){
		this.loadProducts();

	}
	
	loadProducts = async () => {
		const response = await Request.get('/grau-instrucao/all');
		
		const { itens, ...productInfo} = response.data;

		this.setState({products: itens , productInfo});
		console.log(response.data.itens);

	};
	render()
	{
		return(
			<select className="custom-select" defaultValue={'DEFAULT'}>
				<option value="DEFAULT" disable="true">Escolha o seu grau de escolaridade</option>
				
				{this.state.products.map(product =>(
				<option value ={product.id} key={product.id} >{product.nome}</option>   
			   ))}

			</select>

		);
	}

}
/*----------------------------------------------------------------------------------------------------*/
class SelectConduction extends Component
{
	render()
	{
		return(
			<select className="custom-select" onChange={ this.props.onChange } defaultValue={'DEFAULT'} >
				<option value="DEFAULT" disable="true" >Você tem condução própria?</option>
				<option value={true}>Sim</option>
				<option value={false}>Não</option>
			</select>
		);
	}
}
/*----------------------------------------------------------------------------------------------------*/
class SelectVehicle extends Component
{
	state = {
		products:[],
		productInfo: {}
	};
	
	componentDidMount(){
		this.loadProducts();

	}
	
	loadProducts = async () => {
		const response = await Request.get('/tipo-veiculo/all');
		
		const { itens, ...productInfo} = response.data;

		this.setState({products: itens , productInfo});
		console.log(response.data.itens);

	};
	render()
	{
		return(
			<select className="custom-select" defaultValue={'DEFAULT'}>
				<option value="DEFAULT" disable="true">Escolha o tipo do seu veículo</option>
				
				{this.state.products.map(product =>(
				<option value ={product.id} key={product.id} >{product.nome}</option>   
			   ))}

			</select>

		);
	}
}
/*----------------------------------------------------------------------------------------------------*/
class SelectEstagio extends Component
{
	state = {
		products:[],
		productInfo: {}
	};
	
	componentDidMount(){
		this.loadProducts();

	}
	
	loadProducts = async () => {
		const response = await Request.get('/centro-estagio/all');
		
		const { itens, ...productInfo} = response.data;

		this.setState({products: itens , productInfo});
		console.log(response.data.itens);

	};
	render()
	{
		return(
			<select className="custom-select" defaultValue={'DEFAULT'}>
				<option value="DEFAULT" disable="true">Escolha o seu Centro de estágio</option>
				
				{this.state.products.map(product =>(
				<option value ={product.id} key={product.id} >{product.nome_fantasia}</option>   
			   ))}

			</select>

		);
	}
}
/*----------------------------------------------------------------------------------------------------*/


export  { InputInGroup, RememberMeInGroup, ButtonSubmit, ButtonRegister, ButtonCancel, SelectField,SelectGender, SelectState,
	 SelectLicense, SelectCity, SelectCivilStatus, SelectClass, SelectClassSeason, SelectDegreeEdu,
	  SelectLicenseStatus, SelectSchool, SelectEstagio, SelectVehicle, SelectConduction};