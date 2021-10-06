import {JetView} from "webix-jet";

export default class SaleForm extends JetView{
	config(){
		return {
			view:"window", head:false, position:"center",
			modal:true, body:{
				view:"form",
				paddingY:20, paddingX:30,
				width:400,
				elementsConfig:{ labelWidth:100 },
				elements:[
					{ view:"text", name:"id_penjualan", label:"ID Penjualan" },
					{ view:"text", name:"id_karyawan", label:"ID Karyawan"},
					{ view:"combo", name:"id_kostumer", label:"ID Kostumer", options:["sply01", "sply01", "sply01", "sply01"]},
					{ view:"combo", name:"kd_menu", label:"Kode Menu", options:["brg1", "brg2", "brg3", "brg4"]},
					{ view:"text", name:"nama_menu", label:"Nama Menu"},
					{ view:"datepicker",name:"tanggal", label:"Tgl Pembelian"},
					{ view:"text", name:"harga", label:"Harga"},
					{ view:"text", name:"jumlah", label:"Jumlah"},
					{ view:"text", name:"total_harga", label:"Total Harga" },
					{
						margin:10,
						cols:[
							{},
							{
								view:"button", value:"Cencel",
								align:"center", width:100,
								click:() => this.hideForm()
							},
							{
								view:"button", value:"Save", type:"form",
								align:"center", width:100,
								click:() => {
									if (this.form.validate()) {
										this.app.callEvent("sales:save", [this.form.getValues()]);
										this.hideForm();
									}
								}
							}
						]
					}
				],
				rules:{
					$all:webix.rules.isNotEmpty
				}
			}
		};
	}
	init(view){
		this.form = view.getBody();

		this.on(this.app, "form:fill", values => {
			view.show();
			this.form.setValues(values);
		});
	}
	
	showForm(){
		this.getRoot().show();
	}
	hideForm(){
		this.getRoot().hide();
		this.form.clear();
		this.form.clearValidation();
	}
}
