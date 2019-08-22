import RestService from '../../services/RestService';
import BasePage from './BasePage';
import {AlertifyError, AlertifySuccess} from "../../services/AlertifyService";

const Rest = new RestService();

class BasePageList extends BasePage
{
	_isMounted = false;

	constructor(props)
	{
		super(props);

		this.state = {
			itens: [],
			pagination: {
				current: 0,
				itens_count: 0,
				itens_per_page: 0,
				next: null,
				pages_count: 0,
				prev: null
			},
			...this.state
		};

		this.fetchList = this.fetchList.bind(this);
		this.handleReceiveDataPage = this.handleReceiveDataPage.bind(this);
		this.handleClickPage = this.handleClickPage.bind(this);
		this.handleOnEditAction = this.handleOnEditAction.bind(this);
		this.actionView = this.actionView.bind(this);
		this.actionDelete = this.actionDelete.bind(this);
		this.actionEdit = this.actionEdit.bind(this);
	}

	fetchList(parameters) {
		return Rest.get(this.props.urlBase, parameters);
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	handleReceiveDataPage(res)
	{
		if (this._isMounted)
		{
			let pagination = {
				current: res.data.pagination.current,
				itens_count: res.data.pagination.itens_count,
				itens_per_page: res.data.pagination.itens_per_page,
				next: res.data.pagination.next,
				pages_count: res.data.pagination.pages_count,
				prev: res.data.pagination.prev
			};

			this.setState({
				itens: [...res.data.itens],
				pagination: pagination
			});
		}
	}

	handleOnEditAction(e) {
        debugger;
    }

	handleClickPage(page)
	{
		this.fetchList({
			page: page
		}).then(this.handleReceiveDataPage);

	}

	componentDidMount()
	{
		this._isMounted = true;
		this.fetchList().then(this.handleReceiveDataPage);
		this.setState(({
			actions: [
				{
					label: 'action.edit',
					field: "edit",
					handle: this.actionEdit
				},
				{
					label: 'action.delete',
					field: "delete",
					handle: this.actionDelete
				},
				{
					label: 'action.view',
					field: "view",
					handle: this.actionView
				}
			]
		}));
	}

	actionView(event, id) {
		let url = "/" + this.props.urlBase.split("/")[0] + "/view";
		this.props.history.push({
			pathname: url,
			state: {item_id: id}
		});
	}

	actionDelete(event, id) {
		let tr = event.currentTarget.parentElement.parentElement;
		let url = this.props.urlBase.split("/")[0] + "/delete/";
		Rest.delete(url + id, {}).then(function (resposta) {
			if (resposta.status === 200) {
				AlertifySuccess([{message: resposta.data.message}]);
				tr.remove();
			}
		}).catch(function (error) {
			AlertifyError([error]);
		});
	}

	actionEdit(event, id) {
		let url = "/" + this.props.urlBase.split("/")[0] + "/edit";
		this.props.history.push({
			pathname: url,
			state: {item_id: id}
		});
	}

}

export default BasePageList;