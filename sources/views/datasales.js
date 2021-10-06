import {JetView} from "webix-jet";

export default class DataView extends JetView {
	config() {
		return {
			view:"datatable",
			select:true,
			scroll:"y",
			columns:[
				{ id:"id_penjualan", header:["ID Penjualan", {content:"textFilter"} ], sort:"text" },
				{ id:"id_karyawan", header:["ID Krywn", {content:"textFilter"} ], sort:"text"},
				{ id:"id_kostumer", header:["ID Kostumer", {content:"textFilter"} ], sort:"text" },
				{ id:"kd_menu", header:["Kode Menu", {content:"textFilter"} ], sort:"text" },
				{ id:"nama_menu", header:["Nama Menu", {content:"textFilter"} ], sort:"text", fillspace:true, minWidth:100  },
				{ id:"tanggal", header:["Tgl Pembelian", {content:"textFilter"} ], sort:"text" },
				{ id:"harga", header:"Harga", sort:"int"},
				{ id:"jumlah", header:"Jumlah", sort:"int"},
				{ id:"total_harga", header:"Total Harga", sort:"int"},
				{ id:"edit", header:"", width:35, template:"{common.editIcon()}" },
				{ id:"delete", header:"", width:35, template:"{common.trashIcon()}" }
			],
			onClick:{
				"wxi-trash":(e, id) => {
					webix.confirm({
						text:"Penjualan ini akan dihapus. <br/> Apakah anda yakin?",
						ok:"Ya", cancel:"Batal",
						callback: res => {
							if (res)
								this.app.callEvent("sales:delete",[id.row]);
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
