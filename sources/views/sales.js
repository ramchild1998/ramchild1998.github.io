import {JetView} from "webix-jet";
import DataView from "views/datasales";
import SalesForm from "views/forms/saleform";
import {sales} from "models/sales";
export default class OrdersView extends JetView{
	config(){
		return {
			rows:[
				{
					view:"toolbar", css:"subbar", padding:0,
					elements:[
						{
							view:"button", type:"form",
							label:"Tambah Penjualan", width:140,
							click:() => this.form.showForm()
						},
						{
							css:"title", height:50, borderless:true,
							template: `<div class='header'>Daftar Penjualan</div>
								<div class='details'>( Semua daftar penjualan )</div>`
						},
					]
				},
				{ $subview:DataView },
			]
		};
	}
	init(){
		this.form = this.ui(SalesForm);

		this.on(this.app,"sales:save", values => {
			values.id ? sales.updateItem(values.id,values) : sales.add(values);
		});

		this.on(this.app,"sales:delete", id => sales.remove(id));
	}
	ready(view){
		const grid = view.queryView({view:"datatable"});
		grid.sync(sales);
	}
}
