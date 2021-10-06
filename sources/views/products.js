import {JetView} from "webix-jet";
import DataView from "views/data";
import ProductForm from "views/forms/productform";
import {products} from "models/products";

export default class ProductsView extends JetView {
	config(){
		return {
			rows:[
				{
					view:"toolbar", css:"subbar", padding:0,
					elements:[
						{
							view:"button", type:"form",
							label:"Tambah Produk", width:140,
							click:() => this.form.showForm()
						},
						{
							css:"title", height:50, borderless:true,
							template: `<div class='header'>Daftar Produk</div>
								<div class='details'>( Semua daftar produk )</div>`
						}
					]
				},
				{ $subview:DataView }
			]
		};
	}
	init(){
		this.form = this.ui(ProductForm);
		this.form.addExtra({ view:"text", name:"quantity", label:"Kuantitas", labelWidth:100 }, 3);

		this.on(this.app,"products:save", values => {
			values.id ? products.updateItem(values.id,values) : products.add(values);
		});

		this.on(this.app,"product:delete", id => products.remove(id));
	}
	ready(view){
		const grid = view.queryView({view:"datatable"});
		grid.sync(products);
	}
}
