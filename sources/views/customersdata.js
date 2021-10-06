import {JetView} from "webix-jet";
import {customers} from "models/customers";

export default class CustomersData extends JetView{
	config(){
		return {
			view:"datatable",
			select:true,
			scroll:"y",
			columns:[
				{ id:"id_customer", header:["ID Kostumer", {content:"textFilter"} ], sort:"text" },
				{ id:"name", header:["Nama", {content:"textFilter"} ], sort:"text", fillspace:true, minWidth:50 },
				{ id:"phone", header:"Telp", sort:"text", width:120 },
				{ id:"address", header:"Alamat", sort:"text", width:200, fillspace:true, minWidth:50 },
				{ id:"edit", header:"", width:35, template:"{common.editIcon()}" },
				{ id:"delete", header:"", width:35, template:"{common.trashIcon()}" }
			],
			onClick:{
				"wxi-trash":(e, id) => {
					webix.confirm({
						text:"Kostumer ini akan dihapus. <br/> Apakah anda yakin?",
						ok:"Ya", cancel:"Batal",
						callback: res => {
							if (res)
								customers.remove(id.row);
						}
					});
				},
				"wxi-pencil":(e, id) => this.show("customers?id="+id.row)
			}
		};
	}
	init(view){
		view.sync(customers);
	}
}
