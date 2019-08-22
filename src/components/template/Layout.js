import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import MessageService from '../../services/MessageService';
import { Properties } from '../../config';
import { Icons } from '../../iconSet';
import { formatString } from '../utils/Utils';

import './Layout.css';

const Auth = new AuthService();
const Messages = new MessageService();

/*----------------------------------------------------------------------------------------------------*/
 
class CenterCard extends Component 
{	
	render() 
	{
		return (
			<div className="card card-login mx-auto mt-5">
				<div className="card-header">{ Messages.getMessage(this.props.title) }</div>
				<div className="card-body">
					{ this.props.children }
				</div>
			</div>			
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class CenterCard2 extends Component
{
	render()
	{
		return (
			<div className="card text-left" >
				<div className="card-header">{ Messages.getMessage(this.props.title)}</div>
				<div className="card-body">
					{ this.props.children }
				</div>
			</div>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class AlertDangerForm extends Component
{
	render()
	{
		if (this.props.text.length === 0) {
			return <div></div>;
		}

		let i = 0;

		const listErrors = this.props.text.map( (err) => {
			return (<li key={ i++ }>{ err.message }</li>);
		});

		return (
			<div className="alert alert-danger alert-dismissible fade show" role="alert">
				<ul>{ listErrors }</ul>
			</div>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class SideBar extends Component
{
	render()
	{
		return (
			<ul className="sidebar navbar-nav">
				{ this.props.children }
			</ul>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class SideBarItem extends SideBar
{
	render()
	{
		return (
			<li className="nav-item">
				<Link className="nav-link" to={ this.props.url }>
					<i className={ this.props.icon }></i>
					<span> { Messages.getMessage(this.props.name) }</span>
				</Link>
			</li>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class SideBarDropDown extends Component
{
	render()
	{
		return (
			<li className="nav-item dropdown">
				<Link className="nav-link dropdown-toggle" to="#" id="pagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					<i className={ this.props.icon }></i>
					<span> { Messages.getMessage(this.props.name) }</span>
				</Link>
				<div className="dropdown-menu" aria-labelledby="pagesDropdown">
					{ this.props.children }
				</div>
			</li>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class SideBarDropDownItem extends SideBar
{
	render()
	{
		return (
			<Link className="dropdown-item" to={ this.props.url }> { Messages.getMessage(this.props.name) }</Link>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class SideBarDropDownGroup extends Component
{
	render()
	{
		return (
			<h6 className="dropdown-header">{ Messages.getMessage(this.props.name) }</h6>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class SideBarDropDownDivider extends Component
{
	render()
	{
		return (
			<div className="dropdown-divider"></div>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class NavBar extends Component
{
	handleLogoutClick() {
		Auth.logout();
	}

	handleToggleSidebarClick(e)
	{
		e.preventDefault();
		let className = document.getElementsByClassName('sidebar')[0].className;
		let classBodyName = document.getElementsByTagName('body')[0].className;

		if (className.indexOf('toggled') === -1)
		{
			className = className + " toggled";
			classBodyName = classBodyName + " sidebar-toggled";
		}
		else
		{
			className = className.replace(" toggled", "");
			classBodyName.replace(" sidebar-toggled", "");
		}

		document.getElementsByClassName('sidebar')[0].className = className;
		document.getElementsByTagName('body')[0].className = classBodyName;
	}

	render()
	{
		return (
			<nav className="navbar navbar-expand navbar-dark bg-dark static-top">

				<Link className="navbar-brand mr-1" to="/">{ Properties.appName }</Link>

				<button className="btn btn-link btn-sm text-white order-1 order-sm-0" id="sidebarToggle" onClick={ this.handleToggleSidebarClick } href="#">
					<i className="fas fa-bars"></i>
				</button>

				<ul className="navbar-nav ml-auto mr-0 mr-md-3 my-2 my-md-0">
					<li className="nav-item dropdown no-arrow mx-1">
						<Link className="nav-link dropdown-toggle" to="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							<i className="fas fa-bell fa-fw"></i>
							<span className="badge badge-danger">9+</span>
						</Link>
						<div className="dropdown-menu dropdown-menu-right" aria-labelledby="alertsDropdown">
							<Link className="dropdown-item" to="#">{ Messages.getMessage('layout.navbar.messages.action') }</Link>
							<Link className="dropdown-item" to="#">{ Messages.getMessage('layout.navbar.messages.other') }</Link>
							<div className="dropdown-divider"></div>
							<Link className="dropdown-item" to="#">{ Messages.getMessage('layout.navbar.messages.something') }</Link>
						</div>
					</li>
					<li className="nav-item dropdown no-arrow mx-1">
						<Link className="nav-link dropdown-toggle" to="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							<i className="fas fa-envelope fa-fw"></i>
							<span className="badge badge-danger">7</span>
						</Link>
						<div className="dropdown-menu dropdown-menu-right" aria-labelledby="messagesDropdown">
							<Link className="dropdown-item" to="#">{ Messages.getMessage('layout.navbar.messages.action') }</Link>
							<Link className="dropdown-item" to="#">{ Messages.getMessage('layout.navbar.messages.other') }</Link>
							<div className="dropdown-divider"></div>
							<Link className="dropdown-item" to="#">{ Messages.getMessage('layout.navbar.messages.something') }</Link>
						</div>
					</li>
					<li className="nav-item dropdown no-arrow">
						<Link className="nav-link dropdown-toggle" to="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							<i className="fas fa-user-circle fa-fw"></i>
						</Link>
						<div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
							<Link className="dropdown-item" to="#">{ Messages.getMessage('layout.navbar.user.settings') }</Link>
							<Link className="dropdown-item" to="#">{ Messages.getMessage('layout.navbar.user.log') }</Link>
							<div className="dropdown-divider"></div>
							<Link className="dropdown-item" to="#" onClick={ this.handleLogoutClick } data-toggle="modal" data-target="#logoutModal">{ Messages.getMessage('layout.navbar.user.logout') }</Link>
						</div>
					</li>
				</ul>
			</nav>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class Footer extends Component
{
	render()
	{
		return (
			<footer className="sticky-footer">
				<div className="container my-auto">
					<div className="copyright text-center my-auto">
						<span>{ Messages.getMessage('layout.copyright') } © { Properties.company } { Properties.year }</span><br/>
						<span>{ Messages.getMessage('layout.version') }. { Properties.version }</span>
					</div>
				</div>
			</footer>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class ScrollToTop extends Component
{
	render()
	{
		return (
		    <a className="scroll-to-top rounded" href="#page-top">
				<i className={ Icons.toparrow }></i>
		    </a>
		)
	}
}

/*----------------------------------------------------------------------------------------------------*/

class PaginationPage extends Component
{
	constructor(props)
	{
		super(props);
		this.handleClickPage = this.handleClickPage.bind(this);
	}

	handleClickPage(e)
	{
		e.preventDefault();
		this.props.onClick(this.props.page);
	}

	render()
	{
		return (<Link className="page-link" to="#" onClick={ this.handleClickPage }>{ this.props.text }</Link>)
	}
}

/*----------------------------------------------------------------------------------------------------*/

class Pagination extends Component
{
	static defaultProps = {
		numberPagesShow: 5,
		pagination: {
			current: 0,
			pages_count: 0,
			prev: null,
			next: null
		}
	}

	handleUpdatePages()
	{
		let pages = [];
		let pagesPrior = [];

		let startPage = this.props.pagination.current - this.props.numberPagesShow;
		let endPage = this.props.pagination.current + this.props.numberPagesShow;

		if (startPage < 1)
		{
			endPage = endPage + Math.abs(startPage) + 1;
			startPage = 1;
		}

		if (endPage >= this.props.pagination.pages_count)
		{
			startPage = startPage - Math.abs(endPage - this.props.pagination.pages_count);
			endPage = this.props.pagination.pages_count;
		}

		if (startPage < 1) {
			startPage = 1;
		}

		for (let i = startPage; i <= endPage; pages.push(i++));

		let maxDist = -1;

		for (let i = 0; i <= pages.length; i++)
		{
			let dist = Math.abs(i - pages.indexOf(this.props.pagination.current));
			pagesPrior.push(dist);

			if (maxDist < dist) {
				maxDist = dist;
			}
		}

		let prior = pages.length;

		while (prior > 0)
		{
			for (let i = 0; i < pagesPrior.length; i++)
			{
				if (pagesPrior[i] === maxDist) {
					pagesPrior[i] = prior--;
				}
			}

			maxDist = maxDist - 1;
		}

		return {
			pages: pages,
			prior: pagesPrior
		};
	}

	render()
	{
		const pages = this.handleUpdatePages();

		let key = 1;
		let i = 0;

		const Paginator = pages['pages'].map((page) =>
			<li key={ key++ } className={ "page-item page-item-" + pages['prior'][i++] + " " + (page === this.props.pagination.current ? 'active' : '') }>
				<PaginationPage page={ page } text={ page } onClick={ this.props.onClickPage } />
			</li>
		);

		const PreviousIcon = (
			<span aria-hidden="true">&laquo;</span>
		);

		const Previous = (
			<li className={ "page-item-prev page-item" + (this.props.pagination.prev ? '' : ' disabled') }>
				<PaginationPage page={ this.props.pagination.prev } text={ PreviousIcon } onClick={ this.props.onClickPage } />
			</li>
		);

		const NextIcon = (
			<span aria-hidden="true">&raquo;</span>
		);

		const Next = (
			<li className={ "page-item-prev page-item" + (this.props.pagination.next ? '' : ' disabled') }>
				<PaginationPage page={ this.props.pagination.next } text={ NextIcon } onClick={ this.props.onClickPage } />
			</li>
		);

		const FirstIcon = (
			<span aria-hidden="true">&laquo;&laquo;</span>
		);

		const First = (
			<li className={ "page-item-prev page-item" + (this.props.pagination.pages_count > 0 && this.props.pagination.current > 1 ? '' : ' disabled') }>
				<PaginationPage page={ 1 } text={ FirstIcon } onClick={ this.props.onClickPage } />
			</li>
		);

		const LastIcon = (
			<span aria-hidden="true">&raquo;&raquo;</span>
		);

		const Last = (
			<li className={ "page-item-prev page-item" + (this.props.pagination.pages_count > 0 && this.props.pagination.current <	this.props.pagination.pages_count ? '' : ' disabled') }>
				<PaginationPage page={ this.props.pagination.pages_count } text={ LastIcon } onClick={ this.props.onClickPage } />
			</li>
		);

		return (
			<nav aria-label="Navegação">
				<ul className="pagination pagination-sm justify-content-end">
					{ First }
					{ Previous }
					{ Paginator }
					{ Next }
					{ Last }
				</ul>
			</nav>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/


class TableData extends Component
{
	render()
	{
		let key = 1;

		const labels = this.props.fields.map((fld) =>
			<th style={ {'width': fld.width} } key={ key++ } >{ Messages.getMessage(fld.label) }</th>
		);

		const data = this.props.data.map((register) =>
		{
			let registerFields = this.props.fields.map((fld) =>
				<td style={ {'width': fld.width} } key={ key++ }>{ register[fld.field] }</td>
			);

			let registerActions =
				<td className="action-col" key={ key++ }>{
					this.props.actions.map((act) =>
						<button key={ key++ } className="btn btn-secondary btn-action" onClick={ (evt) => act.handle(evt, register.id) }><i className={ Icons[act.field] }/></button>
					)}
				</td>;

			return (
				<tr key={ key++ }>
					{ registerFields }
					{ registerActions }
				</tr>
			);
		});

		let labelActions;

		if (this.props.actions && this.props.actions.length > 0) {
			labelActions = <th className="actions-label" style={ {width: "5%"} } colSpan={ this.props.actions.length }>{ Messages.getMessage('action.title') }</th>;
		}

		const footerPageInfo = formatString(Messages.getMessage('layout.paginator'), [
			this.props.pagination.current,
			this.props.pagination.pages_count,
			this.props.pagination.itens_count
		]);

		return (
		    <div className="card mb-3">
				<div className="card-header">
					<i className={ Icons.table }/> { Messages.getMessage(this.props.title) }
					{this.props.buttonRemove ? <div/> : <Link className="btn btn-primary" to={ this.props.addUrl }><i className={ Icons.plus }/></Link> }
				</div>
				<div className="card-body">
					<div className="table-responsive">
						<table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
							<thead>
								<tr>
									{ labels }
									{ labelActions }
								</tr>
							</thead>
							<tbody>
								{ data }
							</tbody>
						</table>
					</div>
					<Pagination pagination={ this.props.pagination } onClickPage={ this.props.onClickPage }/>
				</div>
				<div className="card-footer small text-muted">{ footerPageInfo }</div>
		    </div>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class FormPage extends Component
{
	render()
	{
		return (
			<div className="card mb-3">
				<div className="card-header">
					<i className={ Icons.table }></i> { Messages.getMessage(this.props.title) }
				</div>
				<div className="card-body">
					{ this.props.children }
				</div>
		    </div>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class FormRow extends Component
{
	render()
	{
		return (<div className="form-row">{ this.props.children }</div>);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class FormCol extends Component
{
	render()
	{
		return ( <div className={"form-group col-mb-6"}></div>);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class BasicView extends Component
{

    render()
	{
		let text_fields = this.props.fields.map( (field) => {
			return (<div key={field.label} className={"card-text"}><b>{field.label}</b>{field.value}</div>);
		});
		return (<div className="card">
			<div className="card-header">
				<div className="card-title">{this.props.title}
					<a className="btn btn-primary border-left" onClick={this.props.onClickEdit}>
						<i className="fas fa-edit"/></a>
                    {this.props.buttonBackRemove ? <div/> :
					<a className="btn btn-primary border-right" href={"javascript:history.back();"}>
						<i className="fas fa-backward"/></a>}
				</div>

			</div>
			<div className="card-body">
				{text_fields}
			</div>
		</div>);
	}
}

/*----------------------------------------------------------------------------------------------------*/

export { CenterCard, AlertDangerForm, NavBar, SideBar, SideBarItem, SideBarDropDown, SideBarDropDownItem,
		 SideBarDropDownGroup, SideBarDropDownDivider, Footer, ScrollToTop, TableData, CenterCard2, FormPage,
		  FormRow, FormCol,BasicView};