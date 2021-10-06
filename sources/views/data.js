import {JetView} from "webix-jet";

export default class DataView extends JetView {
	config() {
		return {
			view:"datatable",
			select:true,
			scroll:"y",
			columns:[
				{ id:"kd_produk", header:["ID Produk", {content:"textFilter"} ], sort:"text" },
				{ id:"name", header:["Nama", {content:"textFilter"} ], sort:"text", fillspace:true, minWidth:150 },
				{ id:"price", header:"Harga", sort:"int" },
				{ id:"quantity", header:"Kuantitas", sort:"int"},
				{ id:"edit", header:"", width:35, template:"{common.editIcon()}" },
				{ id:"delete", header:"", width:35, template:"{common.trashIcon()}" }
			],
			onClick:{
				"wxi-trash":(e, id) => {
					webix.confirm({
						text:"Produk ini akan dihapus. <br/> Apakah anda yakin?",
						ok:"Ya", cancel:"Batal",
						callback: res => {
							if (res)
								this.app.callEvent("product:delete",[id.row]);
						}
					});
				},
				"wxi-pencil":(e, id) => {
					//show form
					const item = this.getRoot().getItem(id);
					this.app.callEvent("form:fill", [item]);
				}
			}
		};
	}
}
