import {JetView} from "webix-jet";
import DataView from "views/dataorders";
import OrderForm from "views/forms/orderform";
import {orders} from "models/orders";
export default class OrdersView extends JetView{
	config(){
		return {
			rows:[
				{
					view:"toolbar", css:"subbar", padding:0,
					elements:[
						{
							view:"button", type:"form",
							label:"Tambah orderan", width:140,
							click:() => this.form.showForm()
						},
						{
							css:"title", height:50, borderless:true,
							template: `<div class='header'>List Orders</div>
								<div class='details'>( all list Order )</div>`
						}
					]
				},
				{ $subview:DataView }
			]
		};
	}
	init(){
		this.form = this.ui(OrderForm);
		//this.form.addExtra({ view:"text", name:"quantity", label:"Quantity", labelWidth:100 }, 3);

		this.on(this.app,"orders:save", values => {
			values.id ? orders.updateItem(values.id,values) : orders.add(values);
		});

		this.on(this.app,"orders:delete", id => orders.remove(id));
	}
	ready(view){
		const grid = view.queryView({view:"datatable"});
		grid.sync(orders);
	}
}
